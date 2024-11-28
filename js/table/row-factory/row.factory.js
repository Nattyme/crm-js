import { tableDataFormatter } from './table-formatter.js';

/**
 * Класс для создания строк таблицы из данных задачи.
 */
class TableRowFactory {
  /**
   * Создаёт строку таблицы на основе данных задачи.
   * @param {Object} task - Объект задачи с данными.
   * @param {Object} [options] - Дополнительные опции для настройки строки.
   * @returns {HTMLElement} Созданная строка таблицы (`<tr>`).
   */
  createTableRow(task, statuses, options) {
    const statusData = statuses;
    console.log(options);
    
    console.log(statusData);
    
    
    const cellsConfig = this.getCellsConfig(task, options); // получим настройки ячеек таблицы
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
        content : this.setStatus(options)
      },
      {
        type : 'td',
        content : this.createButton('Редактировать')
      },
    ];

    return cellsConfig;
  }

  createAbsLink(content, url) {
    const id = tableDataFormatter.fieldGetReady().urlID(url);
    const link = this.createElem('a');

    link.textContent = content;
    link.href = url;

    link.className = "link-abs";
    link.setAttribute("title", `Перейти к редактированию заявки №${id}`)

    return link;
  }

  createBadge (status) {
    const badge = this.createElem('div');
    badge.className = `badge badge-pill ${this.setStatus('new').class}`;
    badge.textContent = status;
    return badge;
  }

  createButton (content, option = {}) {
    const buttonCell = this.createElem('div');
    buttonCell.className = option.className || 'button-edit';
    buttonCell.textContent = content;

    return buttonCell;
  }

  /**
   * Создаёт HTML-элемент заданного типа.
   * @param {string} type - Тип HTML-элемента (например, 'div', 'td', 'tr').
   * @returns {HTMLElement} Созданный HTML-элемент.
   */
  createElem (type) {
    return document.createElement(type);
  }

  // static getStatusData (status) { 
  //   const statusData = Object.values(NAMES.STATUS).find( item => item.text === status )
  //   return  statusData || NAMES.STATUS.NEW.text; // По умолчанию вернёт 'Новый'
  // }
  static getStatusData (statusData) { 
    return statusData;
  }

  /**
 * Устанавливает статус задачи.
 * @param {string} type - Тип статуса задачи (например, 'new', 'processing').
 * @returns {Object} Объект данных статуса.
 */
  setStatus(status) {
    const badge = this.createElem('div');
 
    badge.className = `badge badge-pill ${status.class}`;
    badge.textContent = status.text;

    return badge;

  }
}

export { TableRowFactory }