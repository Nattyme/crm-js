/**
 * Класс для управления событиями.
*
* @class EventBus
*/
class EventEmitter {
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

/**
 * Создаёт новый экземпляр EventBus, который будет использоваться для управления событиями.
 * @constant {EventBus} eventBus - Экземпляр класса EventBus для обработки событий.
*/

const eventBus = new EventEmitter(); // Общий экз-р эммитера

export { eventBus }