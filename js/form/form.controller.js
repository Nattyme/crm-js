import * as model from '../model.js';
import * as view from './form.view.js';
import { TestDataFactory } from './form.test-data.js';
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
    this.manager = new model.TaskManager(model.eventBus); // менеджер для обработки задач
    this.render = new view.TaskRender(); // создадим рендера задачи
    this.form = this.render.form; // форма отправки
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

    // this.manager.loadFromStorage();
    const testData = this.setRandomData(); // Получим случайные данные
    const task = new model.Task( {...testData} ); // создадим задачу случ-ые данные

    this.render.fillOutForm(task); // заполним форму значениями задачи
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

    const id = this.getNextTaskId();                    // получим все задачи массива, считаем ID
    const taskData = this.render.collectFormValues();   // получим данные задачи из формы
    const task = new model.Task({ ...taskData });      // Создадим задачу

    this.manager.addNewData(id, task);        // добавим задачу в массив
    this.eventBus.emit(NAMES.TASKS_SAVE);     // вызываем событие сохранения
    // this.render.resetForm ();              // Очистим форму
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
    const testData = TestDataFactory.createRandomRecord(); // получим случайные тест. данные
    return testData; 
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
  getData() {
    return TestDataFactory.createRandomRecord(); 
  }

}

// Запустим программу
const controller = new Controller();
controller.setInit();


