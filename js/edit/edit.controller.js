import {NAMES} from './../config.js';
import { eventBus, TaskManager, FormEdit } from './../model.js';
import { TaskDataActions } from  '../module/TaskManager/TaskDataActions.js';
import { EditFormRender } from './EditFormRender.js';
import Formatter from './../utils/formatter.js';


class Controller {
  constructor () {
    this.eventBus = eventBus; // общий EventBus

    this.formEditManager = new FormEdit();
    this.taskManager = new TaskManager(eventBus);
    this.taskDataAction = new TaskDataActions();
    this.render = new EditFormRender();

    this.storage = this.taskManager.storage;
    
    const {form, select, selectStatus, inputs} = this.render.getFormElements(); // Получим элем-ты формы из render
    this.formEditManager.initFormElems(form, select, selectStatus, inputs);       // Передадим в методы форм

    this.storage.loadFromStorage();      // Получим данные из localStorage


    this.eventBus.on(NAMES.TASKS_SAVE, (task) => {
      const taskFormatted = this.formEditManager.formatFromData(task); //отформатируем поля для отображения
      // Обновление интерфейса
      this.formEditManager.setFormTaskValue(
        taskFormatted, 
        this.render.id, 
        this.render.date, 
        this.render.select, 
        this.render.selectStatus, 
        this.render.inputs
      );
    });
    this.eventBus.on(NAMES.TASKS_LOAD, (task) => {
      this.storage.loadFromStorage();

      const formDataFormatted = this.formEditManager.formatFromData(task);
      this.formEditManager.setFormTaskValue(
        formDataFormatted, 
        this.render.id, 
        this.render.date, 
        this.render.select, 
        this.render.selectStatus, 
        this.render.inputs
      );
    })

    
    this.currentTaskData = this.setCurrentTaskData();
  }
  

  setInit() {
    const dataTask = this.currentTaskData;
    this.eventBus.emit(NAMES.TASKS_LOAD, dataTask);

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
    this.setCurrentTaskData(updatedTaskData); // Обновим текущую задачу
    const taskSaved = this.taskManager.updateTaskInData(updatedTaskData); // Обновим задачу в массиве
    const task = this.formEditManager.formatFromData(taskSaved); //отформатируем поля для отображения
    console.log(task);
   
    // Установим новые знач-я в форму
    this.formEditManager.setFormTaskValue(
      task, 
      this.render.id, 
      this.render.date, 
      this.render.select, 
      this.render.selectStatus, 
      this.render.inputs
    );
    this.eventBus.emit(NAMES.TASKS_SAVE, task);    
  }


  getTasksData () {
    const data = this.taskManager.getAll(); // Получим данные всех задач из массива data
    const dataCopy = [...data];     // Создадим копию массива

    return dataCopy;
  }

  setCurrentTaskData() {
    const dataTaskAll = this.getTasksData ();
    const id =  this.formEditManager.getTaskID();
    
    return this.taskDataAction.getTaskData(id, dataTaskAll);
  }


}

const controller = new Controller();
controller.setInit();