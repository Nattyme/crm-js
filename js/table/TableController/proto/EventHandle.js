import { NAMES } from '../../../config.js';

class EventHandle {
  constructor (eventBus, status, tableActions, manager) {
    this.eventBus = eventBus;
    this.status = status;
    this.tableActions = tableActions;
    this.taskManager = manager;
  }

  /**
   * Устанавливает слушателей для событий.
  */
  setEventListeners () {
    // Добав. слушателя для события измен-я статуса
    this.eventBus.on(NAMES.STATUS_CHANGED, this.handleStatusChange.bind(this));
  }

  /**
   * Обработчик изменения статуса задачи.
   * @param {string} statusName - Название статуса.
   * @param {Object} newStatusData - Данные нового статуса.
  */
  handleStatusChange(statusName, newStatusData) {
    this.taskManager.updateTaskStatus(); //  устанав. новый статус
    this.status.setStatus(statusName, newStatusData); // Обновляем статус
    this.tableActions.renderRefresh();  // Перерисовать страницу
  }
  
}

export { EventHandle };