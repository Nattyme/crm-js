import {RowFactory} from './elements/Row.js';

/**
 * Класс для управления отображением таблицы задач.
*/
class TableRender {
  constructor ({rowFactory}) {
    this.row = rowFactory;
    this.tbody = this.setTbody();
    this.select = document.querySelector('#productSelect');
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

    for (let task of tasks.data) {
      container.insertAdjacentHTML('afterbegin', this.setRowHTML(task, task.status) );
    }

    return container;
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