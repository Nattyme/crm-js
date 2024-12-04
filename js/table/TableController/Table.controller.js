import {eventBus, status, TaskManager, } from './../../model.js';
import { RowFactory, TableRender } from './../TableView/Table.view.js';
import { Filter } from './../../module/Filter.js';

// Прототипы
import TableTaskManager from './proto/TableTaskManager.js';
import {TableDisplay} from './proto/TableDisplay.js';
import {EventHandle} from './proto/EventHandle.js';

/**
 * Контроллер для управления задачами, обработки событий и обновления данных на странице.
 */
class Controller {
  constructor () {
    this.eventBus = eventBus; // Общий EventBus
    this.status = status; // Общий статус

    // Прототипы
    this.tableTaskManager = new TableTaskManager( new TaskManager(eventBus) ); // Менеджер для работы с задачами в таблице
    this.tableDisplay = new TableDisplay(  new TableRender,  this.tableTaskManager, this.status );// Рендер таблицы
    this.listeners = new EventHandle( this.eventBus, this.status, this.tableDisplay, this.tableTaskManager );
  }

  /**
  * Инициализация: загружает данные и заполняет таблицу.
  */
  setInit () {
 
    const dataToDisplay = this.tableTaskManager.getTasksData(); // Получим данные всех задач из массива data
    this.tableDisplay.setRows(dataToDisplay);
    this.listeners.setEventListeners(); // иницал-ция слушателей
  }


}

// Запуск приложения
const controller = new Controller();
controller.setInit();
