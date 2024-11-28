/**
 * Класс для управления отображением таблицы задач.
 */
class TableRender {
  constructor () {
    this.tbody = this.setTbody();
  }

  /**
   * Получает элемент `<tbody>` таблицы.
   * @returns {HTMLElement} Элемент `tbody`.
   */
  setTbody() {
    return document.querySelector('#tbody');
  }

  /**
   * Создаёт строку таблицы на основе задачи.
   * @param {Object} task - Объект задачи с данными.
   */
  setRowHTML (task) {
    const row = new TableRowFactory();
    return row.createTableRow(task);
  }

  /**
   * Создаёт фрагмент строк таблицы на основе массива задач.
   * @param {Object[]} tasks - Массив задач.
   * @returns {DocumentFragment} Фрагмент строк таблицы.
   */
  setAllRows (tasks) {
    const fragmentOfRows = document.createDocumentFragment();

    for (let task of tasks) {
      fragmentOfRows.appendChild( this.setRowHTML(task) );
    }

    return fragmentOfRows;
  }

  /**
   * Добавляет строки задач в таблицу.
   * @param {Object[]} tasks - Массив задач.
   * @returns {HTMLElement} Обновлённый элемент `tbody` с добавленными строками.
   */
  addRowsToTable (tasks) {
    console.log(this);
    
    const rows = this.setAllRows(tasks);
    return this.tbody.appendChild(rows);
  }
}

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
  createTableRow(task, options = {}) {
    const row = this.createElem('tr');
    row.className = options.className || 'task-table__row task-table__row--link';
    row.setAttribute("scope", `${task.id}`);
    console.log(task.id);
    
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
        content : this.createAbsLink(task.full_name, `edit.html?id=${task.id}`)
      },
      {
        type : 'td',
        content : task.email
      },
      {
        type : 'td',
        content : task.phone
      },
      {
        type : 'td',
        content : this.createBadge(task.status)
      },
      {
        type : 'td',
        content : this.createButton('Редактировать')
      },
    ];

    cellsConfig.forEach( config => {
      let cell = this.createElem(config.type);

      if ( typeof config.content === 'string') {
        console.log(config.content);
        
        cell.textContent = config.content;
      } 
      else if ( config.content instanceof HTMLElement) {
        console.log(config.content);
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

  createAbsLink(content, url) {
    const link = this.createElem('a');
    link.textContent = content;
    link.href = url;
    link.className = "link-abs";

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

    /**
   * Устанавливает статус задачи.
   * @param {string} type - Тип статуса задачи (например, 'new', 'processing').
   * @returns {Object} Объект данных статуса.
   */
    setStatus(name) {
      const status = [
        {
          type : 'new',
          text : 'Новый',
          class : 'badge-danger'
        },
        {
          type : 'processing',
          text : 'В работе',
          class : 'badge-warning'
        },
        {
          type : 'new',
          text : 'Завершенный',
          class : 'badge-success'
        }
      ];
    
      return status.find(item => item.type === name);
    }

  moveAppend(){

  }
}

/* data need :
- scope=row для ряда

- статус,
- <div></div>, class="badge badge-pill badge-danger"

-кнопка Редактировать
-<td></td>
- <a href="edit.html">Редактировать</a>
*/

export { TableRender, TableRowFactory }