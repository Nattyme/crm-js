/**
 * Factory class for generating HTML elements for a table.
 */
class HTMLFactory {
  /**
   * Provides a set of HTML templates for table components.
   * @returns {Object} An object containing methods to generate HTML strings for various table components.
   */
  static getHTML (task) {
    return  {
              /**
               * Generates an HTML string for a table row.
               * @param {Object} task - Task data for the row.
               * @param {number} task.id - Unique identifier for the task.
               * @param {Object} task.status - Status of the task.
               * @param {string} task.status.class - CSS class for the task's status.
               * @param {string} task.status.text - Display text for the task's status.
               * @returns {string} HTML string for the table row.
              */
              row : (task) => {
                    return `  <tr 
                                class="task-table__row task-table__row--link" 
                                scope=${task.id} 
                                data-status=${task.status}>
                              </tr>`;
              },

              /**
               * Generates an HTML string for a table cell.
               * @returns {string} HTML string for the table cell.
              */
              cell : () => {
                return `<td></td>`;
              },

              /**
               * Generates an HTML string for an action button.
               * @param {string} [text='Редактировать'] - Text to display on the button.
               * @returns {string} HTML string for the action button.
              */
              button : (text = 'Редактировать') => {
                return `<a className="button-edit" href="edit.html">${text}</a>`
              },

              /**
               * Generates an HTML string for a status badge.
               * @param {Object} task - Task data.
               * @param {Object} task.status - Status of the task.
               * @param {string} task.status.class - CSS class for the badge.
               * @param {string} task.status.text - Text to display in the badge.
               * @returns {string} HTML string for the badge.
             */
              badge :  (task) => {
                 return  `<div class="badge badge-pill ${task.status.class}">${task.status.text}</div>`;
              },

              /**
               * Generates an HTML string for a link with a custom title.
               * @param {Object} content - Content data for the link.
               * @param {number} content.id - Identifier for the linked task.
               * @param {string} content.text - Text to display in the link.
               * @param {string} url - URL for the link.
               * @returns {string} HTML string for the link.
             */
              linkAbs : (content, url) => {
                // const id = tableDataFormatter.fieldGetReady().urlID(url);

                return `  <a 
                            class = "link-abs"
                            title = "Перейти к редактированию заявки №${content.id}" 
                            href="edit.html"
                          >
                              ${content.text}
                          </a>`;
              }
            }
  }
}

export { HTMLFactory };