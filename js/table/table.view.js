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
    let tbody = document.querySelector('#tbody');

    if (!tbody) {
      console.log('Не найден контейнер для рядов таблицы');
      return;
    }

    return tbody;
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
    const cellsConfig = this.getCellsConfig(task, options = {text : 'Завершен'}); // получим настройки ячеек таблицы
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

  getCellsConfig(task) {
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
        content : this.setStatus(task.status)
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

  getStatusData (status) {
    const statuses = {
      'new' : {
                        text : 'Новый',
                        class : 'badge-danger'
              },
      'processing' : { 
                        text : 'В работе',
                        class : 'badge-warning'
                      },

      'completed' : {
                      text : 'Завершенный',
                      class : 'badge-success'
                    }
    }

    return  statuses[status] || statuses['new']; // По умолчанию вернёт 'Новый'
  }

  /**
 * Устанавливает статус задачи.
 * @param {string} type - Тип статуса задачи (например, 'new', 'processing').
 * @returns {Object} Объект данных статуса.
 */
  setStatus(status) {
    const statusData = this.getStatusData(status);
    const badge = this.createElem('div');
 
    badge.className = `badge badge-pill ${statusData.class}`;
    badge.textContent = statusData.text;

    return badge;

  }
}

class tableDataFormatter {
  static fieldGetReady () {
    return {
      phone : (phoneNumber) => {
        const phone = phoneNumber.replace(/\D/g, '');

        if (phone.length === 11 && phone[0] === '8') {
          // Заменяем 8 на 7
          return phone.replace(/^8(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');
        } else {
          console.log('Неверный номер');
          return null;
        }
      },

      name : (fullName) => {
        return fullName.split(' ').slice(0, 2).join(' ');
      },

      urlID : (url) => {
        const uri = url.split('?')[1]; // строка с парам-ми из url

        if ( !uri ) {
          console.log('В url нет параметров');
          return null;
        }

        const params = new URLSearchParams(uri);
        const id = params.get('id'); // найдем знач-е id в подстроке
    
        // Проверим, что парам-р в ссылке - id
        if ( !id ) {
          console.log('В параметре ID нет значения.');
          return null;
        }
  
         return id;
      }
    }
  }
}

export { TableRender, TableRowFactory }