import { validate } from './validate.js';
import { TaskManager } from './module/task-manager.js';
import { Task } from './module/task.js';
import { EventBus } from './module/event-bus.js';
import { Status } from './module/status.js';
import { Table } from './module/table.js';

// Единый экз-р EventBus
const eventBus = new EventBus();
const status = new Status();

/**
 * Функция для форматирования временной метки.
 * 
 * @function dateFormatter
 * @memberof module:TaskManagerModule
 * @param {number} timestamp - Временная метка.
 * @param {Intl.DateTimeFormat} formatter - Форматтер для даты.
 * @returns {string} Отформатированная дата.
 */
const dateFormatter = function (timestamp, formatter) {
  const date = formatter.format( new Date(timestamp) );

  return date;
}


/**
 * Экспорт классов и функций модуля.
 * 
 * @module TaskManagerModule
 * @exports {TaskManager} - Класс для работы с задачами.
 * @exports {Task} - Класс для создания задач.
 * @exports {EventBus} - Класс для управления событиями.
 * @exports {dateFormatter} - Функция для форматирования временных меток.
  */
export { TaskManager, Task, EventBus, status, Table, dateFormatter, eventBus}




