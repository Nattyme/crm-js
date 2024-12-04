import { Task } from './module/TaskManagers/Task.js';
import { TaskManager } from './module/TaskManagers/TaskManager.js';
import { TaskEditManager } from './module/TaskManagers/TaskEditManager.js';
import { EventEmitter } from './module/Event/EventEmitter.js';
import { Status } from './module/Status.js';
import { Storage } from './module/Storage.js';
import {Formatter} from "./utils/formatter.js";
import { FormEdit } from './module/form/FormEdit.js';
import {Form} from './module/form/Form.js';


/**
 * Создаёт новый экземпляр Status, который управляет данными статусов задач.
 * @constant {Status} status - Экземпляр класса Status, содержащий данные статусов.
 */
const status = new Status();
const storage = new Storage();
const eventBus = new EventEmitter(); // Общий экз-р эммитера
const formatter = new Formatter();

export { TaskManager, TaskEditManager, Task, Form, FormEdit, status, eventBus, storage, formatter}




