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
  constructor ({eventBus, status, taskManager, tableRender}) {
    // Общие
    this.eventBus = eventBus; 
    this.status = status; 

    // Прототипы
    this.tableTaskManager =  new TableTaskManager(taskManager); 
    this.tableDisplay = new TableDisplay(tableRender, this.tableTaskManager, this.status); 
    this.listeners = new EventHandle(this.eventBus, this.status, this.tableDisplay, this.tableTaskManager )

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
const controller = new Controller({
  eventBus, 
  status,
  taskManager : new TaskManager(eventBus),
  tableRender : new TableRender
});
controller.setInit();
