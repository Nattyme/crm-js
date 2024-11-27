import { NAMES } from '../config.js';
import * as model from '../model.js';
import * as view from '../table/table.view.js';

class Controller {
  constructor () {
    this.eventBus = model.eventBus; // общий EventBus

    this.manager = new model.TaskManager(model.eventBus); // менеджер для работы с задачами
    this.render = view.TableRowFactory; // создадим рендер ряда с задачей
  }

  setInit () {
    this.setEventListeners();
    this.eventBus.emit(NAMES.TASKS_LOAD);

    const status = new model.Status();

    
    this.setRows()
  }

  setRows () {
    const data = this.manager.getAll(); // Получим данные всех задач и массива data
    const dataCopy = [...data];     // Создадим копию массива

    let rows = [];

    for ( const task of dataCopy) {
      task.date = this.manager.getFormattedData( task.timestamp); // Добавим св-во дата в нужном формате
  
      let row =  view.TableRowFactory.createTableRow(task); // Получим разметку и по очереди подставим данные каждой задачи массива
      console.log(row);
      
      rows.push(row); // Добавим задачу на страницу

    }
    console.log(rows);
  }

  setEventListeners () {
    
  }
}

// Запустим программу
const controller = new Controller();
controller.setInit();



