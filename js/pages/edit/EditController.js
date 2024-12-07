import {NAMES} from './../../config/config.js';
import { eventBus, editFormManager, managerTask, storage } from './../../model.js';
import { renderEditForm } from './EditFormRender.js';
import { MESSAGES } from './../../data/messages.js';
import { Notes } from './../../utils/notes.js';


class Controller {
  constructor(eventBus, editFormManager, renderEditForm, managerTask, storage) {
    this.eventBus = eventBus; 
    this.formEditManager = editFormManager;
    this.render = renderEditForm;   
    this.managerTask = managerTask; 
    this.storage = storage;

    this.notes = new Notes(this.render.noteWrapper, MESSAGES);
    this.currentTaskData = null;

  }

  // Старт контроллера
  initController() {
   this.initForm();
   this.initListeners();
   this.loadCurrentTask();
  }

  initForm() {
    const formElems = this.render.getFormElems(); // получаем элем-ты формы
    console.log(formElems);
    
    this.formEditManager.setFormElems(formElems); // заполнения форму данными
  }

  initListeners(){
    this.render.form.addEventListener('submit', (e)=> this.saveTask(e));
    this.eventBus.on(NAMES.TASKS_LOAD, (task) => this.fillForm(task));
  }

  loadCurrentTask(){
    const id = this.formEditManager.getTaskById();
    if(!id) {
     console.log('Задача не найдена');
     return;
     
    };
 
    const task = this.managerTask.findTaskById(id);

    if(!currentTask) {
      console.log('Задача не найдена');
      return;
    }

    this.currentTaskData = task;
    this.eventBus.emit(TASKS_LOAD, task);
    
  }

  fill_form(task){
    this.formEditManager.setFormTasksValues(task);
  }
  
  saveTask(event) {
    event.preventDefault();

    //  Получаем данные из формы
    const formData = this.formEditManager.getFormData(this.render.form);

    if(!formData) {
      console.log('Ошибка: форма заполнена не верно');
      return;
    }

    // Обновляем задачу
    const updatedTask = this.formEditManager.updateTask(this.currentTaskData, formValues);

    if(!updatedTask) {
      console.log('Ошибка: не удалось сохрвнить изменения. Проверьте введённый данные');
      return;
    }

    this.currentTaskData = updatedTask; // Обновим текущ. задачу в контроллере

    this.eventBus.emit(TASKS_SAVE, updatedTask);

    // Сохранить задачу
    const isSaved = this.managerTask.updateSingleTaskData(updatedTask);
    if (!isSaved) {
      this.notes.addNote('error', 'Ошибка при сохранении задачи');
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