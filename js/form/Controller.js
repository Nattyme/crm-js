import * as model from '../model.js';
import * as view from './TaskRender.js';
import { TestDataFactory } from './TestDataFactory.js';
import { NAMES } from '../config.js';

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
  constructor () {
    this.eventBus = model.eventBus; // общий EventBus

    // Конструкторы
    this.formActions = new model.FormActions(); // методы формы
    this.manager = new model.TaskManager(model.eventBus); // менеджер для обработки задач
    this.render = new view.TaskRender(); // создадим рендера задачи

    // Элементы форсмы
    this.form = this.render.getForm();                 // форма
    this.select = this.render.getSelect();       // селект
    this.inputs = this.render.getInputs();      // инпуты

  }

  /**
   * Устанавливает обработчики событий для формы.
   * Подключает обработчик на событие отправки формы.
   * 
   * @method
   */
  setEventListeners () {
    // Слушаем submit, запускаем ф-цию добавления задачи
    this.form.addEventListener('submit', (e) => this.setTask(e));
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
    const task = this.setRandomData();  // заполним форму значениями задачи, вернём её данные

    console.log('DATA AT THE FORM: ', task);
  }

  /**
   * Метод обработки отправки формы. Создаёт новую задачу и сохраняет её в менеджер задач.
   * 
   * @param {Event} e Событие отправки формы.
   * 
   * @method
   */
  setTask(e) {
    e.preventDefault(); // отмена стандарт. поведение

    const id = this.getNextTaskId(); 

    const taskData = this.formActions.getFormData( this.form );          // получим данные задачи из формы
    const task = new model.Task({ ...taskData });                  // Создадим задачу

    this.manager.addNewData(id, task);                           // добавим задачу в массив
    this.eventBus.emit(NAMES.TASKS_SAVE);                      // вызываем событие сохранения
    this.formActions.resetForm (this.select, this.inputs);                     // Очистим форму

    this.setRandomData ();                                 // Заново заполним данные
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
    const task = new model.Task( {...testData} ); // создадим случ-ую задачу 

    this.formActions.setFormData(task, this.inputs, this.select); // заполним форму значениями задачи

    return task; 
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
    return this.manager.calcID( this.manager.getAll() ); 
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
const controller = new Controller();
controller.setInit();

