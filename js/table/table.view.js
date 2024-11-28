import { TableRowFactory } from './row-factory/row.factory.js';

/**
 * Класс для управления отображением таблицы задач.
 */
class TableRender {
  constructor () {
    this.tbody = this.setTbody();
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

  /**
   * Создаёт строку таблицы на основе задачи.
   * @param {Object} task - Объект задачи с данными.
   */
  setRowHTML (task, statuses) {
    const row = new TableRowFactory();
    return row.createTableRow(task, statuses, statuses.data.NEW);
  }

  /**
   * Создаёт фрагмент строк таблицы на основе массива задач.
   * @param {Object[]} tasks - Массив задач.
   * @returns {DocumentFragment} Фрагмент строк таблицы.
   */
  setAllRows (tasks, statuses) {
    const fragmentOfRows = document.createDocumentFragment();

    for (let task of tasks) {
      fragmentOfRows.appendChild( this.setRowHTML(task, statuses) );
    }

    return fragmentOfRows;
  }

  /**
   * Добавляет строки задач в таблицу.
   * @param {Object[]} tasks - Массив задач.
   * @returns {HTMLElement} Обновлённый элемент `tbody` с добавленными строками.
   */
  addRowsToTable (tasks, statuses) {
    const rows = this.setAllRows(tasks, statuses);
    return this.tbody.appendChild(rows);
  }
}

export { TableRender, TableRowFactory }