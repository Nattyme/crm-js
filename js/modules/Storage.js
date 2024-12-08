import { NAMES } from './../config/config.js';

class Storage {
  constructor(eventBus) {
    this.data = []; // ??
    this.eventBus = eventBus;

    // Подписка на события
    this.eventBus.on(NAMES.TASKS_LOAD, this.loadFromStorage.bind(this));
    this.eventBus.on(NAMES.TASKS_SAVE, this.saveToStorage.bind(this));
    // this.eventBus.on(NAMES.TASKS_CLEAR, this.clearStorage());

    // Получим данные из localStorage
    this.loadFromStorage();
  }

  // Работа с задачами
  /**
   * Возвращает все задачи.
   *
   * @method getTaskAllData
   * @memberof TaskManager
   * @returns {Array} Массив всех задач.
   */
  getAllTasksData() {
    return this.data;
  }

  findTaskById(id){
    const taskData =  this.data.find(task => task.id === Number(id) );
    if (!taskData) return console.log('Запись не найдена');   // Если ID не найден
    return taskData;
  }

  addTaskToStorage(task){
    return this.data.push(task); 
  }


  // Подсчёты
  /**
 * Рассчитывает ID для новой задачи.
 *
 * @method calcID
 * @memberof TaskManager
 * @param {Array} data - Массив всех задач.
 * @returns {number} Новый ID.
 */
  calcTaskId () {
    return this.data.length !== 0 ? this.data.reduce( (max, task) => Math.max(max, task.id), 0) + 1 : 1;
  }

  calcTasksByStatus(statusType) {
    return this.data.reduce((accumulator, currentValue) => {
      return currentValue.status === statusType ? accumulator + 1 : accumulator;
    }, 0);
  }


  // Работа с Local Storage
  /**
   * Загружает данные из localStorage.
   *
   * @method loadFromStorage
   * @memberof TaskManager
   */
  loadFromStorage() {
    const storedData = localStorage.getItem(NAMES.TASKS_DATA);
    this.data = storedData ? JSON.parse(storedData) : [];
    console.log('Задачи получены из localStorage');
  }

  /**
 * Сохраняет данные в localStorage.
 *
 * @method saveToStorage
 * @memberof TaskManager
 */
  saveToStorage() {
    console.log('Перед сохранением в localStorage:', this.data);
    localStorage.setItem(NAMES.TASKS_DATA, JSON.stringify(this.data));
    console.log('Данные сохранены (обновлены) в local storage', this.data);
  }
}

export { Storage };
