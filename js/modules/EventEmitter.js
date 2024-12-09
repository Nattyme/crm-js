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


  /**
   * Получает список коллбеков (обработчиков) для события.
   *
   * @method getCallbacksFor
   * @memberof EventEmitter
   * @param {string} event - Название события.
   * @returns {Function[]} Массив обработчиков для события.
  */
  getCallbacksFor(event) {
    return this.listeners[event] || []; // Возвр-щаем событие со знач-ем или как пустой массив
  }

  /**
   * Устанавливает обработчики для события.
   *
   * @method setCallbacksFor
   * @memberof EventEmitter
   * @param {string} event - Название события.
   * @param {Function[]} listeners - Массив обработчиков событий.
  */
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
   * @memberof EventEmitter
   * @param {string} event - Название события.
   * @param {Function} callback - Функция-обработчик события.
   * @returns {Function} Функция для отписки от события.
  */
  on (event, callback) {
    const subs = this.getCallbacksFor(event); // Cписок слушателей event. Если св-ва нет - вернет []
    subs.push(callback);        // Cохраняем колл бэк в массив 
    this.setCallbacksFor(event, subs);    // Cохрн. массив как св-во объекта

    // возврат ф-ци отписки от event. Можно сохрн. результат в перем. и вызвать при необ-ти
    return () => this.off(event, callback); 
  }

  /**
   * Отписывается от события.
   *
   * @method off
   * @memberof EventEmitter
   * @param {string} event - Название события.
   * @param {Function} callback - Функция-обработчик, от которой нужно отписаться.
  */
  off (event, callback) {
    const subs = this.getCallbacksFor(event)
    .filter( (item) => item !== callback); // получаем список, отфильтруем полученный массив и вырежем коллбэк === callback
 
    this.setCallbacksFor(event, subs); // сохрн. новый список с отфильтр-ми элем. массива(без callback)
    return;
  }

  /**
   * Вызывает событие, передавая данные обработчикам.
   *
   * @method emit
   * @memberof EventEmitter
   * @param {string} event - Название события.
   * @param {*} data - Данные, передаваемые обработчикам события.
  */
  emit ( event, data) {
    // Получаем список эвентов. Проходим по массиву и каждый callback вызываем с data из парам-ра
    this.getCallbacksFor(event)
    .forEach( (callback) => callback(data)); 
  }
}

const emitter = new EventEmitter();

export { emitter }