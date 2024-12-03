import CellFactory from './Cell.js';
import HTMLFactory  from './Html.js';

/**
 * Класс для создания строк таблицы из данных задачи.
*/
class RowFactory {
  constructor () {
    this.renderCells = new CellFactory();
    this.render = new HTMLFactory();
  }

  /**
   * Создаёт строку таблицы на основе данных задачи.
   * @param {Object} taskData - Объект задачи с информацией о задаче.
   * @param {string} taskData.id - Уникальный идентификатор задачи.
   * @param {string} taskData.date - Дата задачи.
   * @param {string} taskData.product - Название продукта.
   * @param {string} taskData.full_name - Полное имя клиента.
   * @param {string} taskData.email - Электронная почта клиента.
   * @param {string} taskData.phone - Телефон клиента.
   * @param {Object} taskData.status - Статус задачи.
   * @param {string} taskData.status.class - CSS класс для статуса.
   * @param {string} taskData.status.text - Текст статуса.
   * @returns {HTMLElement} Строка таблицы (`<tr>`) с заполненными данными задачи.
  */
  getTableRow(taskData) {
    const cellsHTML = this.createCells(taskData); 
    
    return this.render.getHTML('row', taskData, cellsHTML); // пустая строка, без ячеек
  }

  /**
   * Создаёт HTML-строки для ячеек таблицы на основе данных задачи.
   * @param {Object} taskData - Данные задачи для генерации ячеек.
   * @returns {string} Строка HTML с ячейками таблицы.
  */
  createCells(taskData) {

    // Массив настроек для ячеек
    const cellsConfig = [
      this.render.getHTML('cell', taskData.id),
      this.render.getHTML('cell', taskData.date),
      this.render.getHTML('cell', taskData.product),
      this.render.getHTML('cell', this.render.getHTML('linkAbs', taskData.id, taskData.full_name) ),
      this.render.getHTML('cell', taskData.email),
      this.render.getHTML('cell', taskData.phone),
      this.render.getHTML('cell', this.render.getHTML('badge', taskData.status) ) ,
      this.render.getHTML('cell', this.render.getHTML('button', 'Редактировать', 'edit.html') )
    ];

    return cellsConfig.join(''); // Уберем ',' и превартим в строку
  }
}

export default RowFactory;