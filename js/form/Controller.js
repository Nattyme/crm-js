import { Task, TaskManager, eventBus, Form, formatter  } from '../model.js';
import { TaskRender } from './TaskRender.js';
import { TestDataFactory } from './TestDataFactory.js';
import { NAMES } from '../config.js';
import { Notes } from './../utils/notes.js';
/**
 * Контроллер для обработки логики формы задач.
 * Этот класс управляет взаимодействием между моделью, видом и данными, включая обработку событий и управление задачами.
 * 
 * @class
 * @see model.TaskManager
 * @see view.TaskRender
 * @see TestDataFactory
 */
class Controller {

  /**
   * Конструктор для инициализации контроллера.
   * 
   * Создаёт экземпляры необходимых классов, таких как EventBus, TaskManager, TaskRender,
   * и связывает их с соответствующими свойствами. Также извлекает форму для отправки задач.
   * 
 * @constructor
 */
  constructor (formatter) {
    this.eventBus = eventBus; // общий EventBus

    // Конструкторы
    this.form = new Form ({formatter}); // методы формы
    this.manager = new TaskManager(); // менеджер для обработки задач
    this.render = new TaskRender(); // создадим рендера задачи
    this.note = new Notes(); // создадим класс увед-ий

    this.render.initFormElems();  // Передадим элементы формы в рендер
  }

  /**
   * Устанавливает обработчики событий для формы.
   * Подключает обработчик на событие отправки формы.
   * 
   * @method
   */
  setEventListeners () {
    // Слушаем submit, запускаем ф-цию добавления задачи
    this.render.form.addEventListener('submit', (e) => this.setTask(e));
  }

  /**
   * Инициализация контроллера: подключение слушателей событий и загрузка данных.
   * Генерирует случайные данные для задачи и заполняет форму.
   * 
   * @method
   */
  setInit() {
    this.setEventListeners();
    this.eventBus.emit(NAMES.TASKS_LOAD);
    this.setRandomData();  // заполним форму значениями задачи
  }

  /**
   * Метод обработки отправки формы. Создаёт новую задачу и сохраняет её в менеджер задач.
   * 
   * @param {Event} e Событие отправки формы.
   * 
   * @method
   */
  setTask(e) {
    e.preventDefault();   // отмена стандарт. поведение

    const id = this.getNextTaskId(); 
    const taskFormData = this.form.getFormData( this.render.form );  // получим данные задачи из формы
    
    const task = new Task({...taskFormData});   // Создадим задачу    

    this.manager.addNewTask(id, task);      // добавим задачу в массив
    this.eventBus.emit(NAMES.TASKS_SAVE);          // вызываем событие сохранения
    this.form.resetForm (this.render.form);    // Очистим форму

    this.setRandomData ();        // Заново заполним данные
  }

  
  /**
   * Получает случайные тестовые данные для создания задачи.
   * 
   * @returns {Object} Случайно выбранная запись с данными задачи.
   * @see TestDataFactory#createRandomRecord
   * 
   * @method
   */
  setRandomData () {
    const testData = this.getRandomData(); // получим случайные тест. данные
    const taskData = new Task( {...testData} ); // создадим случ-ую задачу 
    // Отформатируем телефон
    const taskFormatted = this.form.prepareDisplay(taskData);
    const formElems = this.render.getFormElems();
    
    this.form.setFormData(taskFormatted, formElems); // заполним форму значениями задачи

    return taskFormatted; 
  }

  /**
   * Получает следующий доступный ID для новой задачи.
   * 
   * @returns {number} Следующий доступный ID.
   * @see model.TaskManager#calcID
   * 
   * @method
   */
  getNextTaskId() {
    return this.manager.calcID( this.manager.getAllTasksData() ); 
  }

  /**
   * Метод для получения случайных данных (тестовых записей).
   * 
   * @returns {Object} Случайные данные для задачи.
   * @see TestDataFactory#createRandomRecord
   * 
   * @method
   */
  getRandomData() {
    return TestDataFactory.createRandomRecord(); 
  }

}

// Запустим программу
const controller = new Controller(formatter);
controller.setInit();


