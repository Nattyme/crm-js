/**
 * Factory class for generating HTML elements for a table.
 */
class HTMLFactory {
  /**
   * Provides a set of HTML templates for table components.
   * @returns {Object} An object containing methods to generate HTML strings for various table components.
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

  generateCell (content) {
    return `<td>${content}</td>`;
  }

  generateButton (content, extra) {    
    return `<a class="button-edit" href="${extra}">${content}</a>`;
  } 

  generateBadge (content) {

    return `<div class="badge badge-pill ${content.class}">
                ${content.text}
            </div>`;
  }  

  generateLinkAbs (content, extra)  {
    return ` 
            <a 
              class = "link-abs"
              title = "Перейти к редактированию заявки №${content}" 
              href="edit.html"
            >
                ${extra}
            </a>`
  }

}

export { HTMLFactory };