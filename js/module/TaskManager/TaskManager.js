import { NAMES } from './../../config.js';
import {TaskManagerActions} from './TaskManagerActions.js';
// Прототипы
import {Storage} from  '../Storage.js';

/**
 * Класс для управления задачами.
 * Позволяет добавлять, удалять, сохранять и загружать задачи.
 * 
 * @class TaskManager
 * @see {@link ./validate.js|Модуль валидации}
 * @see {@link ./model.js|Модуль }
 * @see {@link EventBus|EventBus - Объект для управления событиями}
 */
class TaskManager {
  /**
   * Конструктор класса TaskManager.
   * Подключает обработку событий и загружает задачи из хранилища.
   *
   * @param {EventBus} eventBus - Экземпляр EventBus для управления событиями.
   */
  constructor (eventBus) {
    this.data = [];
    this.eventBus = eventBus; // общий EventBus
    this.subscribeToEvents();

    // Прототипы
    // STORAGE
    this.storage = new Storage(); // экз-р хранилища
    this.loadFromStorage =  this.storage.loadFromStorage.bind(this);
    this.saveToStorage =  this.storage.saveToStorage.bind(this);
    this.clearStorage =  this.storage.clearStorage.bind(this);

    // ACTIONS
    this.dataAction = new TaskManagerActions();
    this.addNewData = this.dataAction.addNewData.bind(this);
    this.removeData = this.dataAction.removeData.bind(this);
    this.getAll = this.dataAction.getAll.bind(this);
    this.getTaskData = this.dataAction.getTaskData.bind(this);
    this.formatDateTime = this.dataAction.formatDateTime.bind(this);
    this.prepareDisplay = this.dataAction.prepareDisplay.bind(this);

    // Подписка на события
    // this.subscribeToEvents();
    this.eventBus.on(NAMES.TASKS_LOAD, this.loadFromStorage.bind(this));
    this.eventBus.on(NAMES.TASKS_SAVE, this.saveToStorage.bind(this));
    this.eventBus.on(NAMES.TASKS_CLEAR, this.clearStorage.bind(this));

    // Получим данные из localStorage
    this.loadFromStorage();
  }

  subscribeToEvents () {
    // Подписка на одно событие для обр-ки остальных 
    this.eventBus.on(NAMES.TASK_ACTION, (actionType) => {
      switch (actionType) {
        case NAMES.TASKS_LOAD :
          this.loadFromStorage();
          break;
        case NAMES.TASKS_SAVE:
          this.saveToStorage();
          break;
        case NAMES.TASKS_CLEAR :
          this.clearStorage();
          break;
        default :
            console.log('Действие не гайдено в subscribeEvents');
        
      }
    });
    // this.eventBus.on(NAMES.TASKS_LOAD, this.loadFromStorage.bind(this));
    // this.eventBus.on(NAMES.TASKS_SAVE, this.saveToStorage.bind(this));
    // this.eventBus.on(NAMES.TASKS_CLEAR, this.clearStorage.bind(this));
  }

  updateTaskInData(taskUpdated) {
  
    
    const updatedTask = taskUpdated;
    if (!updatedTask || !updatedTask.id) {
      console.error("Обновляемая задача некорректна:", updatedTask);
      return
    }

    const taskIndex = this.data.findIndex(task => task.id === updatedTask.id);


    if (taskIndex !== -1) {
      this.data[taskIndex] = updatedTask; // Обновление статуса задачи в массиве
      this.eventBus.emit(NAMES.TASKS_SAVE, updatedTask); // Сохраненеи измен-ий
    } else {
      console.error("Задача с указанным id не найдена:", updatedTask.id);
    }
    return updatedTask;

  }

//   if (taskIndex !== -1) {
//     // Обнов-е задачи через иммутабельное обнов-е массива - чтобы убрать ошибку потери id
//     this.data = this.data.map(task =>
//       task.id === updatedTask.id ? { ...task, ...updatedTask } : task
//     );
   
//     this.eventBus.emit(NAMES.TASKS_SAVE); // Сохраненеи измен-ий
//   } else {
//     console.error("Задача с указанным id не найдена:", updatedTask.id);
//   }


  /**
   * Рассчитывает ID для новой задачи.
   *
   * @method calcID
   * @memberof TaskManager
   * @param {Array} data - Массив всех задач.
   * @returns {number} Новый ID.
   */
  calcID (data) {
    let id;
    
    if ( data.length !== 0 ) {
      id = data.reduce( (max, task) => Math.max(max, task.id), 0) + 1;
    } else {
      id = 1;
    }

    return id;
  }

}

export { TaskManager, TaskManagerActions };