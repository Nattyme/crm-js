import { CellFactory } from './cell.js';
import { HTMLFactory } from './html.js';

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
 * @param {Object} task - Объект задачи с информацией о задаче.
 * @param {Object} [options] - Опциональные параметры для настройки строки.
 * @param {string} [options.className] - Класс строки таблицы.
 * @returns {HTMLElement} Строка таблицы (`<tr>`) с заполненными данными задачи.
 */
  getTableRow(taskData) {
    console.log(taskData);
    
    const cellsHTML = `
        ${this.render.getHTML('cell', taskData.id) }
        ${this.render.getHTML('cell', taskData.date) }
        ${this.render.getHTML('cell', taskData.product) }
        ${this.render.getHTML('cell', this.render.getHTML('linkAbs', taskData.id, taskData.full_name) ) }
        ${this.render.getHTML('cell', taskData.email) }
        ${this.render.getHTML('cell', taskData.phone) }
        ${this.render.getHTML('cell', this.render.getHTML('badge', taskData.status) ) }
        ${this.render.getHTML('cell', this.render.getHTML('button', 'Редактировать', 'edit.html') ) }
    `;
    const row =  this.render.getHTML('row', taskData, cellsHTML); // пустая строка, без ячеек
    // Вернём ряд
    return row;
  }
}

export { RowFactory }