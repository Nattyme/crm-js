import { TaskManager, TaskManagerActions } from './module/TaskManager/TaskManager.js';
import { Task } from './module/TaskManager/Task.js';
import { eventBus } from './module/EventBus.js';
import { Status } from './module/Status.js';
import { Table } from './module/Table.js';
import { FormEdit } from './module/form/FormEdit.js';
import FormActions from './module/form/Form.js';
import { subscribeToEvents } from './module/subscribeToEvents.js';


/**
 * Создаёт новый экземпляр Status, который управляет данными статусов задач.
 * @constant {Status} status - Экземпляр класса Status, содержащий данные статусов.
 */
const status = new Status();


/**
 * Экспорт классов и функций модуля.
 * 
 * @module TaskManagerModule
 * @exports {TaskManager} - Класс для управления задачами, их созданием, обновлением и хранением.
 * @exports {Task} - Класс для создания задач с валидацией данных и изменением статуса.
 * @exports {EventBus} - Класс для реализации паттерна "Publish/Subscribe", который позволяет компонентам системы обмениваться событиями.
 * @exports {status} - Экземпляр класса `Status`, управляющий данными для различных статусов задач.
 * @exports {Table} - Класс для работы с таблицей задач, включая рендеринг и добавление строк.
 * @exports {dateFormatter} - Утилита для форматирования и обработки дат.
 * @exports {eventBus} - Экземпляр `EventBus` для распространения событий в приложении.
*/
export { TaskManager, TaskManagerActions, Task, Table, FormActions, FormEdit, status, eventBus, subscribeToEvents}




