import {validate} from './../../utils/validate.js';
import {Notes} from './../../utils/notes.js';

class FormEdit  {
  constructor (formatter, eventBus) {
    this.eventBus = eventBus;

    this.form = null;
    this.select = null;
    this.inputs = {};
    this.selectStatus = null;

    this.formatter = formatter;
    this.notes = new Notes();
    this.initFormElems(); // задает элементы формы
  }

  getTaskId () {
    if ( this.formatter.getUrlId() !== null ) {
      return this.formatter.getUrlId();
    } else {
      console.log('Не получен ID задачи'); 
      return null;
    }
  }








  // Задает значения элементов в конструктор
  initFormElems(form, select, selectStatus, inputs) {
    this.form = form || null;                          
    this.select = select || null;
    this.inputs = inputs || null;              
    this.selectStatus = selectStatus || null;
  }

  updateTask(startTaskData, updatedTaskData) {
    updatedTaskData.id = startTaskData.id;
   
    // Ищем пустые знач-я
    if ( Object.values(updatedTaskData).some(value => value === null || value === undefined || String(value).trim() === '') )  {
      this.notes.addNote('error', this.notes.MESSAGES.ERROR.unvalid_value());
      return false;
    } 
    // Вернём отредак-ные знач-я
    return {
      ...startTaskData,
      email : this.setProperty(updatedTaskData.email, validate.email),
      full_name : this.setProperty(updatedTaskData.full_name, validate.full_name),
      product : this.setProperty(updatedTaskData.product, validate.product), //Отформатируем знач-е product 
      phone :  this.setProperty(updatedTaskData.phone, validate.phone),
      status : this.setProperty(updatedTaskData.status, validate.status),
      changed : Date.now()
    }

  }

  updateTaskToRender(startTaskData, updatedTaskData) {
    updatedTaskData.id = startTaskData.id;
   
    // Ищем пустые знач-я
    if ( Object.values(updatedTaskData).some(value => value === null || value === undefined || String(value).trim() === '') )  {
      this.notes.addNote('error', this.notes.MESSAGES.ERROR.unvalid_value());
      return false;
    } 
    // Вернём отредак-ные знач-я
    return {
      ...startTaskData,
      email : this.setProperty(updatedTaskData.email, validate.email),
      full_name : this.setProperty(updatedTaskData.full_name, validate.full_name),
      product : this.setProperty(updatedTaskData.product, validate.product), //Отформатируем знач-е product 
      phone :  this.setProperty(updatedTaskData.phone, validate.phone),
      status : this.setProperty(updatedTaskData.status, validate.status),
      changed : Date.now()
    }

  }

  setProperty ( value, validate) {
    const result = validate(value);
   
    if(!result.valid || result.valid === null) { 
      this.notes.addNote('error', this.notes.MESSAGES.ERROR.unvalid_value(value));
      return null;
    }; 

    return result.value
  }

  // getTaskId () {
  //   // получим и вернём id задачи
  //   if ( this.formatter.getUrlID() !== null ) {
  //     return this.formatter.getUrlID();
  //   } else {
  //     console.log('Не получен ID задачи'); 
  //     return null;
  //   }
  // }
 
  setFormTaskValue(task, elements) {  
    // Установим значения в поля формы
    elements.id.textContent = task.id;
    elements.date.textContent = task.date;
    elements.inputs.full_name.value = task.full_name;
    elements.inputs.phone.value = task.phone;
    elements.inputs.email.value = task.email;

    // Ф-ция ищет нужную опцию в селект
    const getSelectedIndex = function (options, value) {
      return [...options].findIndex( (element) => element.textContent.trim() === value);
    }

    // Находим и выбираем нужный продукт
    elements.select.selectedIndex = getSelectedIndex([...elements.select.options], task.product);
    // Находим и выбирем нужный статус
    elements.status.selectedIndex = getSelectedIndex([...elements.status.options], task.status.text);  
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

  formatFormData(formData) {
    return {
      ...formData,
      phone : this.formatter.formatPhone(formData.phone),
      product : this.formatter.formatProduct(formData.product),
      status : this.formatter.formatStatus(formData.status)
    }
  }
}

export { FormEdit };