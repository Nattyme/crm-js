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
  }

  initTask() {
    const dataTaskAll = this.storage.getAllTasksData(); // получим данные всех задач
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
  updateSingleTaskData(taskUpdated) {
  
    const updatedTask = taskUpdated;
    if (!updatedTask || !updatedTask.id) {
      console.log("Нельзя обновить задачу", updatedTask);
      return
    }

    const taskIndex = this.storage.getAllTasksData().findIndex(task => task.id === updatedTask.id);

    if (taskIndex !== -1) {
      this.storage.getAllTasksData()[taskIndex] = updatedTask; // Обновление статуса задачи в массиве
      this.eventBus.emit(NAMES.TASKS_SAVE, updatedTask); // Сохраненеи измен-ий
    } else {
      console.log("Задача с указанным id не найдена:", updatedTask.id);
    }
    return updatedTask;

  }

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
  setTestData(testData) {
    this.testData = testData;
    return testData;
  }
  setTimeStamp() {
    return Date.now();
  }
  setStatus() {
    return this.status.data.NEW.key; 
  }
}

export { Task };
