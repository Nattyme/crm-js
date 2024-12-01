class TableTaskManager {
  constructor ( manager ) {
    this.taskTableManager = manager;
  }

  /**
   * Получить данные всех задач, с форматированием временной метки.
   * @returns {Array} Скопированные и отформатированные данные задач.
  */
  getTasksData () {
    const data = this.taskTableManager.getAll(); // Получим данные всех задач из массива data
    const dataCopy = [...data];     // Создадим копию массива

    return dataCopy;
  }

  /**
   * Обновление статуса задачи по ID.
   * @param {number} taskID - ID задачи, статус которой нужно обновить.
  */
  updateTaskStatus ( taskID ) {
    const task = this.taskTableManager.getTaskById(taskID);  

    if (task) {task.status = statusName; } 
  }

  // Прокси вызовы
  getTasksData () {
    const data = this.taskTableManager.getAll();
    const dataCopy = [...data];
    return dataCopy;
  }
  
  getFormattedData(data) {
    return this.taskTableManager.getFormattedData(data); // Прокси вызов
  }
}

export default TableTaskManager;