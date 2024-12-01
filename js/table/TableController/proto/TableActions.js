class TableActions {
  constructor ( renderTable, manager, status ) {
    this.renderTable = renderTable;
    this.manager = manager;
    this.status = status
  }

  /**
    * Метод для получения, форматирования данных задач и добавления строк в таблицу.
    * Получает данные задач, форматирует их и добавляет в таблицу с учетом статусов.
  */
  setRows () {
    const dataCopy = this.manager.getTasksData(); // Получим данные всех задач из массива data
   
    const dataFormatted = this.manager.getFormattedData(dataCopy); // Отформатируем поля
    const statusData = this.status.getStatusData();  // Получили массив со всеми статусами

    this.renderTable.tableActions.addRowsToTable(dataFormatted, statusData);
  }

  /**
   * Перерисовывает таблицу с обновленными данными.
  */
  renderRefresh () {
    this.setRows(statusName);
  }
}

export default TableActions;