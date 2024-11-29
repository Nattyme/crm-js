import { NAMES } from '../config.js';
import * as model from '../model.js';
import * as view from '../table/table.view.js';

class Controller {
  constructor () {
    this.eventBus = model.eventBus; // Общий EventBus
    this.status = model.status; // Общий статус

    this.manager = new model.TaskManager(model.eventBus); // Менеджер для работы с задачами
    this.render = view.TableRowFactory; // Рендер ряда с задачей
    this.renderTable = new view.TableRender; // Рендер таблицы

    this.setEventListeners(); // иницал-ция слушателей
  }

  setInit () {
    this.eventBus.emit(NAMES.TASKS_LOAD);
    console.log(this.status);
    
    this.setRows()
  }

  setRows () {
    const data = this.manager.getAll(); // Получим данные всех задач и массива data
    const dataCopy = [...data];     // Создадим копию массива

    for ( const task of dataCopy) {
      task.date = this.manager.getFormattedData( task.timestamp); // Добавим св-во дата в нужном формате
    }

    // Получили массив со всеми статусами
    const statusData = this.status.getStatusData();
    this.renderTable.addRowsToTable(dataCopy, statusData);
  }

  setEventListeners () {
    // Добав. слушателя для события измен-я статуса
    this.eventBus.on(NAMES.STATUS_CHANGED, this.handleStatusChange.bind(this));
  }

  // Обработчик измен.статуса
  handleStatusChange(taskID, dataCopy, statusName, newStatusData) {
    this.status.setStatus(statusName, newStatusData); // Обновляем статус

    // Обнов-е статуса задачи
    const task = this.manager.getTaskById(taskID);

    if ( task ) {
      task.status = statusName; //  устанав. новый статус

      // Перерисовать страницу
      this.setRows(statusName);
      this.eventBus.on(NAMES.STATUS_CHANGED, (taskID, statusName, newStatusData) => {
        console.log('Событие STATUS_CHANGED: ', { taskID, statusName, newStatusData });
      });
    }
  }
}

// Запустим программу
const controller = new Controller();
controller.setInit();



