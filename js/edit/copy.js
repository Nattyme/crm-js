import {NAMES} from './../config/config.js';
import { eventBus, editFormManager, manager, storage } from '../model.js';
import { renderEditForm } from './EditFormRender.js';
import { MESSAGES } from './../data/messages.js';
import { Notes } from '../utils/notes.js';

class Controller {
  constructor (editFormManager, eventBus, renderEditForm, manager,  storage) {
    this.eventBus = eventBus; 
    this.formEditManager = editFormManager;
    this.taskManager = manager;
    this.render = renderEditForm;    
    this.storage = storage;
    this.notes = new Notes(this.render.noteWrapper, MESSAGES);
    this.currentTaskData = this.setCurrentTaskData();

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
      const formElems = {
        id : this.render.getIdValue(), 
        date : this.render.getDateValue(), 
        select : this.render.getProductSelect(), 
        status : this.render.getStatusSelect(), 
        inputs : this.render.getInputValues()
      }
  
      this.formEditManager.setFormTaskValue(formDataFormatted, formElems);
    })

  }


  // setInit() {
  //   const dataTask = this.currentTaskData;
  //   this.eventBus.emit(NAMES.TASKS_LOAD, dataTask);
  //   this.setEventListener(); // Слушает событие submit
  // }
  
  setEventListener() {
    this.render.form.addEventListener('submit',  (e) => this.editTask(e));
  }

  editTask (e) {
    e.preventDefault();

    // Получим данные из формы
    const formData = this.formEditManager.getFormData(this.render.form);
 console.log(formData);
 
    // Если не получили отред. задачу - ошибка
    if ( updatedTaskData === false ) {
      this.notes.addNote('error', this.notes.MESSAGES.ERROR.empty_value());
      return;
    }

    const taskSaved = this.taskManager.updateSingleTaskData(updatedTaskData); // Обновим задачу в массиве
    console.log(taskSaved);
    return
    
    if (!taskSaved) {
      this.notes.addNote('error', this.notes.MESSAGES.ERROR.unvalid_value()); //type, text, container
      return;
    }

    const taskFormatted = this.formEditManager.formatFormData(taskSaved); // Приведем к формату

    // Обновим даные задачи, в массиве передадим стартовые и новые знач-я задачи
    const updatedTaskData = this.formEditManager.updateTask(this.currentTaskData, formData);
    console.log(updatedTaskData.data);
    console.log(updatedTaskData.render);
    this.setCurrentTaskData(); // Обновим текущую задачу

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

    // Уведом-е об успехе
    this.notes.addNote('success', this.notes.MESSAGES.SUCCESS.save()); // type, text
  }


  // getTasksData () {
  //   const data = this.taskManager.getAllTasksData(); // Получим данные всех задач из массива data
  //   const dataCopy = [...data];     // Создадим копию массива

  //   return dataCopy;
  // }

  // setCurrentTaskData() {
  //   const dataTaskAll = this.getTasksData (); // Получим все задачи
  //   const id =  this.formEditManager.getTaskID(); // ID текущ. задачи
  //   const currentTask =  this.taskManager.findSingleTask(id, dataTaskAll); // Найдём текущ. задачу

  //   return currentTask ?  this.currentTaskData = currentTask : console.log('Задача не найдена'); // Найдена - вренем знач-е
  // }


}

const controller = new Controller(
  editFormManager, 
  eventBus,
  renderEditForm,
  manager,
  storage
);
controller.setInit();