import { validate } from '../validate.js';
import { NAMES } from '../config.js';
import { eventBus, status } from '../model.js';

/**
 * Класс для создания задачи и её валидации.
 *
 * @class Task
 * @see {@link ./validate.js|Модуль валидации}
 */
class Task {
  constructor ( {full_name, phone, email, product}) {
    // this.id = id,
    this.timestamp = Date.now();
    this.full_name = this.setProperty( full_name, validate.name),
    this.product = product,
    this.email = this.setProperty( email, validate.email),
    this.phone = this.setProperty( phone, validate.phone)
    this.status = status.data.DONE.text; // из класса Status

    // После созда-я задачи отправляем соб-е о статусе
    eventBus.emit(NAMES.TASK_CREATED, this); // Передаем созданную задачу
  }

  // Метод изменяет статус
  // changeStatus( newStatus ) {
  //   this.status = newStatus;
  //   eventBus.emit(NAMES.STATUS_CHANGED, newStatus); // Отправка обнов-го статуса
  // }

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
}

export { Task };
