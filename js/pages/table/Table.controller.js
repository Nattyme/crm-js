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
    this.initFilters();
    this.initTable();
    this.initEventListeners();
  }



  initFilters(){
    this.filters =  [
      {
        method: this.filter.filterSelect,
        params: {
          category: this.currentCategory, 
          key: 'product'
        }
      },
      {
        method: this.filter.filterNotSelect,
        params: {
          category: this.currentCategory,
          key: 'status'
        }
      }
    ];
  }

  initSelectElems() {
    this.statusArray = this.status.getStatusData();
    this.selectProduct = this.render.getSelect();
    this.statusBar = this.render.getStatusBar();
    this.statusAside = this.render.getStatusAside();
  }

  initTable() {
    const dataTaskAll = this.storage.getAllTasksData(); // даннные из хранилища
    const newTasksAmount =  this.storage.calcTasksByStatus('new');
    this.render.setCounterStatusData(newTasksAmount);
   
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
    this.selectProduct.onchange = () => {
      const selectedIndex = this.selectProduct.selectedIndex;
      this.currentCategory = this.selectProduct[selectedIndex].value;
      this.applyFilters(); // Применяем фильтры
    };
  
    this.statusBar.addEventListener('click', (e) => {
      this.currentStatus = e.target.getAttribute('data-value');
      this.applyFilters(); // Применяем фильтры
    });
  }

  doFilter (filterType, filterParams) {
    const dataTaskAll = this.storage.getAllTasksData();

    // Парам-ры для работы фильтра
    let filteredData = filterType({
      data: dataTaskAll,
      ...filterParams
    });

    this.render.resetTable(); 

    const rowsData = this.getRowsData(filteredData);
    this.displayRows( rowsData, this.statusArray);
  }

  updateFilters() {
    this.filters = [
      {
        method: this.filter.filterSelect,
        params: {
          category: this.currentCategory, 
          key: 'product'
        }
      },
      {
        method: this.filter.filterSelect,
        params: {
          category: this.currentStatus,
          key: 'status'
        }
      }
    ];
  }

  applyFilters() {
    const dataTaskAll = this.storage.getAllTasksData(); // Получаем все данные
    this.updateFilters(); // Обновляем фильтры
    const filteredData = this.filter.doSeveralFilters(dataTaskAll, this.filters); // Применяем фильтры
  
    this.render.resetTable(); // Сбрасываем таблицу
    const rowsData = this.getRowsData(filteredData); // Преобразуем данные для отображения
    this.displayRows(rowsData); // Отображаем данные
  }

  countAsideStatus(taskDataAll) {
    this.asideStatusCounter
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
