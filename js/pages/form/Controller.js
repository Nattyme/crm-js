import { eventBus, storage, managerTask, formManager } from '../../model.js';
import { TestDataFactory } from './TestDataFactory.js';
import { render } from './TaskRender.js';
import { NAMES } from '../../config/config.js';
import { Notes } from '../../utils/notes.js';
import { validate } from './../../utils/validate.js';


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
  constructor ( eventBus, storage, managerTask, formManager, render) {
    this.eventBus = eventBus; 
    this.storage = storage;
    this.managerTask = managerTask;
    this.formManager = formManager; // методы формы
    this.render = render; 
    this.notes = new Notes(); //  увед-ия
  }

  /**
   * Инициализация контроллера: подключение слушателей событий и загрузка данных.
   * Генерирует случайные данные для задачи и заполняет форму.
   * 
   * @method
   */
  initController() {
    this.managerTask.initTask();
    this.render.initTaskRender();
    this.setRandomData();  // заполним форму значениями задачи
    this.eventBus.emit(NAMES.TASKS_LOAD);
    this.setEventListeners();
    this.notes.setContainer(this.render.notewrapper);
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
   * Метод обработки отправки формы. Создаёт новую задачу и сохраняет её в менеджер задач.
   * 
   * @param {Event} e Событие отправки формы.
   * 
   * @method
   */
  createTask(e) {
    e.preventDefault();   

    const id = this.storage.calcTaskId(); 
    const taskFormData = this.formManager.getFormData( this.render.form );   
    const newTask = this.managerTask.createNewTask(taskFormData);

    newTask.id = id;

    return (newTask)
  }

  saveTask(newTask) {
    if(!newTask) { console.log(this.notes.MESSAGES.ERROR.empty_value())};

    newTask.phone = validate.phone(newTask.phone).value; // Отформатируем телефон
    const taskAdd = this.storage.addTaskToStorage(newTask);     
    this.eventBus.emit(NAMES.TASKS_SAVE, taskAdd); // вызываем событие сохранения

    this.formManager.resetForm (this.render.form);    
    this.setRandomData ();// Заново заполним данные
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
    const taskData = managerTask.setTestData(testData); 

    // Подготовим данные к рендеру
    const taskFormatted = this.formManager.prepareDisplay(taskData);
    const formElems = this.render.getFormElems();
    
    this.formManager.setFormData(taskFormatted, formElems); // заполним форму значениями задачи
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
const controller = new Controller(
  eventBus,
  storage,
  managerTask,
  formManager,
  render
);

controller.initController();


