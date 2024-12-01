import { eventBus, TaskManager, FormEdit } from './../model.js';
import { TaskDataActions } from  './../module/TaskManager/proto/TaskDataActions.js';
import { Storage } from '../module/TaskManager/proto/Storage.js';
import { EditFormRender } from './EditFormRender.js';


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

    this.render.form.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('submitted');
      
      
    });
    
    const dataTaskAll = this.getTasksData ();
    const id =  this.formEditManager.getTaskID();
    console.log(id);
    
    const dataTask = this.taskDataAction.getTaskData(id, dataTaskAll);
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
    const data = this.taskManager.getAll(); // Получим данные всех задач из массива data
    const dataCopy = [...data];     // Создадим копию массива

    return dataCopy;
  }


}

const controller = new Controller();
controller.setInit();