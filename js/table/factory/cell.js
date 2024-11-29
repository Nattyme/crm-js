/**
 * Фабрика для генерации настроек ячеек таблицы.
*/
class CellFactory {
  /**
   * Генерирует данные для настройки ячеек таблицы на основе информации о задаче.
   * @param {Object} task - Объект задачи с данными для строки таблицы.
   * @param {number} task.id - Уникальный идентификатор задачи.
   * @param {string} task.date - Дата задачи.
   * @param {string} task.product - Название продукта.
   * @param {string} task.full_name - Полное имя клиента.
   * @param {string} task.email - Электронная почта клиента.
   * @param {string} task.phone - Телефон клиента.
   * @param {Object} options - Опции для статуса задачи.
   * @param {string} options.class - CSS-класс для статуса задачи.
   * @param {string} options.text - Текст статуса задачи.
   * @returns {Object} Настройки ячеек таблицы, где каждое свойство соответствует типу ячейки.
  */
  static getData(task, options) {
    return {
          id:         () => { return  { text : String(task.id) } },
          data:       () => { return  { text : task.date } },
          product:    () => { return  { text : task.product } },
          data:       () => { return  { text : task.date } },
          full_name:  () => { return { text : task.full_name } },
          // full_name:  () => { return this.createAbsLink( tableDataFormatter.fieldGetReady().name(task.full_name), `edit.html?id=${task.id}`) },
          email:      () => { return  { text : task.email } },
          phone:      () => { return  { text : task.phone } },
          // phone:      () => { return  tableDataFormatter.fieldGetReady().phone(task.phone) },
          badge:      () => { return  options = {class: 'badge-danger', text: 'Новая'} },
          button:     () => { return  { text : 'Редактировать'} },
    }
  }
 
}

export { CellFactory };