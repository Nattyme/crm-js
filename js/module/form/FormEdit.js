import Formatter from '../../utils/formatter.js';
import validate from '../../utils/validate.js';
import {eventBus} from '../EventBus.js';

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

  updateTask(startTaskData, updatedTaskData) {
    console.log(startTaskData);
    
    // Ищем пустые знач-я
    for ( const field in updatedTaskData) {
      if ( updatedTaskData[field] === null || updatedTaskData[field] === undefined) {
        console.log('Ошибка данных. Запись не добавлена. Поля формы не должны быть пустыми');
        return;
      }
    }

    const updatedRecord = {
      ...startTaskData,
      email : this.setProperty(updatedTaskData.email, validate.email),
      full_name : this.setProperty(updatedTaskData.full_name, validate.name),
      product : this.setProperty(updatedTaskData.product, validate.product), //Отформатируем знач-е product 
      phone :  this.setProperty(updatedTaskData.phone, validate.phone),
      status : this.setProperty(updatedTaskData.status, validate.status),
      changed : Date.now()
    }

    console.log('DATA after ADD NEW DATA', this.data);

    return updatedRecord;
  }

  setProperty ( value, validate) {
    const result = validate(value);
   console.log(result);
   
    if(!result.valid) {
      console.log(`Ошибка: неверное поле ${value}`);
      
      return null;
    } 
    
    return result.value;
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
    // Установим значения в поля формы
    idElem.textContent = task.id;
    dateElem.textContent = task.date;
    inputs.full_name.value = task.full_name;
    inputs.phone.value = task.phone;
    inputs.email.value = task.email;

    // Ф-ция ищет нужную опцию в селект
    const getSelectedIndex = function (options, value) {
      return [...options].findIndex( (element) => element.textContent.trim() === value);
    }

    // Находим и выбираем нужный продукт
    selectElem.selectedIndex = getSelectedIndex([...selectElem.options], task.product);
    // Находим и выбирем нужный статус
    selectStatusElem.selectedIndex = getSelectedIndex([...selectStatusElem.options], task.status.text);  
    console.log(getSelectedIndex([...selectStatusElem.options], task.status.text));
    console.log(task.status.text);
     
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

  formatFromData(formData) {

    const formatter = new Formatter();
    console.log(formData);
    console.log(formData.product);
    console.log(formData.status);
    
    return {
      ...formData,
      phone : formatter.formatPhone(formData.phone),
      product : formatter.formatProduct(formData.product),
      status : formatter.formatStatus(formData.status)
    }
  }
}

export { FormEdit };