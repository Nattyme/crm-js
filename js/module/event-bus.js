/**
 * Класс для управления событиями.
*
* @class EventBus
*/
class EventBus {
  constructor () {
    this.listeners = {} // объект хранит события и подписчиков
  }

  /**
   * Подписывается на событие.
   *
   * @method on
   * @memberof EventBus
   * @param {string} event - Название события.
   * @param {Function} callback - Функция-обработчик.
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
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
    if ( !this.listeners[event]) return;

    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
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
    if ( !this.listeners[event]) return;
    this.listeners[event].forEach(callback => callback(data));
  }
}

export { EventBus }