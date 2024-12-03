  import {NAMES} from './../../config.js';


  class EventListenerManager {
    constructor(eventBus) {
      this.eventBus = eventBus;
      this.listeners = [];
      // this.data = [];
    }

    init(manager, taskManagerActions, storage) {
      this.manager = manager;
      this.taskManagerActions = taskManagerActions;
      this.storage = storage;
      this.data = this.manager.data;
    }

    // Метод для эмиссии событий
    emitEvent(eventName, record='') {
      console.log(`Эмитируем событие: ${eventName}`);
      console.log(this.eventBus); // Проверить, что eventBus существует
console.log(this.eventBus.emit); // Проверить, что метод emit существует

      this.eventBus.emit(eventName, record);
    }

    // Добавление слушателя
    addListener (eventName, callback) {
      if (typeof callback !== 'function') {
        throw (`callback для события ${eventName} не является ф-цией`);
      }
      this.eventBus.on(eventName, callback);
      this.listeners.push( {eventName, callback} );
    }

    subscribeToEvents () {
      if (!this.manager || !this.taskManagerActions || !this.storage) {
        throw new Error('Необходимо вызвать init() перед подпиской на события.');
      }
      // Подсписка на доб-е задачи
      // this.addListener(NAMES.ADD_TASK, () => {
      //   console.log('Событие addTask от taskManagerActions');
      //   this.taskManagerActions.addNewData();
      // });
  console.log('Подписка на событие LOAD');
  if (this.manager && this.taskManagerActions && this.storage) {
    this.addListener(NAMES.TASKS_LOAD, () => {
      this.storage.loadFromStorage();
      console.log('Задача TASL_LOAD данные из LocalStoragw загружен');
      
    });
    this.addListener(NAMES.TASKS_SAVE, () => {
      this.storage.saveToStorage();
      console.log('Задача saveToStorage данные из LocalStoragw сохранены');
    });
  } else {
    console.error("Ошибка: init() не был вызван или переданы неправильные зависимости");
  }
  

      // this.addListener(NAMES.TASKS_LOAD, () => {
      //   this.storage.loadFromStorage();
      // });

      // console.log('Подписка на событие SAVE');

      // this.addListener(NAMES.TASKS_SAVE, () => {
      //   this.storage.saveToStorage();

      //   // this.taskManagerActions.addNewData();
      //   console.log('Подписка taskManagerActions на событие SAVE');
      // });


          // this.eventBus.on(NAMES.TASKS_SAVE);
      // this.eventBus.emit(NAMES.TASKS_SAVE, record); 
    }

  


    // Удаление одного 
    // removeListener(eventName) {
    //   const listener = this.listeners.find(listener => listener.eventNAme === eventName);

    //   if (listener) {
    //     this.eventBus.off(eventName, listener.callback);
    //     this.listeners = this.listeners.filter(listener => listener.eventName !== eventName);
    //   }
    // }

    // Удаление всех
    // removeAllListeners() {
    //   this.listeners.forEach( ({eventName, callback}) => {
    //     this.eventBus.off(eventName, callback);
    //   });
    //   this.listeners = [];
    // }
  }



  export { EventListenerManager }
