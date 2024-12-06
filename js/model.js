import {testData, products} from './data/data.js';
import { Task } from './module/TaskManagers/Task.js';
import { TaskManager } from './module/TaskManagers/TasksManager.js';
import { TaskEditManager } from './module/TaskManagers/TaskEditManager.js';
import { EventEmitter } from './module/Event/EventEmitter.js';
import { Status } from './module/Status.js';
import { Storage } from './module/Storage.js';
import { Formatter } from "./utils/Formatter.js";
import { FormManager } from './module/FormManagers/FormManager.js';
import { FormEdit } from './module/FormManagers/FormEditManager.js';


/**
 * Создаёт новый экземпляр Status, который управляет данными статусов задач.
 * @constant {Status} status - Экземпляр класса Status, содержащий данные статусов.
 */
const status = new Status();
const eventBus = new EventEmitter(); // Общий экз-р эммитера
const storage = new Storage(eventBus);
const formatter = new Formatter(status, products);

const managerTask = new Task(eventBus, storage, formatter, status);
const manager = new TaskManager(eventBus, storage, formatter);

const formManager = new FormManager({formatter});
const editFormManager = new FormEdit(formatter, eventBus);

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




