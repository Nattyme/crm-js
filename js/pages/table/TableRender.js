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

  /**
   * Очищает таблицу, удаляя все строки.
  */
  resetTable() {
    this.tbody.textContent = '';
  }

  /**
   * Получает элемент выбора продукта.
   * @returns {HTMLElement} Элемент выбора продукта.
  */
  getSelect () {
    return this.select;
  }

  /**
   * Получает элемент верхней панели состояния.
   * @returns {HTMLElement} Элемент верхней панели состояния.
  */
  getStatusBar() {
    return this.statusBar;
  }

  /**
   * Получает элемент боковой панели состояния.
   * @returns {HTMLElement} Элемент боковой панели состояния.
  */
  getStatusAside(){
    return this.asideStatus;
  }

  /**
   * Устанавливает значение счетчика на боковой панели состояния.
   * @param {string|number} value - Значение для отображения в счетчике.
  */
  setCounterStatusData(value) {
    this.asideStatusCounter.textContent = value ? value : '';
  }

  /**
   * Скрывает элементы, добавляя класс 'none'.
   * @param {HTMLElement[]} elements - Массив элементов для скрытия.
  */
  hideElements(elements) {
    console.log(elements);
    
    elements.forEach(element => element.classList.add('none'));
  }

  /**
   * Отображает элемент, удаляя класс 'none'.
   * @param {HTMLElement} element - Элемент, который нужно отобразить.
  */
  unhideElements(element) {
    element.classList.remove('none');
  }

  /**
   * Помечает элемент навигации как активный, удаляя класс 'active' с других элементов.
   * @param {HTMLElement} target - Элемент, который должен стать активным.
   * @param {HTMLElement} navList - Список навигационных элементов.
   * @param {string} className - Класс для добавления активному элементу.
  */
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
   * Создает строку таблицы на основе данных задачи.
   * @param {Object} task - Объект задачи с данными.
   * @param {string} status - Статус задачи.
   * @returns {string} Строка HTML для отображения задачи в таблице.
  */
  setRowHTML (task, status) {
    return  this.row.getTableRow(task, status);
  }

  /**
   * Получает элемент <tbody> таблицы.
   * @returns {HTMLElement} Элемент <tbody>.
  */
  setTbody() {
    let tbody = document.querySelector('#tbody');

    if (!tbody) {
      console.log('Не найден контейнер для рядов таблицы');
      return;
    }

    return tbody;
  }
}

const renderTable = new TableRender( { 
  rowFactory : new RowFactory()
});

export {renderTable}