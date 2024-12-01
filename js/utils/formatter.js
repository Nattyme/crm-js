/**
 * Класс для форматирования данных, таких как телефон, имя и URL.
 */
class Formatter {
  constructor () {
    this.regEx = {
      digit :     /\D/g,
      formatRU : /^8(\d{3})(\d{3})(\d{2})(\d{2})$/,
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
    const url = window.location.href;  // получим полный адрес страницы
    const uri = url.split('?')[1] ? new URLSearchParams( url.split('?')[1] ) : console.log('В url нет параметров'); // разделим по '?'
    const id = uri.get('id') ? uri.get('id') : console.log('В параметре ID нет значения.');  // если есть парам-р 'id' - возьмем его знач-е

    if ( !uri || !id) { return null; } // Нет парам-в - return

    return id;
  }

  formatPhone (phoneNumber) {
    let phone = phoneNumber.replace(this.regEx.digit, '');

    if (phone.length === 11 && phone[0] === '8') {
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

  /**
   * Подготавливает данные для отображения, применяя форматирующие функции.
   * @param {Object} data - Объект исходных данных.
   * @param {Function} data.id - Функция, возвращающая идентификатор.
   * @param {Function} data.full_name - Функция, возвращающая полное имя.
   * @param {Function} data.date - Функция, возвращающая дату.
   * @returns {Object} Объект данных для отображения с применением форматирования.
 */
  prepareDisplay ( data ) {

    const updatedData = data.map( record => ({
      ...record,
      id : String(record.id),
      full_name : this.formatName(record.full_name),
      phone : this.formatPhone(record.phone),
      date : this.formatDate(record.timestamp),
    }));

    return updatedData;
  }
}

export default Formatter;