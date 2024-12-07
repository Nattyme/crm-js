import {testData, products} from './data/data.js';
import { Task } from './modules/Task.js';
import { TasksStorage } from './modules/TasksStorage.js';
import { TaskEditManager } from './modules/TaskEditManager.js';
import { EventEmitter } from './modules/Event/EventEmitter.js';
import { Status } from './modules/Status.js';
import { Storage } from './modules/Storage.js';
import { Formatter } from "./utils/Formatter.js";
import { FormManager } from './modules/FormManager.js';
import { FormEdit } from './modules/FormEditManager.js';


/**
 * Создаёт новый экземпляр Status, который управляет данными статусов задач.
 * @constant {Status} status - Экземпляр класса Status, содержащий данные статусов.
 */
const status = new Status();
const eventBus = new EventEmitter(); // Общий экз-р эммитера
const storage = new Storage(eventBus);
const formatter = new Formatter(status, products);

const managerTask = new Task(eventBus, storage, formatter, status);
const manager = new TasksStorage(eventBus, storage, formatter);

const formManager = new FormManager({formatter});
const editFormManager = new FormEdit(eventBus, managerTask, formatter);

export { 
  manager, 
  TaskEditManager, 
  managerTask, 
  formManager, 
  editFormManager, 
  status, 
  eventBus, 
  storage, 
  formatter, 
  products
}




