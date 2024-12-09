import { NAMES } from './../config/config.js';

class Storage {
  /**
   * Создаёт экземпляр класса Storage.
   * Инициализирует пустой массив для хранения данных и подписывается на события.
   * 
   * @constructor
   * @param {Object} eventBus - Объект шины событий для подписки на события загрузки и сохранения задач.
  */
  constructor(eventBus) {
    this.data = []; // ??
    this.eventBus = eventBus;

    // Подписка на события
    this.eventBus.on(NAMES.TASKS_LOAD, this.loadFromStorage.bind(this));
    this.eventBus.on(NAMES.TASKS_SAVE, this.saveToStorage.bind(this));

    // Получим данные из localStorage
    this.loadFromStorage();
  }

  // Работа с задачами
  /**
   * Возвращает все задачи из хранилища.
   *
   * @method getAllTasksData
   * @memberof Storage
   * @returns {Array} Массив всех задач.
  */
  getAllTasksData() {
    return this.data;
  }

  /**
   * Находит задачу по её ID.
   *
   * @method findTaskById
   * @memberof Storage
   * @param {number} id - ID задачи.
   * @returns {Object} Данные задачи с указанным ID.
  */
  findTaskById(id){
    const taskData =  this.data.find(task => task.id === Number(id) );
    if (!taskData) return console.log('Запись не найдена');   // Если ID не найден
    return taskData;
  }

  /**
   * Добавляет новую задачу в хранилище.
   *
   * @method addTaskToStorage
   * @memberof Storage
   * @param {Object} task - Задача, которую нужно добавить.
   * @returns {number} Новый размер массива задач.
  */
  addTaskToStorage(task){
    return this.data.push(task); 
  }


  // Подсчёты
  /**
   * Рассчитывает ID для новой задачи.
   * ID определяется как максимальный существующий ID + 1.
   *
   * @method calcTaskId
   * @memberof Storage
   * @returns {number} Новый ID для задачи.
  */
  calcTaskId () {
    return this.data.length !== 0 ? this.data.reduce( (max, task) => Math.max(max, task.id), 0) + 1 : 1;
  }

   /**
   * Рассчитывает количество задач с определённым статусом.
   *
   * @method calcTasksByStatus
   * @memberof Storage
   * @param {string} statusType - Статус задач, которые нужно посчитать.
   * @returns {number} Количество задач с указанным статусом.
  */
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
