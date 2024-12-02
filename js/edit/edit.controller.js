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
      console.log(this.render.id);
      
      console.log('Задача обновлена:', task);

      // Например, обновление интерфейса
      this.formEditManager.setFormTaskValue(
        task, 
        this.render.id, 
        this.render.date, 
        this.render.select, 
        this.render.selectStatus, 
        this.render.inputs);
    });


    this.currentTaskData = this.setCurrentTaskData();
  }
  

  setInit() {
    this.eventBus.emit(NAMES.TASKS_LOAD);

    const dataTask = this.currentTaskData;

    this.formEditManager.setFormTaskValue(
      dataTask, 
      this.render.id, 
      this.render.date, 
      this.render.select, 
      this.render.selectStatus, 
      this.render.inputs
    );

    this.setEventListener(); // Слушает событие submit
  }
  
  setEventListener() {
    this.render.form.addEventListener('submit',  (e) => this.editTask(e));
  }

  editTask (e) {
    e.preventDefault();
      
    const formData = this.formEditManager.getFormData(this.render.form);

    // Обновим задачу, передадим стартовые и новые знач-я задачи
    const taskUpdated = this.formEditManager.updateTaskData(this.currentTaskData, formData);
console.log(taskUpdated);

    // Установим новые знач-я в форму
    this.formEditManager.setFormTaskValue(
      taskUpdated, 
      this.render.id, 
      this.render.date, 
      this.render.select, 
      this.render.selectStatus, 
      this.render.inputs
    );

    this.taskManager.updateTask(taskUpdated); // Обновим задачу в массиве

    // Сохраняем обновленные данные в localStorage
    this.storage.saveToStorage();
    this.eventBus.emit(NAMES.TASKS_SAVE, taskUpdated);    
    console.log(NAMES.TASKS_SAVE);
    
  }


  getTasksData () {
    const data = this.taskManager.getAll(); // Получим данные всех задач из массива data
    const dataCopy = [...data];     // Создадим копию массива

    return dataCopy;
  }

  setCurrentTaskData() {
    const dataTaskAll = this.getTasksData ();
    const id =  this.formEditManager.getTaskID();
    console.log(dataTaskAll);
    console.log(id);
    
    return this.taskDataAction.getTaskData(id, dataTaskAll);
  }


}

const controller = new Controller();
controller.setInit();