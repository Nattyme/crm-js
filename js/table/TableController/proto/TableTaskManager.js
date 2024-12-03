import {Formatter} from "../../../utils/formatter.js";

const formatter = new Formatter();

class TableTaskManager {
  constructor ( manager ) {
    this.taskTableManager = manager;
  }

  /**
   * Получить данные всех задач, с форматированием временной метки.
   * @returns {Array} Скопированные и отформатированные данные задач.
  */
  getTasksData () {
    const data = this.taskTableManager.getAllTasksData(); // Получим данные всех задач из массива data
    const dataCopy = [...data];     // Создадим копию массива

    return dataCopy;
  }

  /**
   * Обновление статуса задачи по ID.
   * @param {number} taskID - ID задачи, статус которой нужно обновить.
  */
  updateTaskStatus ( taskID ) {
    const task = this.taskTableManager.getTaskById(taskID);  

    if (task) { task.status = statusName; } 
  }

  // Прокси вызовы
  getTasksDataCopy () {
    const data = this.taskTableManager.getAll();
    const dataCopy = [...data];
    return dataCopy;
  }
  
  prepareDisplay(data) {
    return formatter.formatPrepareDisplayTask(data); // прокси вызов
  }
}

export default TableTaskManager;