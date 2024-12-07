import {RowFactory} from './elements/Row.js';

/**
 * Класс для управления отображением таблицы задач.
 * @class
*/
class TableRender {
  /**
   * Создает экземпляр класса TableRender для отображения таблицы.
   * @param {Object} param0 - Параметры для конфигурации.
   * @param {RowFactory} param0.rowFactory - Экземпляр RowFactory для создания строк таблицы.
  */
  constructor ({rowFactory}) {
    this.row = rowFactory;
    this.tbody = this.setTbody();
    this.select = document.querySelector('#productSelect');
    this.statusBar = document.querySelector('#topStatusBar');
    this.asideStatus = document.querySelector('#asideStatusNav');
    this.asideStatusCounter = document.querySelector('#badge-new');
  }

  /**
   * Создает фрагмент строк таблицы на основе массива задач.
   * @param {Object[]} tasks - Массив объектов задач.
   * @returns {DocumentFragment} Фрагмент строк таблицы.
  */
  addRowsToTable (tasks) {
    if (!this.tbody) {
      console.error('Не найден <tbody>. Проверить наличие элем. в DOM.');
      return;
    }
    
    let container = this.tbody;
  
    for (let task of tasks) {
      container.insertAdjacentHTML('afterbegin', this.setRowHTML(task, task.status) );
    }

    return container;
  }

  resetTable() {
    this.tbody.textContent = '';
  }


  getSelect () {
    return this.select;
  }

  getStatusBar() {
    return this.statusBar;
  }
  getStatusAside(){
    return this.asideStatus;
  }
  setCounterStatusData(value) {
    this.asideStatusCounter.textContent = value ? value : '';
  }


  hideElements(elements) {
    console.log(elements);
    
    elements.forEach(element => element.classList.add('none'));
  }
  unhideElements(element) {
    element.classList.remove('none');
  }
  // e.target, this.statusAside, 'active'
  navActiveMark(target, navList, className) {
    const navItems = navList.querySelectorAll('li');
  
    navItems.forEach( (item) => {
      let classOwner = item.querySelector('[class="active"]');
      if(classOwner) {
        classOwner.classList.remove('active');
      }
    });
    
    target.classList.add(className);
  }


  /**
   * Создаёт строку таблицы на основе задачи.
   * @param {Object} task - Объект задачи с данными.
   */
  setRowHTML (task, status) {
    return  this.row.getTableRow(task, status);
  }

  /**
   * Получает элемент `<tbody>` таблицы.
   * @returns {HTMLElement} Элемент `tbody`.
   */
  setTbody() {
    let tbody = document.querySelector('#tbody');

    if (!tbody) {
      console.log('Не найден контейнер для рядов таблицы');
      return;
    }

    return tbody;
  }

  setAsideNavActive() {

  }
}

const renderTable = new TableRender( { 
  rowFactory : new RowFactory()
});

export {renderTable}