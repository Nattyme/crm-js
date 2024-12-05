import {eventBus, status, manager, formatter} from '../model.js';
import { renderTable } from './TableView/TableRender.js';
import { Filter } from './../module/Filter.js';


/**
 * Контроллер для управления задачами, обработки событий и обновления данных на странице.
 */
class Controller {
  constructor ({eventBus, status, renderTable, manager, filter, formatter}) {
    // Общие
    this.eventBus = eventBus; 
    this.status = status; 

    this.manager =  manager; 
    this.render = renderTable;
    this.filter = filter; 
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

    const select = this.render.getSelect();
    select.onchange = ()=>{
      console.log(select[select.selectedIndex].value);
      currentCategory = select[select.selectedIndex].value;
      const taskFiltered = this.filter.doFilter(currentCategory);
      console.log('Массив отфлильтрованных задач', taskFiltered);
    }
    
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
  renderTable,
  manager,
  filter : new Filter(),
  formatter
});

controller.setInit();
