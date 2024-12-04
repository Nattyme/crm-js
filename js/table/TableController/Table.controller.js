import {eventBus, status, TaskManager, } from './../../model.js';
import { TableRender } from './../TableView/Table.view.js';
import { Filter } from './../../module/Filter.js';

// Прототипы
import {TableDisplay} from './proto/TableDisplay.js';
import {EventHandle} from './proto/EventHandle.js';


/**
 * Контроллер для управления задачами, обработки событий и обновления данных на странице.
 */
class Controller {
  constructor ({eventBus, status, tableRender}) {
    // Общие
    this.eventBus = eventBus; 
    this.status = status; 

    // Прототипы
    this.manager =  new TaskManager(eventBus); 
    this.tableDisplay = new TableDisplay(tableRender, this.manager, this.status); 
    this.listeners = new EventHandle(this.eventBus, this.status, this.tableDisplay, this.manager );


  }

  /**
  * Инициализация: загружает данные и заполняет таблицу.
  */
  setInit () {
    const data = this.manager.getAllTasksData(); // Получим данные всех задач из массива data
    const dataToDisplay = [...data];     // Создадим копию массива
  
    this.tableDisplay.setRows(dataToDisplay);
    this.listeners.setEventListeners(); // иницал-ция слушателей
  }


}

// Запуск приложения
const controller = new Controller({
  eventBus, 
  status,
  tableRender : new TableRender()
});
controller.setInit();
