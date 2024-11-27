import * as model from '../model.js';
import * as view from './form.view.js';
import { TestDataFactory } from './form.test-data.js';

class Controller {
  constructor () {
    this.eventBus = model.eventBus; // общий EventBus

    this.manager = new model.TaskManager(model.eventBus); // менеджер для обработки задач
    this.render = new view.TaskRender(); // создадим рендера задачи
    this.form = this.render.form; // форма отправки
  }

  setEventListeners () {
    // Слушаем submit, запускаем ф-цию добавления задачи
    this.form.addEventListener('submit', (e) => this.setTask(e));
  }

  setInit() {
    this.setEventListeners();
    this.eventBus.emit('tasks:load');

    // this.manager.loadFromStorage();
    const testData = this.setRandomData(); // Получим случайные данные
    const task = new model.Task( {...testData} ); // создадим задачу случ-ые данные
  
    this.render.setValue(task); // заполним форму значениями задачи
    console.log('DATA AT THE FORM: ', task);
  }

  setTask(e) {
    e.preventDefault(); // отменяем стандарт. поведение

    const id = this.getNextTaskId();  // получим все задачи массива, считаем ID
    const taskData = this.render.getValues(); // получим данные задачи из формы
    const task = new model.Task({ ...taskData }); // Создадим задачу

    this.manager.addNewData(id, task); // добавим задачу в массив
    this.eventBus.emit('tasks:save'); // вызываем событие сохранения
  }

  setRandomData () {
    const testData = TestDataFactory.createRandomRecord(); // получим случайные тест. данные
    return testData; 
  }

  getNextTaskId() {
    return this.manager.calcID( this.manager.getAll() ); 
  }

  getData() {
    return TestDataFactory.createRandomRecord(); 
  }

}

// Запустим программу
const controller = new Controller();
controller.setInit();
