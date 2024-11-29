import { NAMES } from '../config.js';
import * as model from '../model.js';
import * as view from '../table/table.view.js';

/**
 * Контроллер для управления задачами, обработки событий и обновления данных на странице.
 */
class Controller {
  constructor () {
    this.eventBus = model.eventBus; // Общий EventBus
    this.status = model.status; // Общий статус

    this.manager = new model.TaskManager(model.eventBus); // Менеджер для работы с задачами
    this.render = view.TableRowFactory; // Рендер ряда с задачей
    this.renderTable = new view.TableRender; // Рендер таблицы

    this.setEventListeners(); // иницал-ция слушателей
  }

  /**
  * Инициализация: загружает данные и заполняет таблицу.
  */
  setInit () {
    // this.eventBus.emit(NAMES.TASKS_LOAD);
    this.setRows();
  }

  /**
   * Настроить строки таблицы, добавив все задачи с их статусами.
  */
  setRows () {
    const dataCopy = this.getTasksData(); // Получим данные всех задач из массива data
    const statusData = this.status.getStatusData();  // Получили массив со всеми статусами

    this.renderTable.addRowsToTable(dataCopy, statusData);
  }

  /**
   * Получить данные всех задач, с форматированием временной метки.
   * @returns {Array} Скопированные и отформатированные данные задач.
  */
  getTasksData () {
    const data = this.manager.getAll(); // Получим данные всех задач из массива data
    const dataCopy = [...data];     // Создадим копию массива

    for ( const task of dataCopy) {
      task.date = this.manager.getFormattedData( task.timestamp); // Добавим св-во дата в нужном формате
    }
  }

   /**
   * Устанавливает слушателей для событий.
   */
  setEventListeners () {
    // Добав. слушателя для события измен-я статуса
    this.eventBus.on(NAMES.STATUS_CHANGED, this.handleStatusChange.bind(this));
  }

  /**
   * Обработчик изменения статуса задачи.
   * @param {string} statusName - Название статуса.
   * @param {Object} newStatusData - Данные нового статуса.
  */
  handleStatusChange(statusName, newStatusData) {
    this.updateTaskStatus(); //  устанав. новый статус
    this.status.setStatus(statusName, newStatusData); // Обновляем статус
    this.renderRefresh();  // Перерисовать страницу
  }

  /**
   * Обновление статуса задачи по ID.
   * @param {number} taskID - ID задачи, статус которой нужно обновить.
  */
  updateTaskStatus ( taskID ) {
    const task = this.manager.getTaskById(taskID);  

    if (task) {task.status = statusName; } 
  }

   /**
   * Перерисовывает таблицу с обновленными данными.
  */
  renderRefresh () {
    this.setRows(statusName);
  }
}

// Запуск приложения
const controller = new Controller();
controller.setInit();
