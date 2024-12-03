import { Task } from './module/TaskManagers/Task.js';
import { TaskManager } from './module/TaskManagers/TaskManager.js';
import { TaskEditManager } from './module/TaskManagers/TaskEditManager.js';
import { eventBus } from './module/EventEmitter.js';
import { Status } from './module/Status.js';
// import { Table } from './module/Table.js';
import { FormEdit } from './module/form/FormEdit.js';
import FormActions from './module/form/Form.js';
import { EventEmitter } from './module/Event/EventEmitter.js';
// import { subscribeToEvents } from './module/subscribeToEvents.js';


/**
 * Создаёт новый экземпляр Status, который управляет данными статусов задач.
 * @constant {Status} status - Экземпляр класса Status, содержащий данные статусов.
 */
const status = new Status();


export { TaskManager, TaskEditManager, Task, FormActions, FormEdit, status, eventBus, EventEmitter}




