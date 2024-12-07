import {validate} from './../utils/validate.js';
import {Notes} from './../utils/notes.js';

class FormEdit  {
  constructor (eventBus, taskManager, formatter) {
    this.eventBus = eventBus;
    this.taskManager = taskManager;
    this.formatter = formatter;
  }

  getTaskId () {
    if ( this.formatter.getUrlId() !== null ) {
      return this.formatter.getUrlId();
    } else {
      console.log('Не получен ID задачи'); 
      return null;
    }
  }

  setFormElems(elements) {  
    const id =  this.getTaskId ();
    const currentTask = this.taskManager.findTaskById(id);
    const taskDisplayFormat = this.formatter.formatTaskEdit(currentTask);

    // Установим значения в поля формы
    elements.id.textContent = taskDisplayFormat.id;
    elements.date.textContent = taskDisplayFormat.date;
    elements.inputs.full_name.value = taskDisplayFormat.full_name;
    elements.inputs.phone.value = taskDisplayFormat.phone;
    elements.inputs.email.value = taskDisplayFormat.email;

    // Ф-ция ищет нужную опцию в селект
    const getSelectedIndex = function (options, value) {
      return [...options].findIndex( (element) => element.value.trim() === value);
    }

    // Находим и выбираем нужный продукт
    elements.select.selectedIndex = getSelectedIndex([...elements.select.options], taskDisplayFormat.product);
    // Находим и выбирем нужный статус
    elements.selectStatus.selectedIndex = getSelectedIndex([...elements.selectStatus.options], taskDisplayFormat.status);  
    
    
    return elements;
  }








  

  // setFormElems (elems) {
  //   return this.formElems = elems;
  // }
  







  

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
    console.log(formData);
    
    return {
      ...formData,
      phone : this.formatter.formatPhone(formData.phone),
      product : this.formatter.formatProduct(formData.product),
      status : this.formatter.formatStatus(formData.status)
    }
  }
}

export { FormEdit };