import {NAMES} from './../../config/config.js';
import { eventBus, editFormManager, managerTask, storage } from './../../model.js';
import { renderEditForm } from './EditFormRender.js';
import { Notes } from './../../utils/notes.js';


class Controller {
  constructor(eventBus, editFormManager, renderEditForm, managerTask, storage) {
    this.eventBus = eventBus; 
    this.formEditManager = editFormManager;
    this.render = renderEditForm;   
    this.managerTask = managerTask; 
    this.storage = storage;

    this.notes = new Notes();
    this.currentTaskData = null;
  }

  // Старт контроллера
  initController() {
   this.initForm();
   this.initNotes();
   this.initListeners();
   this.loadCurrentTask();
  }

  initForm() {
    const formElems = this.render.getFormElems(); // получаем элем-ты формы
    this.formEditManager.setFormElems(formElems); // передадим в editForm
  }

  initNotes(){
    let container = document.querySelector('.form__buttons')
    this.notes.setContainer(container);
  }

  initListeners(){
    this.render.formElements.form.addEventListener('submit', (e)=> this.saveTask(e));
    this.eventBus.on(NAMES.TASKS_LOAD, (task) => this.fillForm(task));
  }

  loadCurrentTask(){
    const id = this.formEditManager.getTaskId();

    if(!id) {
     console.log('Задача не найдена');
     return;
     
    };
 
    const task = this.storage.findTaskById(id);

    if(!task) {
      console.log('Задача не найдена');
      return;
    }

    this.currentTaskData = task;
    this.eventBus.emit(NAMES.TASKS_LOAD, task);
    
  }

  fillForm(task){
    this.formEditManager.setFormTasksValues(task);
  }
  
  saveTask(event) {
    event.preventDefault();

    //  Получаем данные из формы
    const formData = this.formEditManager.getFormData(this.render.formElements.form);
console.log(formData);

    if(!formData) {
      console.log('Ошибка: форма заполнена не верно');
      return;
    }

    // Обновляем задачу
    const updatedTask = this.formEditManager.updateTask(this.currentTaskData, formData);

    if(!updatedTask) {
      this.notes.addNote('error', 'Ошибка: не удалось сохранить изменения. Проверьте введённые данные');
      return;
    }

    this.currentTaskData = updatedTask; // Обновим текущ. задачу в контроллере

    this.eventBus.emit(NAMES.TASKS_SAVE, updatedTask);

    // Сохранить задачу
    const isSaved = this.managerTask.updateSingleTaskData(updatedTask);
  
    if (!isSaved) {
      this.notes.addNote('error', 'Ошибка: не удалось сохранить изменения. Повторите попытку.');
      return;
    }

    this.notes.addNote('success', 'Задача успешно сохранена');
    this.eventBus.emit(NAMES.TASKS_SAVE, updatedTask);
  }

}

const controller = new Controller(
  eventBus,
  editFormManager, 
  renderEditForm,
  managerTask,
  storage
);
controller.initController();