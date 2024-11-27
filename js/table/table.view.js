class TableRender {
  constructor (taskData) {
    this.row = setRowHTML();
  }

  setRowHTML() {

  }

  setData (taskData) {
    
  }

  renderRow (taskData) {
    this.setData(taskData);
  }

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

class TableRowFactory {
  static createTableRow(task) {
    const row = document.createElement('th');
    
    // Создадим ячейки таблицы
    const idCell = document.createElement('td');
    idCell.textContent = task.id;

    const dateCell = document.createElement('td'); 
    dateCell.textContent = task.date;

    const productCell = document.createElement('td');
    productCell.textContent = task.product;

    const nameCell = document.createElement('td');
    nameCell.textContent = task.full_name;

    const emailCell = document.createElement('td');
    emailCell.textContent = task.email;

    const phoneCell = document.createElement('td');
    phoneCell.textContent = task.phone;

    const statusCell = document.createElement('td');
    statusCell.textContent = task.status;

    const buttonCell = document.createElement('td');
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
}

/* data need :
- ряд <th></th>
- scope=row для ряда
- data, product, full_name, email, phone

- статус, статус текст
- <td></td>
- <div></div>, class="badge badge-pill badge-danger"

-кнопка Редактировать
-<td></td>
- <a href="edit.html">Редактировать</a>
*/

export { TableRender, TableRowFactory }