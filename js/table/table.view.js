/**
 * Класс для управления отображением таблицы задач.
 */
class TableRender {
  constructor () {
    this.tbody = setTbody();
  }

  /**
   * Получает элемент `<tbody>` таблицы.
   * @returns {HTMLElement} Элемент `tbody`.
   */
  static setTbody() {
    return document.querySelector('#tbody');
  }

  /**
   * Создаёт строку таблицы на основе задачи.
   * @param {Object} task - Объект задачи с данными.
   */
  static setRowHTML (task) {
   new TableRowFactory.createTableRow(task);
  }

  /**
   * Создаёт фрагмент строк таблицы на основе массива задач.
   * @param {Object[]} tasks - Массив задач.
   * @returns {DocumentFragment} Фрагмент строк таблицы.
   */
  static setAllRows (tasks) {
    const fragmentOfRows = document.createDocumentFragment();

    for (let task of tasks) {
      fragmentOfRows.push( this.setRowHTML(task) );
    }

    return fragmentOfRows;
  }

  /**
   * Добавляет строки задач в таблицу.
   * @param {Object[]} tasks - Массив задач.
   * @returns {HTMLElement} Обновлённый элемент `tbody` с добавленными строками.
   */
  static addRowsToTable (tasks) {
    console.log(this);
    
    const rows = this.setAllRows(tasks);
    return this.tbody.appendChild(rows);
  }

  setData (taskData) {
    
  }

  /**
   * Отображает строку таблицы на основе данных задачи.
   * @param {Object} taskData - Данные задачи.
   */
  renderRow (taskData) {
    this.setData(taskData);
  }

  /**
   * Устанавливает статус задачи.
   * @param {string} type - Тип статуса задачи (например, 'new', 'processing').
   * @returns {Object} Объект данных статуса.
   */
  setStatus(type) {
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

    return statusData;
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
  createTableRow(task, options) {
    const row = this.createElem('tr');
    // ('scope', `${task.id}`);
    
    // Создадим ячейки таблицы
    const idCell = this.createElem('th');
    idCell.this.setText(task.id);

    const dateCell = this.createElem('th');
    dateCell.textContent = task.date;

    const productCell = this.createElem('th');
    productCell.textContent = task.product;

    const nameCell = this.createElem('th');
    nameCell.textContent = task.full_name;

    const emailCell = this.createElem('th');
    emailCell.textContent = task.email;

    const phoneCell = this.createElem('th');
    phoneCell.textContent = task.phone;

    const statusCell = this.createElem('th');
    const badge = this.createElem('div');
    badge.className = "badge badge-pill badge-danger";
    badge.textContent = task.status;
    badge.appendChild(statusPlate);

    const buttonCell = this.createElem('th');
    // buttonCell.textContent = task.button;

    // Добавляем ячейки в строку
    row.appendChild(idCell);
    row.appendChild(dateCell);
    row.appendChild(productCell); 
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(statusCell);

    console.log(row);
    return row;
    
  }

  /**
   * Устанавливает текст в элемент.
   * @param {string} text - Текст для установки.
   * @returns {string} Возвращает переданный текст.
   */
  setText (text) {
    return textContent = text;
  }

  /**
   * Создаёт HTML-элемент заданного типа.
   * @param {string} type - Тип HTML-элемента (например, 'div', 'td', 'tr').
   * @returns {HTMLElement} Созданный HTML-элемент.
   */
  createElem (type) {
    return document.createElement(type);
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