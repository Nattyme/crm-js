import { NAMES } from './config.js';
import { validate } from './validate.js';


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

    // Получим данные из localStorage
    this.loadFromStorage();

    console.log('DATA FROM THE START: ', this.data); 
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
    console.log(data);
    
    // Если ID не найден
    if (!data) return console.error(`Запись не найдена в ${this.data}`);

    const dataCopy = {...data};     // Создадим копию массива
    dataCopy.date = this.getFormattedData( dataCopy.timestamp); // Добавим св-во дата в нужно формате
    console.log('Запись, вовращённая getData: ');
    console.log(dataCopy);
    
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
  getFormattedData (timestamp) {
    const formatter = new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    return dateFormatter(timestamp, formatter);
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
    // Обходим св-ва в массиве, ищем пустые знач-я
    for ( const field in record) {
      if ( record[field] === null || record[field] === undefined) {
        console.log('Ошибка данных. Запись не добавлена.');
        return;
      }
    }

    record.id = id; // Запишем ID в задачу
    this.data.push(record); // Добавим задачу в массив
    console.log('DATA after ADD NEW DATA', this.data);

    // Событие сохранения
    this.eventBus.emit(NAMES.TASKS_SAVE);
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
      const lastRecord = data[data.length - 1];
      id = lastRecord.id + 1;
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
    return recordID;
  }
}

/**
 * Класс для создания задачи и её валидации.
 *
 * @class Task
 * @see {@link ./validate.js|Модуль валидации}
 */
class Task {
  constructor ( {full_name, phone, email, product}) {
    // this.id = id,
    this.timestamp = Date.now();
    this.full_name = this.setProperty( full_name, validate.name),
    this.product = product,
    this.email = this.setProperty( email, validate.email),
    this.phone = this.setProperty( phone, validate.phone),
    this.status = this.setStatus();
  }

  /**
   * Валидирует значение с использованием соответствующей функции.
   *
   * @method setProperty
   * @memberof Task
   * @param {string} value - Значение для валидации.
   * @param {Function} validate - Функция для валидации.
   * @returns {string|null} Отвалидированное значение или null, если ошибка.
   */
  setProperty ( value, validate) {
    const result = validate(value);
 
    if(!result.valid) {
      console.log(result.error);
      return null;
    } 
    
    return result.value;
  }

  setStatus(name = NAMES.NEW) {
    return name;
  }

}

/**
 * Класс для управления событиями.
*
* @class EventBus
*/
class EventBus {
  constructor () {
    this.listeners = {} // объект хранит события и подписчиков
  }


  /**
   * Подписывается на событие.
   *
   * @method on
   * @memberof EventBus
   * @param {string} event - Название события.
   * @param {Function} callback - Функция-обработчик.
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  /**
 * Отписывается от события.
 *
 * @method off
 * @memberof EventBus
 * @param {string} event - Название события.
 * @param {Function} callback - Функция-обработчик.
 */
  off (event, callback) {
    if ( !this.listeners[event]) return;

    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

   /**
   * Вызывает событие.
   *
   * @method emit
   * @memberof EventBus
   * @param {string} event - Название события.
   * @param {*} data - Данные, которые передаются обработчику.
   */
  emit ( event, data) {
    if ( !this.listeners[event]) return;
    this.listeners[event].forEach(callback => callback(data));
  }
}

class Status {
  constructor () {
    this.data = {
      NEW : {
        type : 'new',
        text : 'Новый'
      },
  
      DOING : {
        type : 'processing',
        text : 'В работе'
      },
  
      DONE : {
        type : 'succeed',
        text : 'Завершенный'
      }
    };

    this.types = this.setTypes();
  }
  
  setTypes() {
    console.log(this.data)
    return this.data;
  }

  getStatus(name) {
    for (let type in this.types) {
      return name === type ? this.types[type] : null;
    }
  }

}

class Table {
  constructor (totalRows) {
    this.rowsTTL = totalRows;
    this.rowsOnPage = this.setRowsNum();
    this.page = this.setNumber();
    this.pageTTL = this.getPageTTL();
  }

  getPageTTL() {
    return this.rowsTTL / this.rowsOnPage;
  }

  getPageNum (currentRowId, pagesTTL, rowsOnPage) {

  }

  getAll () {
    return this.rowsTTL;
  }
}

// Единый экз-р EventBus
const eventBus = new EventBus();

/**
 * Функция для форматирования временной метки.
 * 
 * @function dateFormatter
 * @memberof module:TaskManagerModule
 * @param {number} timestamp - Временная метка.
 * @param {Intl.DateTimeFormat} formatter - Форматтер для даты.
 * @returns {string} Отформатированная дата.
 */
const dateFormatter = function (timestamp, formatter) {
  const date = formatter.format( new Date(timestamp) );

  return date;
}



/**
 * Экспорт классов и функций модуля.
 * 
 * @module TaskManagerModule
 * @exports {TaskManager} - Класс для работы с задачами.
 * @exports {Task} - Класс для создания задач.
 * @exports {EventBus} - Класс для управления событиями.
 * @exports {dateFormatter} - Функция для форматирования временных меток.
  */
export { TaskManager, Task, EventBus, Status, Table, dateFormatter, eventBus}




