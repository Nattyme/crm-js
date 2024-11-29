import { tableDataFormatter } from './table-formatter.js';

/**
 * Класс для создания строк таблицы из данных задачи.
 */
class TableRowFactory {

  /**
 * Генерирует массив настроек для ячеек таблицы.
 * @param {Object} task - Объект задачи с данными.
 * @param {number} task.id - Уникальный идентификатор задачи.
 * @param {string} task.date - Дата задачи.
 * @param {string} task.product - Название продукта.
 * @param {string} task.full_name - Имя клиента.
 * @param {string} task.email - Электронная почта клиента.
 * @param {string} task.phone - Номер телефона клиента.
 * @param {Object} options - Опции для статуса задачи.
 * @param {string} options.class - CSS-класс для статуса.
 * @param {string} options.text - Текст статуса.
 * @returns {Array<Object>} Массив настроек ячеек таблицы, каждая из которых содержит тип (`type`) и содержимое (`content`).
 */
  getCellsConfig(task, options) {
    
    // Настройки для ячеек таблицы
    const cellsConfig = [
      {
        type : 'td',
        content : String(task.id)
      },
      {
        type : 'td',
        content : task.date
      },
      {
        type : 'td',
        content : task.product
      },
      {
        type : 'td',
        content : this.createAbsLink( tableDataFormatter.fieldGetReady().name(task.full_name), `edit.html?id=${task.id}`)
      },
      {
        type : 'td',
        content : task.email
      },
      {
        type : 'td',
        content : tableDataFormatter.fieldGetReady().phone(task.phone)
      },
      {
        type : 'td',
        content : this.createBageWithStatus(options)
      },
      {
        type : 'td',
        content : this.createButton('Редактировать')
      },
    ];

    return cellsConfig;
  }

  /**
 * Создаёт строку таблицы на основе данных задачи.
 * @param {Object} task - Объект задачи с информацией о задаче.
 * @param {Object} [options] - Опциональные параметры для настройки строки.
 * @param {string} [options.className] - Класс строки таблицы.
 * @returns {HTMLElement} Строка таблицы (`<tr>`) с заполненными данными задачи.
 */
  createTableRow(task, options) {
    const cellsConfig = this.getCellsConfig(task, {class: 'badge-danger', text: 'Новая'}); // получим настройки ячеек таблицы
    const row = this.createElem('tr');

    row.className = options.className || 'task-table__row task-table__row--link';
    row.setAttribute("scope", `${task.id}`);
    row.setAttribute("data-status", `${task.status}`);
    
    
    cellsConfig.forEach( config => {
      let cell = this.createElem(config.type);

      if ( typeof config.content === 'string') {
        cell.textContent = config.content;
      } 
      else if ( config.content instanceof HTMLElement) {
        cell.appendChild(config.content);
      }

      else {
        console.log('Получен неизвестный тип данных');  
      }

      // Добавляем ячейку в ряд
      row.appendChild(cell);
    });

    // Вернём ряд
    return row;
  }

 /**
 * Создаёт HTML-элемент заданного типа.
 * @param {string} type - Тип HTML-элемента (например, 'div', 'td', 'tr').
 * @returns {HTMLElement} Созданный HTML-элемент.
 */
  createElem (type) {
    return document.createElement(type);
  }

  /**
   * Создаёт ссылку с заданным контентом и URL.
   * @param {string} content - Текст ссылки.
   * @param {string} url - URL для ссылки.
   * @returns {HTMLElement} Созданный элемент ссылки (`<a>`).
   */
  createAbsLink(content, url) {
    const id = tableDataFormatter.fieldGetReady().urlID(url);
    const link = this.createElem('a');

    link.textContent = content;
    link.href = url;

    link.className = "link-abs";
    link.setAttribute("title", `Перейти к редактированию заявки №${id}`)

    return link;
  }

  /**
   * Создаёт кнопку в виде элемента `div`.
   * @param {string} content - Текст кнопки.
   * @param {Object} [option] - Дополнительные опции для кнопки.
   * @param {string} [option.className] - Класс для кнопки.
   * @returns {HTMLElement} Созданный элемент кнопки (`<div>`).
 */
  createButton (content, option = {}) {
    const buttonCell = this.createElem('div');
    buttonCell.className = option.className || 'button-edit';
    buttonCell.textContent = content;

    return buttonCell;
  }

  /**
 * Создаёт значок (badge) с заданным статусом.
 * @param {Object} status - Объект статуса с информацией о классе и тексте.
 * @param {string} status.class - Класс для стилизации значка.
 * @param {string} status.text - Текст для отображения в значке.
 * @returns {HTMLElement} Созданный элемент значка (`<div>`).
 */
  createBageWithStatus(status) {
    const badge = this.createElem('div');
 
    badge.className = `badge badge-pill ${status.class}`;
    badge.textContent = status.text;

    return badge;

  }

  /**
 * Возвращает данные статуса.
 * @param {Object} statusData - Объект с данными статуса.
 * @returns {Object} Данные статуса.
 */
  static getStatusData (statusData) { 
    return statusData;
  }

  // static getStatusData (status) { 
  //   const statusData = Object.values(NAMES.STATUS).find( item => item.text === status )
  //   return  statusData || NAMES.STATUS.NEW.text; // По умолчанию вернёт 'Новый'
  // }
}

export { TableRowFactory }