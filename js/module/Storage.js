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


  /*  Одна задача*/
  loadTaskFromStorage(taskID) {
    // Все задачи
    const tasksAll = JSON.parse(localStorage.getItem('task')) || [];

    // Задача по ID
    const task = tasksAll.find( item => item.id === taskID);

    if (task) {
      console.log('Успех. Задача загружена из local storage');
      this.eventBus.emit(NAMES.TASK_LOAD, task); // Отправка задачи после загрузки 
    } else {
      console.log('Ошибка. Задача не найдена в local storage');
    }
  }

  saveTaskToStorage(taskData) {
    // Получаем все задачи
    const tasksAll = JSON.parse(localStorage.getItem(NAMES.TASKS_DATA)) || [];


    // Индекс задачи
    const taskIndex = tasksAll.findIndex(task => task.id === taskData.id);

    if ( taskIndex !== - 1) {
      // Если задача существует - обновляем ее
      tasksAll[taskIndex] = taskData;
    } else {
      console.log('Ошибка. Такой задачи нет');
    }

    console.log('Успех. Задача сохранена');
    localStorage.setItem(NAMES.TASKS_DATA, JSON.stringify(taskData));
  }

}

export { Storage };
