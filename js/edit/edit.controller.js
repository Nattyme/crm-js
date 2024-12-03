import {NAMES} from './../config.js';
import {subscribeToEvents} from './../module/subscribeToEvents.js';
import { eventBus, TaskManager, TaskManagerActions, FormEdit } from './../model.js';
import { EditFormRender } from './EditFormRender.js';
import { Notes } from './../utils/notes.js';

class Controller {
  constructor () {
    this.eventBus = eventBus; // общий EventBus

    this.formEditManager = new FormEdit();
    this.taskManager = new TaskManager(eventBus);
    this.taskManagerAction = new TaskManagerActions();
    this.render = new EditFormRender();
 
    this.storage = this.taskManager.storage;
    
    const {form, select, selectStatus, inputs, noteWrapper} = this.render.getFormElements(); // Получим элем-ты формы из render
    this.formEditManager.initFormElems(form, select, selectStatus, inputs, noteWrapper);       // Передадим в методы форм
    this.note = new Notes(this.render.noteWrapper); // создадим класс увед-ий

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

    this.setCurrentTaskData(); // Обновим текущую задачу
    const taskSaved = this.taskManager.updateTaskInData(updatedTaskData); // Обновим задачу в массиве
    const taskFormatted = this.formEditManager.formatFromData(taskSaved);

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
    this.note.getNote('success', 'Задача успешно обновлена!'); //type, text, container
  }


  getTasksData () {
    const data = this.taskManager.getAll(); // Получим данные всех задач из массива data
    const dataCopy = [...data];     // Создадим копию массива

    return dataCopy;
  }

  setCurrentTaskData() {
    const dataTaskAll = this.getTasksData ();
    const id =  this.formEditManager.getTaskID();
    const currentTask =  this.taskManagerAction.getTaskData(id, dataTaskAll);

    if(currentTask) {
      this.currentTaskData = currentTask;
    } else {
      console.log('Задача не найдена');
      
    }
    
    return this.currentTaskData;
  }


}

const controller = new Controller();
controller.setInit();