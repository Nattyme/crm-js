import {eventBus, status, TaskManager, formatter} from '../model.js';
import { renderTable } from './TableView/TableRender.js';


/**
 * Контроллер для управления задачами, обработки событий и обновления данных на странице.
 */
class Controller {
  constructor ({eventBus, status, render, manager, formatter}) {
    // Общие
    this.eventBus = eventBus; 
    this.status = status; 

    this.manager =  manager; 
    this.render = render; 
    this.formatter = formatter;
  }

  /**
  * Инициализация: загружает данные и заполняет таблицу.
  */
  setInit () {
    const data = this.manager.getAllTasksData();
    const statusArray = this.status.getStatusData();  
    const rowsData = this.getRowsData(data); 
   
    this.displayRows({data : rowsData, status: statusArray});
  }

  getRowsData (dataToDisplay) {
    return this.formatter.formatRows(dataToDisplay);
  }

  displayRows (dataArray, statusArray) {
    this.render.addRowsToTable(dataArray, statusArray);
  }
}

// Запуск приложения
const controller = new Controller({
  eventBus, 
  status,
  render : renderTable,
  manager : new TaskManager(eventBus),
  formatter
});

controller.setInit();
