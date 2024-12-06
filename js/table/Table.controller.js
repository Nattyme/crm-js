import {eventBus, status, managerTask, formatter, storage} from '../model.js';
import { renderTable } from './TableView/TableRender.js';
import { Filter } from './../module/Filter.js';


/**
 * Контроллер для управления задачами, обработки событий и обновления данных на странице.
 */
class Controller {
  constructor (eventBus, storage, status, renderTable, managerTask, formatter) {
    // Общие
    this.eventBus = eventBus; 
    this.storage = storage;
    this.status = status; 

    this.manager =  managerTask; 
    this.render = renderTable;
    this.filter =  new Filter(); 
    this.formatter = formatter;
  }

  /**
  * Инициализация: загружает данные и заполняет таблицу.
  */
  setInit () {
    const dataTaskAll = this.storage.getAllTasksData();
    const statusArray = this.status.getStatusData();
    const selectProduct = this.render.getSelect();
    const statusBar = this.render.getStatusBar();

    let rowsData = this.getRowsData(dataTaskAll); 


//  console.log('rows data at start', rowsData);//ok

    // Скрываем селект, если категорий или задач нет
    if ( !dataTaskAll.length > 0) {
      this.render.hideElements([selectProduct, statusBar]) // если задач нет - спрячем селекты
    }
  //  console.log(statusArray);
   
    this.displayRows({data : rowsData, status: statusArray});

    selectProduct.onchange = ()=>{
      const selectIndex = selectProduct.selectedIndex;
      let currentCategory = selectProduct[selectIndex].value;
      
      const dataForFilterStart = {
          data : dataTaskAll,
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

      const dataForFilterStart = {
        data : dataTaskAll,
        category : currentCategory,
        key : 'status'
      }

      const taskFiltered = this.filter.filterNotSelect(dataForFilterStart); 
      
      this.render.resetTable(); // Удалили все поля таблицы


      rowsData = this.getRowsData(taskFiltered); 
      console.log(rowsData);
      
      this.displayRows({data : rowsData, status: statusArray});
      console.log('Массив отфлильтрованных задач', taskFiltered);
      
    });
    
  }

  getRowsData (dataToDisplay) {
    console.log('get rows data', dataToDisplay);
    
    // return this.formatter.formatRows(dataToDisplay);
    return this.formatter.formatPrepareDisplayTask(dataToDisplay);
  }

  displayRows (dataArray, statusArray) {
    console.log('display rows', dataArray);
    
    this.render.addRowsToTable(dataArray, statusArray);
  }
}

// Запуск приложения
const controller = new Controller(
  eventBus, 
  storage,
  status,
  renderTable,
  managerTask,
  formatter
);

controller.setInit();
