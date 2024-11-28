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
    this.rowsOnPage = this.setRowsNum();
    this.page = this.setNumber();
    this.pageTTL = this.getPageTTL();
  }

  /**
 * Общее количество строк в таблице.
 * @type {number}
 */
  getPageTTL() {
    return this.rowsTTL / this.rowsOnPage;
  }

  /**
   * Возвращает номер страницы для строки.
   * @param {number} currentRowId - ID текущей строки.
   * @param {number} pagesTTL - Общее количество страниц.
   * @param {number} rowsOnPage - Количество строк на странице.
   */
  getPageNum (currentRowId, pagesTTL, rowsOnPage) {

  }

  /**
   * Возвращает общее количество строк в таблице.
   * @returns {number} Количество строк.
   */
  getAll () {
    return this.rowsTTL;
  }
}

export { Table };