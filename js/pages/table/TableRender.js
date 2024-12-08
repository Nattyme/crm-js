import {RowFactory} from './elements/Row.js';

/**
 * Класс для управления отображением таблицы задач.
*/
class TableRender {
  constructor ({rowFactory}) {
    this.row = rowFactory;
    this.tbody = this.setTbody();
    this.select = document.querySelector('#productSelect');
    this.statusBar = document.querySelector('#topStatusBar');
  }

  /**
 * Создаёт фрагмент строк таблицы на основе массива задач.
 * @param {Object[]} tasks - Массив задач.
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

  hideElements(elements) {
    console.log(elements);
    
    elements.forEach(element => element.classList.add('none'));
  }
  unhideElements(element) {
    element.classList.remove('none');
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
}

const renderTable = new TableRender( { 
  rowFactory : new RowFactory()
});

export {renderTable}