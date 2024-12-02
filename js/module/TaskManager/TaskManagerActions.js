import { NAMES } from '../../config.js';
import validate from '../../utils/validate.js';
import Formatter from '../../utils/formatter.js';

// actions
class TaskManagerActions {
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
  removeData (recordID) {
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
  getTaskData(id, allTaskData) {
    // В массиве data найдём нужную по ID
    let data = allTaskData.find(task => task.id === Number(id) );

    // Если ID не найден
    if (!data) return console.log(`Запись не найдена в ${this.data}`);

    const dataCopy = {...data};     // Создадим копию объекта
    console.log(dataCopy);
    dataCopy.date = this.formatDateTime( dataCopy.timestamp, 'date-time'); // Добавим св-во дата в нужно формате

    return dataCopy;  // Вернём запись
  }

  prepareDisplay (taskDataAll) {
    const formatter = new Formatter();
    return formatter.formatPrepareDisplayTask(taskDataAll); 
  }

  formatDateTime (timestamp, type = 'date') {
    const func = new Formatter();
    
    if (type === 'date') {
      return func.formatDate(timestamp);
    }

    if (type === 'date-time') {
      return func.formatDateTime(timestamp);
    }
  }
 
}

export {TaskManagerActions};
