import { products } from './../data/data.js';
import { Status } from '../modules/Status.js';
import { formatter } from './../model.js';

/**
 * Объект `validate` содержит методы для проверки корректности значений различных полей формы.
 */
const validate = {
  /**
   * Проверяет значение поля `name` (имя и фамилия).
   * 
   * @param {string} full_name - Полное имя пользователя (фамилия и имя, возможно отчество).
   * @returns {Object} Результат валидации с полями:
   * - `valid` {boolean}: Указывает, корректно ли значение.
   * - `value` {string}: Приведённое значение (при успешной валидации).
   * - `error` {string}: Сообщение об ошибке (при некорректной валидации).
   */
  full_name(full_name) {
    if(!full_name) {
      return {
        valid : false,
        error : 'Ошибка.Поле full_name пустое или некорректно заполнено'
      };
    } 
 
    let nameValid = String(full_name).trim(); // Преобразуем в строку, удалим пробелы
    
    const nameRegex = /^[a-zA-Za-яА-ЯёЁ]+[\s][a-zA-Za-яА-ЯёЁ]+$/; // Если пользователь ввел фамилию и имя
    const threeNameRegex = /^[a-zA-Za-яА-ЯёЁ]+[\s][a-zA-Za-яА-ЯёЁ]+[\s][a-zA-Za-яА-ЯёЁ]+$/; // Если пользователь ввёл ФИО

    // Проверка на пустую строку
    if( nameValid === '' ) {
      return {
        valid: false, 
        error: 'Ошибка. Пустое поле имени' 
      } 
    }  

    // Проверка на рег. выражения
    if( !nameRegex.test(nameValid) && !threeNameRegex.test(nameValid)) {
      return {
        valid: false, 
        error: 'Ошибка. Неверный формат имени. Введите имя и фамилию в текстовом формате.'
      } 
    } 

    nameValid = formatter.formatCamelWords(nameValid);
    
    // Если всё ок 
    return {valid: true, value : nameValid};
  },

  /**
   * Проверяет значение поля `phone` (номер телефона).
   * 
   * @param {string} phone - Номер телефона пользователя.
   * @returns {Object} Результат валидации с полями:
   * - `valid` {boolean}: Указывает, корректно ли значение.
   * - `value` {string}: Приведённое значение (при успешной валидации).
   * - `error` {string}: Сообщение об ошибке (при некорректной валидации).
   */
  phone(phone) {
    // Если номер не получен - ошибка
    if(!phone) {
      return {
        valid : false,
        error : 'Ошибка.Поле phone пустое или некорректно заполнено'
      };
    } 

    const phoneValid = String(phone).replace(/\D/g, '').trim(); // Удалим все, кроме цифр. Приведем к строке
    const phoneRegex = /^\+?[0-9\s\-()]{10,}$/; // Проверка номера

    // Проверка на пустую строку
    if( phoneValid === '') {
      return {valid : false, error : console.log('Ошибка. Пустое поле телефона')};
    }

    // Проверка NaN и рег.выражения
    if (isNaN(phoneValid) || !phoneRegex.test(phoneValid) ) {
      return {valid : false, error : console.log('Ошибка. Неверный формат номера телефона')};
    } 

    // Если всё ок 
    return {valid: true, value : phoneValid};
  },

  /**
   * Проверяет значение поля `email` (электронная почта).
   * 
   * @param {string} email - Электронная почта пользователя.
   * @returns {Object} Результат валидации с полями:
   * - `valid` {boolean}: Указывает, корректно ли значение.
   * - `value` {string}: Приведённое значение (при успешной валидации).
   * - `error` {string}: Сообщение об ошибке (при некорректной валидации).
   */
  email(email) {
    // Если email не получен - ошибка
    if(!email) {
      return {
        valid : false,
        error : 'Ошибка.Поле email пустое или некорректно заполнено'
      };
    } 
 
    const emailValid = String(email).trim(); // Преобразуем в строку, удалим пробелы

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/; // Общий формат email
    const emailRegexParts = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // Проверка на имя, один символ @ и домен

    // Проверка на пустую строку
    if (emailValid === '') {
      return {valid: false, error : 'Ошибка. Поле email не должно быть пустым'
      };
    }

    // Проверка на макс. длинну
    if ( emailValid.length > 320 ) {
      return {valid: false, error : 'Ошибка. Значение поля email слишком длинное.'};
    };

    // Проверка на рег. выражение 
    if ( !emailRegex.test(emailValid) ) {
      return {valid: false, error : 'Ошибка. Недопустимые символы в поле email.'};
    }

    // Проверка на рег. выражение имени и домена
    if ( !emailRegexParts.test(emailValid) ) {
      return {valid: false, error : 'Ошибка. Неверный формат email.'};
    };

    // Если всё ок 
    return {valid: true, value : emailValid};
  },

  /**
   * Проверяет значение поля `product` (название продукта).
   * 
   * @param {string} name - Название продукта.
   * @returns {Object} Результат валидации с полями:
   * - `valid` {boolean}: Указывает, корректно ли значение.
   * - `value` {string}: Приведённое значение (при успешной валидации).
   * - `error` {string}: Сообщение об ошибке (при некорректной валидации).
  */
  product (name) {
    const productData = products;

    for (const product in productData) {
      if (product === name) { return {valid: true, value: product} }
    } 


  },

  /**
   * Проверяет значение поля `status` (статус).
   * 
   * @param {string} incomeStatus - Статус.
   * @returns {Object} Результат валидации с полями:
   * - `valid` {boolean}: Указывает, корректно ли значение.
   * - `value` {Object}: Приведённое значение (объект статуса при успешной валидации).
   * - `error` {string}: Сообщение об ошибке (при некорректной валидации).
  */
  status (incomeStatus) {
    const status = new Status();
    const statusTypes = status.data;

    for (const item in statusTypes) {
      const currentObj = statusTypes[item];
     
      if (typeof incomeStatus === 'string' &&  currentObj.key === incomeStatus.trim()) {
        return {valid: true, value: currentObj.key};
      }

    }

    return null;
    
  },

  /**
   * Проверяет, заполнены ли все поля в объекте.
   * 
   * @param {Object} dataObj - Объект, поля которого проверяются.
   * @returns {boolean} Возвращает `true`, если все поля заполнены, и `false`, если хотя бы одно поле пустое.
  */
  empty (dataObj) {
    for ( const field in dataObj) {
      if ( dataObj[field] === null || dataObj[field] === undefined) {
        return false;
      }
      return true;
    }
  },

  /**
   * Проверяет указанные поля в объекте и валидирует их.
   * 
   * @param {Object} dataObj - Объект, в котором проверяются поля.
   * @param {Array<string>} fieldsArray - Массив полей, которые нужно проверить.
   * @returns {boolean} Возвращает `true`, если все поля корректны, иначе `false`.
  */
  valuesInObject (dataObj, fieldsArray) {
    let result = true;
    // Проверяем только указанные поля
    for (const field of fieldsArray) {
      if (!(field in dataObj)) {
        result = false;
        return; 
      }

      const validationMethod = validate[field];  // Проверяем значение 

      if (validationMethod) {
          const validationResult = validationMethod(dataObj[field]);
        
          if (!validationResult.valid) {return  console.log(`Ошибка в поле ${field}`);}
          dataObj[field] = validationResult.value; // Обновляем значение поля на валидированное
          
          return dataObj;
      } 
    }

    return result;
  },

  /**
   * Проверяет все указанные поля задачи и валидирует их.
   * 
   * @param {Object} task - Задача, поля которой проверяются.
   * @param {Array<string>} valuesToCheck - Массив полей для проверки.
   * @returns {boolean} Возвращает `true`, если все поля задачи корректны, иначе `false`.
  */
  fieldsOfTaskObj (task, valuesToCheck) {
    let result = true;
    let isFilled = this.empty(task);

    if(!isFilled) {
      result = false;
      console.log('Ошибка данных: есть пустое поле. Запись не добавлена.')
      return;
    }; 

    const valuesValid = this.valuesInObject(task, valuesToCheck);  // Проверяем только указанные поля

    if (!valuesValid) result = false;
    return result;
  }

}

export {validate};