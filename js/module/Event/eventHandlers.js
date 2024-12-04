import {NAMES} from './../../config/config.js';
import {eventBus} from './EventEmitter.js';
import {Storage} from './../Storage.js';
import {TaskManager} from './../TaskManagers/TaskManager.js';
import {TaskManagerActions} from './../TaskManagers/TaskManagerActions.js';
import {TaskRender} from './../../form/TaskRender.js';

const storage = new Storage();
const taskManagerActions = new TaskManagerActions();
const render = new TaskRender();

export const eventHandlers = {
  [NAMES.TASK_LOAD] : (taskID) => {
    console.log('Загружаем задачу');
    storage.loadTaskFromStorage(taskID);
  },

  [NAMES.TASKS_LOAD] : () => {
    console.log('Загружаем задачи');
    storage.loadFromStorage();
  },

  [NAMES.TASKS_SAVE] : (TASKS_DATA) => {
    console.log('Сохраняем ЗАДАЧИ');
    storage.saveToStorage(TASKS_DATA);
  }

  // [NAMES.ADD_TASK] : (taskID) => {
  //   console.log('Добавляем задачу');
  //   taskManagerActions.addNewData();
  // }
}