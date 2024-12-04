import { Task } from './module/TaskManagers/Task.js';
import { TaskManager } from './module/TaskManagers/TaskManager.js';
import { TaskEditManager } from './module/TaskManagers/TaskEditManager.js';
import { EventEmitter } from './module/Event/EventEmitter.js';
import { Status } from './module/Status.js';
import { Storage } from './module/Storage.js';
import { Formatter } from "./utils/formatter.js";
import { FormManager } from './module/FormManagers/FormManager.js';
import { FormEdit } from './module/FormManagers/FormEditManager.js';


/**
 * Создаёт новый экземпляр Status, который управляет данными статусов задач.
 * @constant {Status} status - Экземпляр класса Status, содержащий данные статусов.
 */
const status = new Status();
const storage = new Storage();
const eventBus = new EventEmitter(); // Общий экз-р эммитера
const formatter = new Formatter();

const manager = new TaskManager(eventBus);

const formManager = new FormManager({formatter});
const editFormManager = new FormEdit(formatter);

export { manager, TaskEditManager, Task, formManager, editFormManager, status, eventBus, storage, formatter}




