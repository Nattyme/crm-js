/**
 * Класс `Table` представляет данные таблицы, включая количество строк, страниц и текущую страницу.
 */
class Table {
  /**
   * Создаёт объект `Table`.
   * @param {number} totalRows - Общее количество строк в таблице.
   */
  constructor (totalRows) {
    this.rowsTTL = totalRows;
  }
}

export { Table };