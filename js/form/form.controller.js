import * as model from '../model.js';
import * as view from './form.view.js';
import { TestDataFactory } from './form.test-data.js';

class Controller {
  constructor () {
    this.manager = new model.TaskManager(); // менеджер для обработки задач
    this.render = new view.TaskRender(); // создадим рендера задачи
    this.form = this.render.form; // форма отправки
  }

  setEventListeners () {
    // Слушаем submit, запускаем ф-цию добавления задачи
    this.form.addEventListener('submit', (e) => this.setTask(e));
  }

  setInit() {
    this.setEventListeners();

    const testData = this.setRandomData(); // Получим случайные данные
    const task = new model.Task( {...testData} ); // создадим задачу случ-ые данные
  
    this.render.setValue(task); // заполним форму значениями задачи
    console.log('task added');
  }

  setTask(e) {
    e.preventDefault(); // отменяем стандарт. поведение
    console.log('click');
    
    const id = this.getTask();  // получим все задачи массива, считаем ID
    console.log(id);
    
    const task = this.render.getValues(); // получим данные задачи из формы
    console.log(task);
    this.manager.addNewData(id, task); // добавим задачу в массив
  }

  setRandomData () {
    const testData = TestDataFactory.createRandomRecord(); // получим случайные тест. данные
    return testData; 
  }

  getTask() {
    return this.manager.calcID( this.manager.getAll() ); 
  }

  getData() {
    return TestDataFactory.createRandomRecord(); 
  }

}

// Запустим программу
const controller = new Controller();
controller.setInit();
