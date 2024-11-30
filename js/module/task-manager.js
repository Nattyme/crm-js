import { NAMES } from '../config.js';
import { Formatter } from "../utils/formatter.js"

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
   * Загружает данные из localStorage.
   *
   * @method loadFromStorage
   * @memberof TaskManager
   */
  loadFromStorage () {
    const storedData = localStorage.getItem(NAMES.TASKS_DATA);
    this.data = storedData ? JSON.parse(storedData) : [];
    console.log('Задачи получены из localStorage');
  }

  /**
   * Сохраняет данные в localStorage.
   *
   * @method saveToStorage
   * @memberof TaskManager
   */
  saveToStorage() {
    localStorage.setItem(NAMES.TASKS_DATA, JSON.stringify(this.data));
    console.log('Данные сохранены (обновлены) в local storage');
  }

  /**
   * Очищает данные из localStorage и обновляет данные в памяти.
   *
   * @method clearStorage
   * @memberof TaskManager
   */
  clearStorage() {
    localStorage.removeItem(NAMES.TASKS_DATA);
    this.data = [];
    this.eventBus.emit(NAMES.TASKS_SAVE); // Уведом-е об изменениях
    console.log('Данные удалены из local storage. Массив data пуст');
  }

  /**
   * Возвращает все задачи.
   *
   * @method getAll
   * @memberof TaskManager
   * @returns {Array} Массив всех задач.
   */
  getAll() {
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
  getData(id) {
    // В массиве data найдём нужную по ID
    let data = this.data.find(task => task.id === id);
 
    // Если ID не найден
    if (!data) return console.error(`Запись не найдена в ${this.data}`);

    const dataCopy = {...data};     // Создадим копию объекта
    dataCopy.date = this.getFormattedData( dataCopy.timestamp); // Добавим св-во дата в нужно формате
    
    return dataCopy;  // Вернём запись
  }

  /**
   * Форматирует временную метку.
   *
   * @method getFormattedData
   * @memberof TaskManager
   * @param {number} timestamp - Временная метка.
   * @returns {string} Отформатированная дата.
   */
  getFormattedData (data) {
    const func = new Formatter();
    const dataFormatted = func.prepareDisplay(data);
    console.log(dataFormatted);

    return dataFormatted;
  }

  /**
   * Добавляет новую задачу.
   *
   * @method addNewData
   * @memberof TaskManager
   * @param {number} id - ID новой задачи.
   * @param {Object} record - Данные задачи.
   * @returns {Object|null} Добавленную задачу или null в случае ошибки.
   */
  addNewData(id, record) {
    // Ищем пустые знач-я
    for ( const field in record) {
      if ( record[field] === null || record[field] === undefined) {
        console.log('Ошибка данных. Запись не добавлена.');
        return;
      }
    }

    record.id = id; 
    this.data.push(record); 
    console.log('DATA after ADD NEW DATA', this.data);

    // Событие сохранения 
    this.eventBus.emit(NAMES.TASKS_SAVE, record); 
    // this.eventBus.emit(record); // передадим запись 
    return record;
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

  /**
   * Удаляет задачу по ID.
   *
   * @method removeData
   * @memberof TaskManager
   * @param {number} recordID - ID задачи.
   * @returns {number} ID удалённой задачи.
   */
  removeData (recordID) {
    const recordIndex = this.data.findIndex(record => record.id === recordID);
    if (recordIndex !== -1) {
      this.data.splice(recordIndex, 1);
    }

    // Уведом-е об удалении 
    this.eventBus.emit(NAMES.TASK_REMOVED, recordID);

    return recordID;
  }
}

export { TaskManager };