import {NAMES} from './../config.js';
import { eventBus, TaskManager, FormEdit } from './../model.js';
import { TaskDataActions } from  '../module/TaskManager/TaskDataActions.js';
import { Storage } from '../module/TaskManager/Storage.js';
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
    const dataTask = this.currentTaskData;
console.log(dataTask);

    this.formEditManager.setFormTaskValue(
      dataTask, 
      this.render.id, 
      this.render.date, 
      this.render.select, 
      this.render.selectStatus, 
      this.render.inputs
    );

    this.setEventListener(); // Слушает событие submitw
    
    // 4. Если клик произошел - получаем данные всех полей формы.
    // 5. Валидация полей формы.
    // 6.Если ок - сохарняем в локал сторидж
    // 7. Заново устанавливаем обнов данные в форму?
  }
  
  setEventListener() {
    this.render.form.addEventListener('submit',  (e) => this.editTask(e));
  }

  editTask (e) {
    e.preventDefault();
      
    const formData = this.formEditManager.getFormData(this.render.form);
    const id = this.render.id.textContent;  // Получим значение id из dom-элемента id 
    console.log(id);
    console.log( this.render.selectStatus);

    // Обновим задачу, передадим стартовые и новые знач-я задачи
    const taskUpdated = this.formEditManager.updateTaskData(this.currentTaskData, formData);
    console.log(taskUpdated);
    
    this.formEditManager.setFormTaskValue(
      taskUpdated, 
      this.render.id, 
      this.render.date, 
      this.render.select, 
      this.render.selectStatus, 
      this.render.inputs
    );
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