// Table actions
class TableActions {
  constructor( RowFactory ) {
    this.tbody =  this.setTbody();
    this.row = new RowFactory();
  }
  /**
 * Создаёт фрагмент строк таблицы на основе массива задач.
 * @param {Object[]} tasks - Массив задач.
 * @returns {DocumentFragment} Фрагмент строк таблицы.
 */
  addRowsToTable (tasksData, status) {
    if (!this.tbody) {
      console.error('Не найден <tbody>. Проверьте наличие элемента в DOM.');
      return;
    }
    let container = this.tbody;

    for (let task of tasksData) {
      container.insertAdjacentHTML('afterbegin', this.setRowHTML(task, status) );
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

export default TableActions;
