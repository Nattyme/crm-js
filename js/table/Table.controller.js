import {eventBus, status, manager, formatter} from '../model.js';
import { renderTable } from './TableView/TableRender.js';
import { Filter } from './../module/Filter.js';


/**
 * Контроллер для управления задачами, обработки событий и обновления данных на странице.
 */
class Controller {
  constructor ({eventBus, status, renderTable, manager, formatter}) {
    // Общие
    this.eventBus = eventBus; 
    this.status = status; 

    this.manager =  manager; 
    this.render = renderTable;
    this.filter =  new Filter(); 
    this.formatter = formatter;
  }

  /**
  * Инициализация: загружает данные и заполняет таблицу.
  */
  setInit () {
    const data = this.manager.getAllTasksData();
    const statusArray = this.status.getStatusData();  
    let rowsData = this.getRowsData(data); 
    const selectProduct = this.render.getSelect();
    const statusBar = this.render.getStatusBar();

    // Скрываем селект, если категорий или задач нет
    if ( !data.length > 0) {
      this.render.hideElements([selectProduct, statusBar]) // если задач нет - спрячем селекты
    }
   
    this.displayRows({data : rowsData, status: statusArray});

    selectProduct.onchange = ()=>{
      const selectIndex = selectProduct.selectedIndex;
      let currentCategory = selectProduct[selectIndex].value;

      const dataForFilterStart = {
          data : data,
          category : currentCategory,
          key : 'product'
      }
      const taskFiltered = this.filter.filterSelect(dataForFilterStart); 
      
     
      this.render.resetTable();
      const rowsData = this.getRowsData(taskFiltered); 
      this.displayRows({data : rowsData, status: statusArray});
      console.log('Массив отфлильтрованных задач', taskFiltered);
    }

    statusBar.addEventListener ('click', (e)=>{
      let currentCategory = e.target.getAttribute('data-value');
      console.log(e.target.getAttribute('data-value'));
      
    });
    
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
  formatter
});

controller.setInit();
