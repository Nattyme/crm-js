import {validate} from './../utils/validate.js';
import {Notes} from './../utils/notes.js';

class FormEdit  {
  constructor (eventBus, taskManager, formatter) {
    this.eventBus = eventBus;
    this.taskManager = taskManager;
    this.formatter = formatter;
    this.formElements = {};
  }

  // Найдём задачу по id
  getTaskId () {
    if ( this.formatter.getUrlId() !== null ) {
      return this.formatter.getUrlId();
    } else {
      console.log('Не получен ID задачи'); 
      return null;
    }
  }

  setFormElems(elemetns) {
    this.formElements = elemetns;
  }

  // Заполним данные формы
  setFormTasksValues(task) {  
    const taskDisplayFormat = this.formatter.formatTaskEdit(task);

    // Установим значения в поля формы
    this.formElements.id.textContent = taskDisplayFormat.id;
    this.formElements.date.textContent = taskDisplayFormat.date;
    this.formElements.inputs.full_name.value = taskDisplayFormat.full_name;
    this.formElements.inputs.phone.value = taskDisplayFormat.phone;
    this.formElements.inputs.email.value = taskDisplayFormat.email;

    // Ф-ция ищет нужную опцию в селект
    const getSelectedIndex = function (options, value) {
      return [...options].findIndex( (element) => element.value.trim() === value);
    }

    // Находим и выбираем нужный продукт
    this.formElements.select.selectedIndex = getSelectedIndex([... this.formElements.select.options], taskDisplayFormat.product);
    // Находим и выбирем нужный статус
    this.formElements.selectStatus.selectedIndex = getSelectedIndex([... this.formElements.selectStatus.options], taskDisplayFormat.status);  
  }

  getFormData(formElement) {
    const form = new FormData(formElement);
 
    let formData = {}; // Объект для значений формы

    // Получим данные из полей
    for (let pair of form.entries()) {
      formData[pair[0]] = pair[1];
    }
    console.log(formData);
    
    return formData;
  }

  updateTask(startTaskData, formData) {
    formData.id = startTaskData.id;
   
    // Ищем пустые знач-я
    if ( Object.values(formData).some(value => !value ||  String(value).trim() === '') )  {
      return false;
    } 
   
    // Вернём отредак-ные знач-я
    let updatedTaskData = {
        ...startTaskData,
        email : this.setValidValue(formData.email, validate.email),
        full_name : this.setValidValue(formData.full_name, validate.full_name),
        product : this.setValidValue(formData.product, validate.product), //Отформатируем знач-е product 
        phone :  this.setValidValue(formData.phone, validate.phone),
        status : this.setValidValue(formData.status, validate.status).key,
        changed : Date.now()
    }
    
    return  updatedTaskData;
  }

  setValidValue ( value, validate) {
    console.log(value);
    
    const result = validate(value);
   
    if(!result.valid || result.valid === null) { return null;}; 

    return result.value
  }


}

export { FormEdit };