import {validate} from './../utils/validate.js';

/**
 * Класс для редактирования формы задач.
 *
 * @class FormEdit
*/
class FormEdit  {
  /**
   * Создаёт экземпляр класса FormEdit для работы с формой редактирования.
   *
   * @constructor
   * @param {Object} eventBus - Объект для управления событиями.
   * @param {Object} taskManager - Менеджер задач для работы с данными задач.
   * @param {Object} formatter - Форматировщик для обработки данных задачи.
  */
  constructor (eventBus, taskManager, formatter) {
    this.eventBus = eventBus;
    this.taskManager = taskManager;
    this.formatter = formatter;
    this.formElements = {};
  }

  /**
   * Получает ID задачи из URL.
   *
   * @method getTaskId
   * @memberof FormEdit
   * @returns {string|null} ID задачи или null, если не найдено.
  */
  getTaskId () {
    if ( this.formatter.getUrlId() !== null ) {
      return this.formatter.getUrlId();
    } else {
      console.log('Не получен ID задачи'); 
      return null;
    }
  }

  /**
   * Извлекает данные формы в виде объекта.
   *
   * @method getFormData
   * @memberof FormEdit
   * @param {HTMLFormElement} formElement - Элемент формы, данные которой нужно извлечь.
   * @returns {Object} Объект с данными формы.
  */
  getFormData(formElement) {
    const form = new FormData(formElement);
 
    let formData = {}; // Объект для значений формы

    // Получим данные из полей
    for (let pair of form.entries()) {
      formData[pair[0]] = pair[1];
    }    
    
    return formData;
  }

  /**
   * Обновляет задачу на основе данных из формы.
   *
   * @method updateTask
   * @memberof FormEdit
   * @param {Object} startTaskData - Исходные данные задачи.
   * @param {Object} formData - Данные формы для обновления задачи.
   * @returns {Object|boolean} Обновлённые данные задачи или false, если в форме есть пустые поля.
  */
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
        status : this.setValidValue(formData.status, validate.status),
        changed : Date.now()
    }
console.log(updatedTaskData);

    // Проверка валидации для знач-ий
    for (const key in updatedTaskData) {
      const validationResult = updatedTaskData[key];
      if (validationResult && validationResult.valid === false || null) {
        return false;  //  false, если поле не прошло проверку
      }
    }
    
    return  updatedTaskData;
  }


  /**
   * Устанавливает элементы формы.
   *
   * @method setFormElems
   * @memberof FormEdit
   * @param {Object} elements - Объект с элементами формы.
  */
  setFormElems(elemetns) {
    this.formElements = elemetns;
  }

  /**
   * Заполняет данные формы значениями из задачи.
   *
   * @method setFormTasksValues
   * @memberof FormEdit
   * @param {Object} task - Объект задачи с данными для заполнения формы.
  */
  setFormTasksValues(task) {  
    const taskDisplayFormat = this.formatter.formatTaskEdit(task);

    if(!taskDisplayFormat) return;
  
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

  /**
   * Проверяет и возвращает валидное значение, или null, если значение не прошло валидацию.
   *
   * @method setValidValue
   * @memberof FormEdit
   * @param {string} value - Значение для проверки.
   * @param {Function} validate - Функция для валидации значения.
   * @returns {string|null} Валидное значение или null, если оно невалидно.
  */
  setValidValue(value, validate) {
    const result = validate(value);  
   
    if (!result || !result.valid) {
      return null;  
    }
  
    // Если значение валидно
    return result.value;
  }
  
  
}

export { FormEdit };