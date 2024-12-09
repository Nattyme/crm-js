import {products} from './data/data.js';
import { Status } from './modules/Status.js';
import { emitter } from './modules/EventEmitter.js';
import { Storage } from './modules/Storage.js';
import { Task } from './modules/Task.js';
import { FormManager } from './modules/FormManager.js';
import { FormEdit } from './modules/FormEditManager.js';
import { Filter } from './modules/Filter.js';
import { Formatter } from "./utils/Formatter.js";


/**
 * Создаёт новый экземпляр Status, который управляет данными статусов задач.
 * @constant {Status} status - Экземпляр класса Status, содержащий данные статусов.
 */
const status = new Status();
const eventBus = emitter;
const storage = new Storage(eventBus);
const formatter = new Formatter(status, products);
const filter = new Filter();

const managerTask = new Task(eventBus, storage, formatter, status);
const formManager = new FormManager({formatter});
const editFormManager = new FormEdit(eventBus, managerTask, formatter);

export { 
  managerTask, 
  formManager, 
  editFormManager, 
  status, 
  eventBus, 
  storage, 
  filter,
  formatter, 
  products
}




