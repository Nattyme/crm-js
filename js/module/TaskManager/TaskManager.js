import { NAMES } from './../../config.js';

// Прототипы
import {Storage} from  './proto/Storage.js';
import { addNewData, removeData, getAll, getData, getFormattedData } from  './proto/actions.js';

/**
 * Класс для управления задачами.
 * Позволяет добавлять, удалять, сохранять и загружать задачи.
 * 
 * @class TaskManager
 * @see {@link ./validate.js|Модуль валидации}
 * @see {@link ./model.js|Модуль }
 * @see {@link EventBus|EventBus - Объект для управления событиями}
 */
class TaskManager {
  /**
   * Конструктор класса TaskManager.
   * Подключает обработку событий и загружает задачи из хранилища.
   *
   * @param {EventBus} eventBus - Экземпляр EventBus для управления событиями.
   */
  constructor (eventBus) {
    this.data = [];
    this.eventBus = eventBus; // общий EventBus

    // Прототипы
    // STORAGE
    this.storage = new Storage(); // экз-р хранилища
    this.loadFromStorage =  this.storage.loadFromStorage.bind(this);
    this.saveToStorage =  this.storage.saveToStorage.bind(this);
    this.clearStorage =  this.storage.clearStorage.bind(this);

    // ACTIONS
    this.addNewData = addNewData.bind(this);
    this.removeData = removeData.bind(this);
    this.getAll = getAll.bind(this);
    this.getData = getData.bind(this);
    this.getFormattedData = getFormattedData.bind(this);

    // Подписка на события
    this.eventBus.on(NAMES.TASKS_LOAD, this.loadFromStorage.bind(this));
    this.eventBus.on(NAMES.TASKS_SAVE, this.saveToStorage.bind(this));
    this.eventBus.on(NAMES.TASKS_CLEAR, this.clearStorage.bind(this));
    this.eventBus.on(NAMES.STATUS_CHANGED, this.updateTaskStatus.bind(this)); // обнов-е статуса задачи

    // Получим данные из localStorage
    this.loadFromStorage();

    console.log('DATA FROM THE START: ', this.data); 
  }

  /**
   * Обновляет статус задачи в массиве данных.
   * @param {Object} updatedTask - Объект задачи с обновлёнными данными.
   * @throws {Error} Если задача с таким `id` не найдена, выводится ошибка.
 */
  updateTaskStatus(updatedTask) {
    const taskIndex = this.data.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.data[taskIndex] = updatedTask; // Обновление статуса задачи в массиве
      this.eventBus.emit(NAMES.TASKS_SAVE); // Сохраненеи измен-ий
    } else {
      console.error(`Задача ${updatedTask.id} не найдена`);
    }
  }

  /**
   * Рассчитывает ID для новой задачи.
   *
   * @method calcID
   * @memberof TaskManager
   * @param {Array} data - Массив всех задач.
   * @returns {number} Новый ID.
   */
  calcID (data) {
    let id;
    
    if ( data.length !== 0 ) {
      id = data.reduce( (max, task) => Math.max(max, task.id), 0) + 1;
    } else {
      id = 1;
    }

    return id;
  }

}

export { TaskManager };