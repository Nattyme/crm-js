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
  }
  

  setInit() {
    const dataTaskAll = this.getTasksData ();
    const id =  this.formEditManager.getTaskID();

    const dataTask = this.taskDataAction.getTaskData(id, dataTaskAll);
    const timestampOrigin = this.formEditManager.getTimestampOrigin(dataTask);
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
    console.log(formData);
    const id = Formatter.getUrlID();
    const taskUpdated = this.formEditManager.updateTaskData(id, formData);
    console.log(taskUpdated);
    this.formEditManager.setFormTaskValue();
  }


  getTasksData () {
    const data = this.taskManager.getAll(); // Получим данные всех задач из массива data
    const dataCopy = [...data];     // Создадим копию массива

    return dataCopy;
  }


}

const controller = new Controller();
controller.setInit();