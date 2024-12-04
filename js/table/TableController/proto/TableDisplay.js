class TableDisplay {
  constructor ( renderTable, manager, status ) {
    console.log(manager);
    
    this.renderTable = renderTable;
    this.manager = manager;
    this.status = status;
  }

  /**
    * Метод для получения, форматирования данных задач и добавления строк в таблицу.
    * Получает данные задач, форматирует их и добавляет в таблицу с учетом статусов.
  */
  setRows (dataToDisplay) {
    const dataFormatted = this.manager.prepareDisplay(dataToDisplay); // Отформатируем поля
    const statusData = this.status.getStatusData();  // Получили массив со всеми статусами

    this.renderTable.tableActions.addRowsToTable(dataFormatted, statusData);
  }

  getProductSelect () {
    
  }

  /**
   * Перерисовывает таблицу с обновленными данными.
  */
  renderRefresh () {
    this.setRows(statusName);
  }
}

export {TableDisplay};