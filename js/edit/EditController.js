import {NAMES} from './../config/config.js';
import { eventBus, editFormManager, manager, storage } from '../model.js';
import { renderEditForm } from './EditFormRender.js';
import { notes } from '../utils/notes.js';

class Controller {
  constructor (editFormManager, eventBus, renderEditForm, manager,  storage, notes) {
    this.eventBus = eventBus; 
    this.formEditManager = editFormManager;
    this.taskManager = manager;
    this.render = renderEditForm;    
    this.storage = storage;
    this.notes = notes;

    const {form, select, selectStatus, inputs, noteWrapper} = this.render.getFormElements(); // Получим элем-ты формы из render
    this.formEditManager.initFormElems(form, select, selectStatus, inputs, noteWrapper);       // Передадим в методы форм

    this.eventBus.on(NAMES.TASKS_SAVE, (task) => {
      // Обновление интерфейса
      this.formEditManager.setFormTaskValue(
        task, 
        this.render.id, 
        this.render.date, 
        this.render.select, 
        this.render.selectStatus, 
        this.render.inputs
      );
    });
    
    this.eventBus.on(NAMES.TASKS_LOAD, (task) => {
      const formDataFormatted = this.formEditManager.formatFormData(task);
  
      this.formEditManager.setFormTaskValue(
        formDataFormatted, 
        this.render.id, 
        this.render.date, 
        this.render.select, 
        this.render.selectStatus, 
        this.render.inputs
        // this.render.getIdValue(), 
        // this.render.getDateValue(), 
        // this.render.getSelectValue(), 
        // this.render.getStatusValue(), 
        // this.render.getInputValues()
      );
    })

    this.currentTaskData = this.setCurrentTaskData();
  }


  setInit() {
    const dataTask = this.currentTaskData;
    this.eventBus.emit(NAMES.TASKS_LOAD, dataTask);
    this.notes.setContainer(this.render.noteWrapper);
    this.setEventListener(); // Слушает событие submit
  }
  
  setEventListener() {
    this.render.form.addEventListener('submit',  (e) => this.editTask(e));
  }

  editTask (e) {
    e.preventDefault();

    // Получим данные из формы
    const formData = this.formEditManager.getFormData(this.render.form);
 
    // Обновим даные задачи, передадим стартовые и новые знач-я задачи
    const updatedTaskData = this.formEditManager.updateTask(this.currentTaskData, formData);

    this.setCurrentTaskData(); // Обновим текущую задачу

    const taskSaved = this.taskManager.updateSingleTaskData(updatedTaskData); // Обновим задачу в массиве
  
    if (!taskSaved) {
      console.log('ошибка сохранения задачи');
      
      this.notes.getNote('error', 'Ошибка сохранения. Проверьте введённые данные.'); //type, text, container
      return;
    }

    const taskFormatted = this.formEditManager.formatFormData(taskSaved); // Приведем к формату

    // Установим новые знач-я в форму
    this.formEditManager.setFormTaskValue(
      taskFormatted,
      this.render.id, 
      this.render.date, 
      this.render.select, 
      this.render.selectStatus, 
      this.render.inputs
    );
    this.eventBus.emit(NAMES.TASKS_SAVE, taskFormatted);  

    this.notes.getNote('success', 'Задача успешно обновлена!'); //type, text, container
  }


  getTasksData () {
    const data = this.taskManager.getAllTasksData(); // Получим данные всех задач из массива data
    const dataCopy = [...data];     // Создадим копию массива

    return dataCopy;
  }

  setCurrentTaskData() {
    const dataTaskAll = this.getTasksData (); // Получим все задачи
    const id =  this.formEditManager.getTaskID(); // ID текущ. задачи
    const currentTask =  this.taskManager.findSingleTask(id, dataTaskAll); // Найдём текущ. задачу

    return currentTask ?  this.currentTaskData = currentTask : console.log('Задача не найдена'); // Найдена - вренем знач-е
  }


}

const controller = new Controller(
  editFormManager, 
  eventBus,
  renderEditForm,
  manager,
  storage,
  notes
);
controller.setInit();