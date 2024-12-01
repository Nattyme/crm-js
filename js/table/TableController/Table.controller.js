import {eventBus, status, TaskManager, } from './../../model.js';
import { RowFactory, TableRender } from './../TableView/Table.view.js';

// Прототипы
import TableTaskManager from './proto/TableTaskManager.js';
import TableActions from './proto/TableActions.js';
import EventBus from './proto/EventBus.js';

/**
 * Контроллер для управления задачами, обработки событий и обновления данных на странице.
 */
class Controller {
  constructor () {
    this.eventBus = eventBus; // Общий EventBus
    this.status = status; // Общий статус

    this.manager = new TaskManager(eventBus); // Менеджер для работы с задачами
    this.render = RowFactory; // Рендер ряда с задачей
    this.renderTable = new TableRender; // Рендер таблицы

    // Прототипы
    this.tableTaskManager = new TableTaskManager( this.manager );
    this.tableActions = new TableActions(  this.renderTable,  this.tableTaskManager, this.status );
    this.taskEventBus = new EventBus( this.eventBus, this.status, this.tableActions, this.tableTaskManager );

    // this.setEventListeners(); // иницал-ция слушателей
  }

  /**
  * Инициализация: загружает данные и заполняет таблицу.
  */
  setInit () {
    this.tableActions.setRows();
    this.taskEventBus.setEventListeners(); // иницал-ция слушателей
  }
}

// Запуск приложения
const controller = new Controller();
controller.setInit();
