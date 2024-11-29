import { CellFactory } from './cell.js';
import { HTMLFactory } from './html.js';

/**
 * Класс для создания строк таблицы из данных задачи.
 */
class RowFactory {

  /**
 * Создаёт строку таблицы на основе данных задачи.
 * @param {Object} task - Объект задачи с информацией о задаче.
 * @param {Object} [options] - Опциональные параметры для настройки строки.
 * @param {string} [options.className] - Класс строки таблицы.
 * @returns {HTMLElement} Строка таблицы (`<tr>`) с заполненными данными задачи.
 */
  getTableRow(task, options) {
    const data = CellFactory.getData( task, options ); // получим настройки ячеек таблицы
    const row = HTMLFactory().getHTML( task );
    console.log(row);
    
    // Вернём ряд
    return row;
  }
}

export { RowFactory }