import {NAMES} from './../../config/config.js';

/**
 * Класс для управления событиями.
*
* @class EventBus
*/
class EventEmitter {
  // [event]: [callback, callback]
  constructor () {
    this.listeners = {}; // объект хранит события и подписчиков
  }

  getCallbacksFor(event) {
    return this.listeners[event] || []; // Возвр-щаем событие со знач-ем или как пустой массив
  }

  setCallbacksFor(event, listeners) {
    if (listeners.length === 0) {
      delete this.listeners[event];
    } else {
      this.listeners[event] = listeners;
    }
  }

  /**
   * Подписывается на событие.
   *
   * @method on
   * @memberof EventBus
   * @param {string} event - Название события.
   * @param {Function} callback - Функция-обработчик.
   */
  on (event, callback) {
    const subs = this.getCallbacksFor(event); // Cписок слушателей event. Если св-ва нет - вернет []
    console.log(subs);
    subs.push(callback);        // Cохраняем колл бэк в массив 
    this.setCallbacksFor(event, subs);    // Cохрн. массив как св-во объекта

    // возврат ф-ци отписки от event. Можно сохрн. результат в перем. и вызвать при необ-ти
    return () => this.off(event, callback); 
  }

  /**
 * Отписывается от события.
 *
 * @method off
 * @memberof EventBus
 * @param {string} event - Название события.
 * @param {Function} callback - Функция-обработчик.
 */
  off (event, callback) {
    const subs = this.getCallbacksFor(event)
    .filter( (item) => item !== callback); // получаем список, отфильтруем полученный массив и вырежем коллбэк === callback
 
    this.setCallbacksFor(event, subs); // сохрн. новый список с отфильтр-ми элем. массива(без callback)
    return;
  }

  /**
   * Вызывает событие.
   *
   * @method emit
   * @memberof EventBus
   * @param {string} event - Название события.
   * @param {*} data - Данные, которые передаются обработчику.
   */
  emit ( event, data) {
    // Получаем список эвентов. Проходим по массиву и каждый callback вызываем с data из парам-ра
    this.getCallbacksFor(event)
    .forEach( (callback) => callback(data)); 
  }
}

/**
 * Создаёт новый экземпляр EventBus, который будет использоваться для управления событиями.
 * @constant {EventBus} eventBus - Экземпляр класса EventBus для обработки событий.
*/
export { EventEmitter }