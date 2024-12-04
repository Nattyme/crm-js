import { Task, manager, eventBus, formManager } from '../model.js';
import { TestDataFactory } from './TestDataFactory.js';
import {render} from './TaskRender.js';
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
  constructor ({ formManager, manager, render }) {
    this.eventBus = eventBus; // общий EventBus

    // Конструкторы
    this.form = formManager; // методы формы
    this.manager = manager; // менеджер для обработки задач
    this.render = render; // создадим рендера задачи
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
    this.render.form.addEventListener('submit', (e) => {
      const task = this.createTask(e);
      this.saveTask(task);
    });
  }

  /**
   * Инициализация контроллера: подключение слушателей событий и загрузка данных.
   * Генерирует случайные данные для задачи и заполняет форму.
   * 
   * @method
   */
  initController() {
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
  createTask(e) {
    e.preventDefault();   

    const id = this.getNextTaskId(); 
    const taskFormData = this.form.getFormData( this.render.form );   
    const newTask = new Task({...taskFormData});

    newTask.id = id;

    return (newTask)
  }

  saveTask(task) {
    this.manager.addNewTask(task);   
    this.eventBus.emit(NAMES.TASKS_SAVE);          // вызываем событие сохранения
    this.form.resetForm (this.render.form);    

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
    const testData = this.getRandomData(); 
    const taskData = new Task( {...testData} ); 

    // Отформатируем телефон
    const taskFormatted = this.form.prepareDisplay(taskData);
    const formElems = this.render.getFormElems();
    
    this.form.setFormData(taskFormatted, formElems); // заполним форму значениями задачи
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

// Запуск
const controller = new Controller({
  formManager,
  manager,
  render
 });

controller.initController();


