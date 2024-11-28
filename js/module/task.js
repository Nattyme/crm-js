import { validate } from '../validate.js';

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
    // this.status = this.setStatus();
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

  setStatus(name ) {
    console.log(this.status);
    
    return name;
  }

}

export { Task };
