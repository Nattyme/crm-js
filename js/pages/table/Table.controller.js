import {eventBus, status, managerTask, formatter, storage} from '../../model.js';
import { renderTable } from './TableRender.js';
import { Filter } from './../../modules/Filter.js';


/**
 * Контроллер для управления задачами, обработки событий и обновления данных на странице.
 */
class Controller {
  constructor (eventBus, storage, status, renderTable, managerTask, formatter) {
    // Общие
    this.eventBus = eventBus; 
    this.storage = storage;
    this.status = status; 

    this.managerTask =  managerTask; 
    this.render = renderTable;
    this.filter =  new Filter(); 
    this.formatter = formatter;

    this.currentCategory = 'all'; 
    this.currentStatus = 'all';

  }

  /**
  * Инициализация: загружает данные и заполняет таблицу.
  */
  setInit () {
    this.initSelectElems();
    this.initTable();
    this.initEventListeners();
  }

  initSelectElems() {
    this.statusArray = this.status.getStatusData();
    this.selectProduct = this.render.getSelect();
    this.statusBar = this.render.getStatusBar();
  }

  initTable() {
    const dataTaskAll = this.storage.getAllTasksData(); // даннные из хранилища
    const rowsData = this.getRowsData(dataTaskAll); // данные в формате для отображения
 
    // Скрываем селект и статус, если категорий или задач нет
    if (!dataTaskAll.length) {
      this.render.hideElements([this.selectProduct, this.statusBar]) // если задач нет - спрячем селекты
    } 
    console.log(rowsData);
    
    this.displayRows(rowsData); // отобразим таблицу
  }

  getRowsData (dataToDisplay) {
    return this.formatter.formatPrepareDisplayTask(dataToDisplay);
  }

  displayRows (rowsData) {
    this.render.addRowsToTable(rowsData, this.statusArray);
  }

  initEventListeners() {
    this.eventBus.on(NAMES.FILTER_STATUS, () => this.mainFilter('status'));
    this.eventBus.on(NAMES.FILTER_PRODUCT, () => this.mainFilter('product'));
    this.selectProduct.onchange = () => {
      const selectedIndex = this.selectProduct.selectedIndex;
      this.currentCategory =  this.selectProduct[selectedIndex].value;
      this.doFilter(
        this.filter.filterSelect,
        {
          category : this.currentCategory,
          key: 'product'
        }
      )
    }
      
    this.statusBar.addEventListener ('click', (e)=> {
      this.currentCategory = e.target.getAttribute('data-value');
      this.doFilter(
        this.filter.filterSelect,
        {
          category : this.currentCategory,
          key: 'status'
        }
      )
    });

    this.doFilter(this.filter.filterSelect, {
      category : currentCategory,
      key: 'product'
    })
  }

  doSeveralFilters(data, filtersArr) {
    return filtersArr.reduce( (filteredData, filter) => {
      return filter.method({ ...filter.params, data: filteredData});
    }, data);
  }
  
  
  doFilter (filterType, filterParams) {
    const dataTaskAll = this.storage.getAllTasksData();

    // Парам-ры для работы фильтра
    const filteredData = filterType({
      data: dataTaskAll,
      ...filterParams
    });

    this.render.resetTable(); 

    const rowsData = this.getRowsData(filteredData);
    this.displayRows( rowsData, this.statusArray);

    const filters = [
      {
        method: this.filter.filterSelect,
        params: {
          category: currentCategory, key: 'product'
        }
      },
      {
        method: this.filter.filterNotSelect,
        params: {category: currentStatus}
      }
    ];

    // const filteredData = this.filter.doSeveralFilters(dataTasksAll, filters);

    console.log('Массив отфильрованных задач: ', filteredData);
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
