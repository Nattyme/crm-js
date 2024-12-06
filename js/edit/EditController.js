import {NAMES} from './../config/config.js';
import { eventBus, editFormManager, managerTask, manager, storage } from '../model.js';
import { renderEditForm } from './EditFormRender.js';
import { MESSAGES } from './../data/messages.js';
import { Notes } from '../utils/notes.js';

class Controller {
  constructor(eventBus, editFormManager, renderEditForm, managerTask, manager,  storage) {
    this.eventBus = eventBus; 
    this.formEditManager = editFormManager;
    this.render = renderEditForm;   
    this.managerTask = managerTask; 
    this.tasksManager = manager;
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

  // Старт контроллера
  initController() {
    const dataTask = this.currentTaskData;
    console.log('текущая задача currentTask: ', this.currentTaskData);
    
    this.eventBus.emit(NAMES.TASKS_LOAD, dataTask);
    console.log('emit TASK_LOAD, передаёт задачу:' , dataTask);
    
    this.setEventListener(); // Слушает событие submit
  }

  setCurrentTaskData() {
    const dataTaskAll = this.storage.getAllTasksData(); // Получим все задачи
    console.log('все задачи на старте: ', dataTaskAll);
    
    const id =  this.managerTask.getTaskId(); // ID текущ. задачи
    console.log('id текущ задачи currentTask на старте: ', id);

    const currentTask =  this.tasksManager.findOneTask(id, dataTaskAll); // Найдём текущ. задачу
    console.log('данные currentTask на старте: ', currentTask);

    return currentTask ?  this.currentTaskData = currentTask : console.log('Задача не найдена'); // Найдена - вренем знач-е
  }
}







const controller = new Controller(
  eventBus,
  editFormManager, 
  renderEditForm,
  managerTask,
  manager,
  storage
);
controller.initController();