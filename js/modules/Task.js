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
   *
   * @constructor
   * @param {Object} eventBus - Объект для подписки на события.
   * @param {Object} storage - Объект для работы с хранилищем задач.
   * @param {Object} formatter - Объект для форматирования данных задачи.
   * @param {Object} status - Статусы задач, используемые в системе.
  */
  constructor (eventBus, storage, formatter, status) {
    this.eventBus = eventBus;
    this.storage = storage
    
    this.testData = {};
    this.status = status;
    this.formatter = formatter;
  }

  /**
   * Инициализирует задачу, получая все данные из хранилища.
   *
   * @method initTask
   * @memberof Task
  */
  initTask() {
    const dataTaskAll = this.storage.getAllTasksData(); // получим данные всех задач
    this.setTestData(dataTaskAll); 
  }


  /**
   * Создаёт новую задачу с валидацией данных.
   * Проверяет поля задачи и устанавливает метки времени и статус.
   *
   * @method createNewTask
   * @memberof Task
   * @param {Object} task - Данные задачи.
   * @returns {Object|null} Возвращает задачу, если все поля валидны, или null, если ошибка валидации.
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

  /**
   * Обновляет данные задачи.
   * Проверяет существование задачи по ID, обновляет её и сохраняет изменения.
   *
   * @method updateSingleTaskData
   * @memberof Task
   * @param {Object} taskUpdated - Обновлённая задача.
   * @returns {Object|null} Возвращает обновлённую задачу или null, если задача не найдена.
  */
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
   * Валидирует значение с использованием соответствующей функции валидации.
   *
   * @method setProperty
   * @memberof Task
   * @param {string} value - Значение для валидации.
   * @param {Function} validate - Функция для валидации.
   * @returns {string|null} Возвращает отвалидированное значение или null, если ошибка.
  */
  setProperty ( value, validate) {
    const result = validate(value);
   
    if(!result.valid) {
      return null;
    } 
    
    return result.value;
  }

  /**
   * Устанавливает данные задач.
   *
   * @method setTestData
   * @memberof Task
   * @param {Array} testData - Массив всех задач.
   * @returns {Array} Возвращает массив задач.
  */
  setTestData(testData) {
    this.testData = testData;
    return testData;
  }

  /**
   * Устанавливает временную метку для задачи.
   *
   * @method setTimeStamp
   * @memberof Task
   * @returns {number} Возвращает текущую временную метку (в миллисекундах).
  */
  setTimeStamp() {
    return Date.now();
  }

  /**
   * Устанавливает статус задачи.
   *
   * @method setStatus
   * @memberof Task
   * @returns {string} Возвращает статус задачи (по умолчанию "NEW").
  */
  setStatus() {
    return this.status.data.NEW.key; 
  }
}

export { Task };
