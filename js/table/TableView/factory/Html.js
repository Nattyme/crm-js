/**
 * Factory class for generating HTML elements for a table.
 */
class HTMLFactory {
  /**
   * Предоставляет набор HTML-шаблонов для компонентов таблицы.
   * @returns {Object} Объект, содержащий методы для генерации HTML-строк для различных компонентов таблицы.
  */
  getHTML (type, content = '', extra='') {  

    const templates =  {
              /**
               * Generates an HTML string for a table row.
               * @param {Object} task - Task data for the row.
               * @param {number} task.id - Unique identifier for the task.
               * @param {Object} task.status - Status of the task.
               * @param {string} task.status.class - CSS class for the task's status.
               * @param {string} task.status.text - Display text for the task's status.
               * @returns {string} HTML string for the table row.
              */
              row : (content, extra) => this.generateRow(content, extra),

              /**
               * Generates an HTML string for a table cell.
               * @returns {string} HTML string for the table cell.
              */
              cell : (content) => this.generateCell(content),

              /**
               * Generates an HTML string for an action button.
               * @param {string} [text='Редактировать'] - Text to display on the button.
               * @returns {string} HTML string for the action button.
              */
              button : (content, extra) => this.generateButton(content, extra),

              /**
               * Generates an HTML string for a status badge.
               * @param {Object} task - Task data.
               * @param {Object} task.status - Status of the task.
               * @param {string} task.status.class - CSS class for the badge.
               * @param {string} task.status.text - Text to display in the badge.
               * @returns {string} HTML string for the badge.
             */
              badge :  (content) => this.generateBadge(content),

              /**
               * Generates an HTML string for a link with a custom title.
               * @param {Object} content - Content data for the link.
               * @param {number} content.id - Identifier for the linked task.
               * @param {string} content.text - Text to display in the link.
               * @param {string} url - URL for the link.
               * @returns {string} HTML string for the link.
             */
              linkAbs : (content) => this.generateLinkAbs(content, extra)
    }

    return templates[type] ? templates[type](content, extra) : '';
  }

  /**
   * Генерирует HTML-строку для строки таблицы.
   * @param {Object} content - Данные для строки.
   * @param {string} extra - Дополнительный HTML-контент, который будет включен в строку.
   * @returns {string} HTML-строка для строки таблицы.
  */  
  generateRow (content, extra) {
    return `
              <tr 
                class="task-table__row task-table__row--link" 
                scope=${content.id} 
                data-status=${content.status.key}>
                ${extra}
              </tr>
             `;
  }

  /**
   * Генерирует HTML-строку для ячейки таблицы.
   * @param {string} content - Контент для ячейки таблицы.
   * @returns {string} HTML-строка для ячейки таблицы.
  */
  generateCell (content) {
    return `<td>${content}</td>`;
  }

  /**
   * Генерирует HTML-строку для кнопки действия.
   * @param {string} content - Текст, который будет отображаться на кнопке.
   * @param {string} extra - URL для кнопки действия.
   * @returns {string} HTML-строка для кнопки.
  */
  generateButton (content, extra) {    
    return `<a class="button-edit" href="${extra}">${content}</a>`;
  } 

  /**
   * Генерирует HTML-строку для бейджа статуса.
   * @param {Object} content - Контент бейджа.
   * @param {string} content.class - CSS-класс для бейджа.
   * @param {string} content.text - Текст, который будет отображаться в бейдже.
   * @returns {string} HTML-строка для бейджа.
  */
  generateBadge (content) {

    return `<div class="badge badge-pill ${content.class}">
                ${content.text}
            </div>`;
  }  

  /**
   * Генерирует HTML-строку для ссылки с настраиваемым заголовком.
   * @param {Object} content - Контент для ссылки.
   * @param {string} extra - Дополнительный HTML-контент для ссылки.
   * @returns {string} HTML-строка для ссылки.
  */
  generateLinkAbs (content, extra)  {
    return ` 
            <a 
              class = "link-abs"
              title = "Перейти к редактированию заявки №${content}" 
              href="edit.html?id=${content}"
            >
                ${extra}
            </a>`
  }

}

export { HTMLFactory };