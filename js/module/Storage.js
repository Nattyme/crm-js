import { NAMES } from '../config.js';
class Storage {
  constructor(data, eventBus) {
    this.data = data;
    this.eventBus = eventBus;
  }
  /**
   * Загружает данные из localStorage.
   *
   * @method loadFromStorage
   * @memberof TaskManager
   */
  loadFromStorage() {
    const storedData = localStorage.getItem(NAMES.TASKS_DATA);
    this.data = storedData ? JSON.parse(storedData) : [];
    console.log('Задачи получены из localStorage');
  }

  /**
 * Сохраняет данные в localStorage.
 *
 * @method saveToStorage
 * @memberof TaskManager
 */
  saveToStorage() {
    console.log('Перед сохранением в localStorage:', this.data);
    localStorage.setItem(NAMES.TASKS_DATA, JSON.stringify(this.data));
    console.log('Данные сохранены (обновлены) в local storage', this.data);
  }

  /**
   * Очищает данные из localStorage и обновляет данные в памяти.
   *
   * @method clearStorage
   * @memberof TaskManager
   */
  clearStorage() {
    localStorage.removeItem(NAMES.TASKS_DATA);
    this.data = [];
    this.eventBus.emit(NAMES.TASKS_SAVE, this.data); // Уведом-е об изменениях
    console.log('Данные удалены из local storage. Массив data пуст');
  }
}

export { Storage };
