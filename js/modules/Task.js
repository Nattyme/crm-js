import { validate } from '../utils/validate.js';
import { NAMES } from '../config/config.js';

/**
 * Класс для создания задачи и её валидации.
 *
 * @class Task
 * @see {@link ./validate.js|Модуль валидации}
 */
class Task {
  /**
   * Создаёт новый объект задачи.
   * @param {Object} param - Параметры для создания задачи.
   * @param {string} param.full_name - Полное имя пользователя.
   * @param {string} param.phone - Номер телефона пользователя.
   * @param {string} param.email - Электронная почта пользователя.
   * @param {string} param.product - Продукт, связанный с задачей.
  */
  constructor (eventBus, storage, formatter, status) {
    this.eventBus = eventBus;
    this.storage = storage
    
    this.testData = {};
    this.status = status;
    this.formatter = formatter;

    eventBus.emit(NAMES.TASK_CREATED, this.testData); // Передаем созданную задачу
    console.log('emot из TASK, создана задача TASK CREATED', this.testData);
  }

  initTask() {
    const dataTaskAll = this.getData(); // получим данные всех задач
    console.log('Массив задач на старте ', this.getData());
    
    this.setTestData(dataTaskAll); 
  }

  /**
   * Добавляет новую задачу.
   *
   * @method addNewTask
   * @memberof TaskManager
   * @param {number} id - ID новой задачи.
   * @param {Object} record - Данные задачи.
   * @returns {Object|null} Добавленную задачу или null в случае ошибки.
   */
  createNewTask(task) {
    const checkFieldValues = ['full_name', 'phone', 'email']; // Поля для проверки
    const fieldsValid = validate.fieldsOfTaskObj(task, checkFieldValues);

    if(!fieldsValid) return null;

    task.timestamp = this.setTimeStamp();
    task.changed = this.setTimeStamp();
    task.status = this.setStatus();

    return task;
  }
  addTaskToStorage(newTask){
    newTask.phone = validate.phone(newTask.phone).value;
    return this.getData().push(newTask); // добавляем задачу в массив
  }
  updateSingleTaskData(taskUpdated) {
  
    const updatedTask = taskUpdated;
    if (!updatedTask || !updatedTask.id) {
      console.error("Нельзя обновить задачу", updatedTask);
      return
    }

    const taskIndex = this.getData().findIndex(task => task.id === updatedTask.id);

    if (taskIndex !== -1) {
      this.getData()[taskIndex] = updatedTask; // Обновление статуса задачи в массиве
      this.eventBus.emit(NAMES.TASKS_SAVE, updatedTask); // Сохраненеи измен-ий
    } else {
      console.error("Задача с указанным id не найдена:", updatedTask.id);
    }
    return updatedTask;

  }


  /**
 * Возвращает задачу по её ID.
 *
 * @method getData
 * @memberof TaskManager
 * @param {number} id - ID задачи.
 * @returns {Object|null} Возвращает задачу или null, если не найдено.
 */
  findOneTask(id, dateType) {
    let taskData = this.findTaskById(id, this.getData()); 
    if (!taskData) return console.log(`Запись не найдена в ${this.getData()}`);   // Если ID не найден
    
    return this.formatter.formatTaskDateTime(taskData, dateType); 
  }

  findTaskById(id){
    return this.getData().find(task => task.id === Number(id) );
  }



  getData() {
    return this.storage.getAllTasksData();
  }
  setData() {
    this.data = this.getData();
  }
  setTestData(testData) {
    this.testData = testData;
    return testData;
  }
  setTaskId () {
    return this.testData.id = this.calcId();
  }
  setTimeStamp() {
    return Date.now();
  }
  setStatus() {
    return this.status.data.NEW.key; 
  }
 

  /**
   * Рассчитывает ID для новой задачи.
   *
   * @method calcID
   * @memberof TaskManager
   * @param {Array} data - Массив всех задач.
   * @returns {number} Новый ID.
   */
  calcTaskId () {
    return this.getData().length !== 0 ? this.getData().reduce( (max, task) => Math.max(max, task.id), 0) + 1 : 1;
  }
 
  // this.phone = this.setProperty( phone, validate.phone);
  /**
   * Валидирует значение с использованием соответствующей функции.
   *
   * @method setProperty
   * @memberof Task
   * @param {string} value - Значение для валидации.
   * @param {Function} validate - Функция для валидации.
   * @returns {string|null} Отвалидированное значение или null, если ошибка.
   */
  setProperty ( value, validate) {
    const result = validate(value);
   
    if(!result.valid) {
      return null;
    } 
    
    return result.value;
  }

  /**
   * Удаляет задачу по ID.
   *
   * @method removeData
   * @memberof TaskManager
   * @param {number} recordID - ID задачи.
   * @returns {number} ID удалённой задачи.
   */
  // removeTask (recordID) {
  //   const recordIndex = this.data.findIndex(record => record.id === recordID);
  //   if (recordIndex !== -1) {
  //     this.data.splice(recordIndex, 1);
  //   }

  //   // Уведом-е об удалении 
  //   this.eventBus.emit(NAMES.TASK_REMOVED, recordID);

  //   return recordID;
  // }
}

export { Task };
