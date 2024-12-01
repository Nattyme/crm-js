import {NAMES} from './../../config.js';
import Formatter from '../../utils/formatter.js';
import validate from '../../utils/validate.js';
import {eventBus} from './../../module/EventBus.js';

class FormEdit  {
  constructor () {
    this.eventBus = eventBus;

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

  updateTaskData(id, record) {
    
    console.log(record);
    
    // Ищем пустые знач-я
    for ( const field in record) {
      if ( record[field] === null || record[field] === undefined) {
        console.log('Ошибка данных. Запись не добавлена. Поля формы не должны быть пустыми');
        return;
      }
    }

    record.id = Number(id); 
    record.product = validate.product(record.product); //Отформатируем знач-е product 
    record.changed = Date.now();
    // this.data.push(record); 
    console.log('DATA after ADD NEW DATA', this.data);
console.log(record);

    // Событие сохранения 
    this.eventBus.emit(NAMES.TASKS_SAVE, record); 
    // this.eventBus.emit(record); // передадим запись 
    return record;
  }

  getTaskID () {
    // получим и вернём id задачи
    if ( Formatter.getUrlID() !== null ) {
      return Formatter.getUrlID();
    } else {
      console.log('Не получен ID задачи'); 
      return null;
    }
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

    // Ф-ция ищет нужную опцию в селект
    const getSelectedIndex = function (options, value) {
      return options.findIndex( (element) => element.textContent.trim() === value);
    }

    selectElem.selectedIndex = getSelectedIndex(Array.from(selectElem.options), task.product);
    selectStatusElem.selectedIndex = getSelectedIndex(Array.from(selectStatusElem.options), task.status.text);   
  }

  getFormData(formElement) {
    const form = new FormData(formElement);
 
    let formData = {}; // Объект для значений формы

    // Получим данные из полей
    for (let pair of form.entries()) {
      formData[pair[0]] = pair[1];
    }
    
    return formData;
  }

  getTimestampOrigin (task) {
    return task.timestamp;
  }




}

export { FormEdit };