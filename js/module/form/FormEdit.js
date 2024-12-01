import Formatter from '../../utils/formatter.js';

class FormEdit  {
  constructor () {
    this.form = null;
    this.select = null;
    this.inputs = {};
    this.selectStatus = null;

    this.initFormElems(); // задает элементы формы
  }

  // Задает значения элементов в конструктор
  initFormElems(form, select, selectStatus, inputs) {
    this.form = form;                          
    this.select = select;
    this.inputs = inputs;              
    this.selectStatus = selectStatus;
  }

  /**
   * Получает ID задачи из строки запроса URL.
   * Если ID не найден, выводит сообщение об ошибке.
   *
   * @returns {number|null} Возвращает ID задачи, если он найден, или null, если ID не найден.
   */
  setTaskId () {
    return this.getTaskID();
  }

  getTaskID () {
    const formatter = new Formatter();

    // получим и вернём id задачи
    if ( formatter.getUrlID() !== null ) {
      return formatter.getUrlID();
    } else {
      console.log('Не получен ID задачи'); 
      return null;
    }
  }

  getTask(id) {
  
  }

  setFormTaskValue() {
    const id = getTaskID();
    const taskData = getTask(id);
  }


}

export { FormEdit };