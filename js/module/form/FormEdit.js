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

  setFormTaskValue(task, idElem, dateElem, selectElem, selectStatusElem, inputs) {
    console.log(task);
   
    console.log(task.status.text);

    // Установим значения в поля формы
    idElem.textContent = task.id;
    dateElem.textContent = task.date;
    inputs.full_name.value = task.full_name;
    inputs.phone.value = task.phone;
    inputs.email.value = task.email;
console.log(selectStatusElem);

    const options = Array.from(selectElem.options);
    const optionsStatus = Array.from(selectStatusElem.options);
    // Ищем нужную опцию в select и показываем её
    const productIndex = selectElem.selectedIndex = options.findIndex( (element) => element.textContent.trim() === task.product);
    if (productIndex !== -1) {
      selectElem.selectedIndex = productIndex;
    } else {
      console.log('Продукт не найден');
    }

    const statusIndex = selectStatusElem.selectedIndex = optionsStatus.findIndex( (element) => element.textContent.trim() === task.status.text);
    if (statusIndex !== -1) {
      selectElem.selectedIndex = productIndex;
    } else {
      console.log('Статус заявки не найден');
    }
    
  }


}

export { FormEdit };