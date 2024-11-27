class Table {
  constructor (totalRows) {
    this.rowsTTL = totalRows;
    this.rowsOnPage = this.setRowsNum();
    this.page = this.setNumber();
    this.pageTTL = this.getPageTTL();
  }

  getPageTTL() {
    return this.rowsTTL / this.rowsOnPage;
  }

  getPageNum (currentRowId, pagesTTL, rowsOnPage) {

  }

  getAll () {
    return this.rowsTTL;
  }
}

class TableRow {
  constructor (taskData) {
    this.html = ``;
  }

  setData (taskData) {
    
  }

  renderRow (taskData) {
    this.setData(taskData);
  }

  setStatus(type) {
    const status = [
      {
        type : 'new',
        text : 'Новый',
        class : 'badge-danger'
      },
      {
        type : 'processing',
        text : 'В работе',
        class : 'badge-warning'
      },
      {
        type : 'new',
        text : 'Завершенный',
        class : 'badge-success'
      }
    ];

    return statusData;
  }
}

export { TableRow }