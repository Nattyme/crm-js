import { RowFactory } from './factory/row.js';

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
  setRowHTML (task, status) {
    const row = new RowFactory();
    return row.getTableRow(task, status);
  }

  /**
   * Создаёт фрагмент строк таблицы на основе массива задач.
   * @param {Object[]} tasks - Массив задач.
   * @returns {DocumentFragment} Фрагмент строк таблицы.
   */
  setAllRows (tasks, status) {
    const fragmentOfRows = document.createDocumentFragment();

    for (let task of tasks) {
      fragmentOfRows.appendChild( this.setRowHTML(task, status) );
    }

    return fragmentOfRows;
  }

  /**
   * Добавляет строки задач в таблицу.
   * @param {Object[]} tasks - Массив задач.
   * @returns {HTMLElement} Обновлённый элемент `tbody` с добавленными строками.
   */
  addRowsToTable (tasks, status) {
    const rows = this.setAllRows(tasks, status);
    return this.tbody.appendChild(rows);
  }
}

export { TableRender, RowFactory }