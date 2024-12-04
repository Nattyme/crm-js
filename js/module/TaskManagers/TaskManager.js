import { NAMES } from '../../config.js';
import { Formatter } from '../../utils/formatter.js';
import {storage} from  './../../model.js';
import {eventBus} from  './../../model.js';

const formatter = new Formatter();

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
  constructor () {
    this.data = [];
    this.eventBus = eventBus; // общий EventBus

    // STORAGE
    this.storage = storage; // экз-р хранилища
    this.loadFromStorage =  this.storage.loadFromStorage.bind(this);
    this.saveToStorage =  this.storage.saveToStorage.bind(this);
    this.clearStorage =  this.storage.clearStorage.bind(this);


    // Подписка на события
    this.eventBus.on(NAMES.TASKS_LOAD, this.loadFromStorage.bind(this));
    this.eventBus.on(NAMES.TASKS_SAVE, this.saveToStorage.bind(this));
    this.eventBus.on(NAMES.TASKS_CLEAR, this.clearStorage.bind(this));

    // Получим данные из localStorage
    this.loadFromStorage();
  }

  updateSingleTaskData(taskUpdated) {
  
    const updatedTask = taskUpdated;
    if (!updatedTask || !updatedTask.id) {
      console.error("Нельзя обновить задачу", updatedTask);
      return
    }

    const taskIndex = this.data.findIndex(task => task.id === updatedTask.id);


    if (taskIndex !== -1) {
      this.data[taskIndex] = updatedTask; // Обновление статуса задачи в массиве
      this.eventBus.emit(NAMES.TASKS_SAVE, updatedTask); // Сохраненеи измен-ий
    } else {
      console.error("Задача с указанным id не найдена:", updatedTask.id);
    }
    return updatedTask;

  }

  /**
   * Добавляет новую задачу.
   *
   * @method addNewTask
   * @memberof TaskManager
   * @param {number} id - ID новой задачи.
   * @param {Object} record - Данные задачи.
   * @returns {Object|null} Добавленную задачу или null в случае ошибки.
   */
  addNewTask(id, record) {
    // Ищем пустые знач-я
    for ( const field in record) {
      if ( record[field] === null || record[field] === undefined) {
        console.log('Ошибка данных. Запись не добавлена.');
        return;
      }
    }

    record.id = id; // Добавим id
    this.data.push(record); 
    this.eventBus.emit(NAMES.TASKS_SAVE, record); 

    return record;
  }

  /**
   * Удаляет задачу по ID.
   *
   * @method removeData
   * @memberof TaskManager
   * @param {number} recordID - ID задачи.
   * @returns {number} ID удалённой задачи.
   */
  removeTask (recordID) {
    const recordIndex = this.data.findIndex(record => record.id === recordID);
    if (recordIndex !== -1) {
      this.data.splice(recordIndex, 1);
    }

    // Уведом-е об удалении 
    this.eventBus.emit(NAMES.TASK_REMOVED, recordID);

    return recordID;
  }

  /**
   * Возвращает все задачи.
   *
   * @method getTaskAllData
   * @memberof TaskManager
   * @returns {Array} Массив всех задач.
   */
  getAllTasksData() {
    return this.data;
  }

  /**
   * Возвращает задачу по её ID.
   *
   * @method getData
   * @memberof TaskManager
   * @param {number} id - ID задачи.
   * @returns {Object|null} Возвращает задачу или null, если не найдено.
   */
  getSingleTask(id, allTaskData) {
    // В массиве data найдём нужную по ID
    let data = allTaskData.find(task => task.id === Number(id) );

    // Если ID не найден
    if (!data) return console.log(`Запись не найдена в ${this.data}`);

    return this.createDataCopyFormatted(data);  // Вернём запись
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
    return data.length !== 0   ?    data.reduce( (max, task) => Math.max(max, task.id), 0) + 1   :    1;
  }

  createDataCopyFormatted (taskData) {
    const dataCopy = {...taskData};     // Копия объекта задачи
    dataCopy.date = this.formatDateTime( dataCopy.timestamp, 'date-time'); // Cв-во 'дата' в нужно формате

    return dataCopy;  // Вернём запись
  }

  // tasksPrepareDisplay (taskDataAll) {
  //   return formatter.formatPrepareDisplayTask(taskDataAll); 
  // }

  formatDateTime (timestamp, type = 'date') {
    if (type === 'date') {
      return formatter.formatDate(timestamp);
    }

    if (type === 'date-time') {
      return formatter.formatDateTime(timestamp);
    }
  }
 

}

export { TaskManager };