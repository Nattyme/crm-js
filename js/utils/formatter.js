import { products } from './../data.js';
import { Status } from '../module/Status.js';
/**
 * Класс для форматирования данных, таких как телефон, имя и URL.
 */
class Formatter {
  constructor () {
    this.regEx = {
      digit :     /\D/g,
      formatRU : /^[87](\d{3})(\d{3})(\d{2})(\d{2})$/,
    }
  }

  /**
 * Возвращает объект с методами для форматирования полей данных.
 * @returns {Object} Объект с методами для обработки данных.
 */
  getFunc () {
    return this.functionsPack;
  }

  static getUrlID () {
    const url = window.location.search;  // получим полный адрес страницы
    const params = new URLSearchParams(url);
    const id = params.get('id') ? params.get('id') : console.log('В параметре ID нет значения.');  // если есть парам-р 'id' - возьмем его знач-е

    return id;
  }

  formatRows (dataToDisplay) {
    return this.formatPrepareDisplayTask(dataToDisplay); // Отформатируем поля
  }

  formatPhone (phoneNumber) {
    let phone = phoneNumber.replace(this.regEx.digit, '');

    if (phone.length === 11 && (phone[0] === '8' || phone[0] === '7') ) {
      return phone.replace(this.regEx.formatRU, '+7 ($1) $2-$3-$4'); // формат RU
    } 

    console.log('Неверный номер');
    return null;
  }

  formatName (fullName) {
    return fullName.split(' ').slice(0, 2).join(' ');   // если больше двух слов - убирает лишнее
  }

  formatDate (timestamp) {
    const formatter = new Intl.DateTimeFormat ( 'ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }
    );

    return formatter.format( new Date(timestamp));
  }

  formatDateTime (timestamp) {
    const dateStamp = new Date(timestamp);
    let date = dateStamp.toISOString();
    date = date.slice(0, -5).replace('T', ' ');
    return date;
  }

  formatStatus(incomeStatus) {
    const status = new Status();
    const statusTypes = status.data;

    for (const item in statusTypes) {
      const currentObj = statusTypes[item];
     
      if (typeof incomeStatus === 'string' &&  currentObj.key === incomeStatus.trim()) {
        return currentObj;
      } else if (incomeStatus.key === statusTypes[item].key) {
        return currentObj;
      }
      
    }
    return null;
  }

  formatProduct(name) {
    const productData = products;

    for (const product in productData) {
      if (product === name) {
        return productData[name];
      }
    }
  }

  /**
   * Подготавливает данные для отображения, применяя форматирующие функции.
   * @param {Object} data - Объект исходных данных.
   * @param {Function} data.id - Функция, возвращающая идентификатор.
   * @param {Function} data.full_name - Функция, возвращающая полное имя.
   * @param {Function} data.date - Функция, возвращающая дату.
   * @returns {Object} Объект данных для отображения с применением форматирования.
 */
  formatPrepareDisplayTask ( data ) {
    const updatedData = data.map( record => ({
      ...record,
      id : String(record.id),
      full_name : this.formatName(record.full_name),
      phone : this.formatPhone(record.phone),
      date : this.formatDate(record.timestamp),
      product : this.formatProduct(record.product),
      status : this.formatStatus(record.status)
    }));

    return updatedData;
  }

  formatCamelWords (dataString) {
    dataString = dataString.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    dataString = newString.join(' ');
  }
}

export { Formatter };