import Formatter from '../utils/formatter.js';
import validate from './../utils/validate.js';

import { eventBus } from './../module/EventBus.js';
import { TaskManager } from './../module/TaskManager/TaskManager.js';
import { TaskDataActions } from  './../module/TaskManager/proto/TaskDataActions.js';
import { FormEdit } from './../module/form/FormEdit.js';
import { Storage } from '../module/TaskManager/proto/Storage.js';
import { EditFormRender } from './EditFormRender.js';


class Controller {
  constructor () {
    this.eventBus = eventBus; // общий EventBus
    console.log(this);
    this.manager = new TaskManager(eventBus);
    this.dataActions = new TaskDataActions();
    this.formActions = new FormEdit();
    this.render = new EditFormRender();
    this.storage = this.manager.storage;

    // Получим элем-ты формы из render
    const {form, select, selectStatus, inputs} = this.render.getFormElements();
    // Передадим в методы форм
    this.formActions.initFormElements(form, select, selectStatus, inputs); // Передадим элем. формы

     // Получим данные из localStorage
     this.storage.loadFromStorage();
  }

  setInit() {
    const dataTaskAll = this.getTasksData ();
    const id =  this.formActions.getTaskID();
    console.log(id);
    const dataTask = this.dataActions.getTaskData(id);
    console.log(dataTask);
    
    // 1. Получаем данные по задаче из loact storage
    // 2. Заполняем форму этими данными
    // 3. Слушаем клик по кнопке
    // 4. Если клик произошел - получаем данные всех полей формы.
    // 5. Валидация полей формы.
    // 6.Если ок - сохарняем в локал сторидж
    // 7. Заново устанавливаем обнов данные в форму?
  }

  getTasksData () {
    const data = this.manager.getAll(); // Получим данные всех задач из массива data
    const dataCopy = [...data];     // Создадим копию массива

    return dataCopy;
  }


}

const controller = new Controller();
controller.setInit();