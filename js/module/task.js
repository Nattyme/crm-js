import validate from '../utils/validate.js';
import { NAMES } from '../config.js';
import { status } from '../model.js';
import {eventBus} from './EventBus.js';

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
  constructor ( {full_name, phone, email, product}) {
   
    this.timestamp = Date.now();
    this.full_name = this.setProperty( full_name, validate.name);
    this.product = this.setProperty( product, validate.product);
    // this.product = product,
    this.email = this.setProperty( email, validate.email);
    this.phone = this.setProperty( phone, validate.phone);
    this.status = status.data.NEW.key; // из класса Status
    this.changed = Date.now();

    console.log( this.product);
    // После созда-я задачи отправляем соб-е о статусе
    eventBus.emit(NAMES.TASK_CREATED, this); // Передаем созданную задачу
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
   console.log(result);
   
    if(!result.valid) {
      return null;
    } 
    
    return result.value;
  }

}

export { Task };
