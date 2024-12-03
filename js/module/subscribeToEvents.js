import {NAMES} from './../config.js';
import {eventBus} from './EventBus.js';
import {Storage} from './Storage.js';
import {TaskManager} from './TaskManager/TaskManager.js';
import {TaskRender} from './../form/TaskRender.js';

// Создаем экз. классов , с кот. работаем. Передаем им evBus для подписки на события 
const storage = new Storage([], eventBus);
const taskManager = new TaskManager(eventBus);
const taskRender = new TaskRender(eventBus); // создадим рендера задачи


// Ф-ция подписывает на события
const subscribeToEvents = function () {
  // Слушаем submit, запускаем ф-цию добавления задачи
  taskRender.getForm().addEventListener('submit', (e) => this.setTask(e));



  // Работа с local storage - одна задача
  eventBus.on(NAMES.TASK_LOAD, (taskID) => {
    console.log('Событие load для одной задачи ');
    storage.loadTaskFromStorage(taskID);
  } );
  eventBus.on(NAMES.TASKS_SAVE, (taskData) => {
    console.log('Событие save одной задачи');
    storage.saveTaskToStorage(taskData);
  });


  // Работа с local storage - несколько задач
  eventBus.on(NAMES.TASKS_LOAD, () => {
    console.log('Событие load вызвано ');
    storage.loadFromStorage();
  } );
  eventBus.on(NAMES.TASKS_SAVE, () => {
    console.log('Событие  save вызвано');
    storage.saveToStorage();
  });

  eventBus.on(NAMES.TASKS_CLEAR, () => {
    console.log('Событие clear вызвано');
    storage.clearStorage();
  });

  // Подписка для менеджера задач
  eventBus.on(NAMES.ADD_TASK, () => {
    console.log('Событие addTask by Task Manger');
    
    taskManager.addTask();
  });
}

subscribeToEvents();

export { subscribeToEvents }

// this.eventBus.on(NAMES.TASK_ACTION, (actionType) => {
//   switch (actionType) {
//     case NAMES.TASKS_LOAD :
//       this.loadFromStorage();
//       break;
//     case NAMES.TASKS_SAVE:
//       this.saveToStorage();
//       break;
//     case NAMES.TASKS_CLEAR :
//       this.clearStorage();
//       break;
//     default :
//         console.log('Действие не гайдено в subscribeEvents');
    
//   }
// });