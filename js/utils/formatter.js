/**
 * Класс для форматирования данных, таких как телефон, имя и URL.
 */
class Formatter {
  /**
   * Создает экземпляр Formatter.
   * @param {Object} status - Объект статусов.
   * @param {Object} products - Список продуктов.
  */
  constructor (status, products) {
    this.regEx = {
      digit :     /\D/g,
      formatRU : /^[87](\d{3})(\d{3})(\d{2})(\d{2})$/,
    }
    this.products = products;
    this.status = status;
  }

  /**
   * Получает идентификатор задачи из параметров URL.
   * @returns {string|null} Возвращает ID задачи, если он существует, иначе null.
  */
  getUrlId () {
    const url = window.location.search;  // получим полный адрес страницы
    const params = new URLSearchParams(url);
    const id = params.get('id') ? params.get('id') : console.log('В параметре ID нет значения.');  // если есть парам-р 'id' - возьмем его знач-е

    return id;
  }

  /**
   * Форматирует номер телефона в международный формат.
   * @param {string} phoneNumber - Номер телефона для форматирования.
   * @returns {string|null} Возвращает форматированный номер телефона или null, если номер неверный.
  */
  formatPhone (phoneNumber) {
    let phone = phoneNumber.replace(this.regEx.digit, '');

    if (phone.length === 11 && (phone[0] === '8' || phone[0] === '7') ) {
      return phone.replace(this.regEx.formatRU, '+7 ($1) $2-$3-$4'); // формат RU
    } 

    console.log('Неверный номер');
    return null;
  }

  /**
   * Форматирует полное имя, оставляя только имя и фамилию.
   * @param {string} fullName - Полное имя.
   * @returns {string} Имя и фамилия.
  */
  formatName (fullName) {
    return fullName.split(' ').slice(0, 2).join(' ');   // если больше двух слов - убирает лишнее
  }

  /**
   * Форматирует статус задачи.
   * @param {string|Object} incomeStatus - Статус задачи.
   * @returns {Object|null} Объект статуса или null, если статус не найден.
  */
  formatStatus(incomeStatus) {
    const statusTypes = this.status.data;

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

  /**
   * Форматирует продукт, возвращая его описание.
   * @param {string} name - Название продукта.
   * @returns {Object|null} Объект продукта или null, если продукт не найден.
  */
  formatProduct(name) {
    for (const product in this.products) {
      if (product === name) {
        return this.products[name];
      }
    }
  }

 /**
   * Подготавливает данные для отображения, применяя форматирующие функции.
   * @param {Array} taskData - Массив объектов данных задач.
   * @returns {Array} Обновленный массив данных для отображения.
  */
  formatDataInTable ( taskData ) {
    const updatedData = taskData.map( record => ({
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

  /**
   * Преобразует строку в формат с заглавными буквами.
   * @param {string} dataString - Строка для форматирования.
   * @returns {string} Строка с правильным капитализацией.
  */
  formatCamelWords (dataString) {
    console.log('Check names');
    console.log(dataString);
    
    dataString = dataString.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    console.log(dataString);
    dataString = dataString.join(' ');
    console.log(dataString);
    return dataString;
  }

  /**
   * Форматирует задачу для редактирования, применяя форматирование даты и телефона.
   * @param {Object} taskData - Данные задачи.
   * @returns {Object} Отформатированные данные задачи.
  */
  formatTaskEdit(taskData) {
    let taskWithDate = this.formatTaskDateTime(taskData, 'date-time');
    taskWithDate.phone = this.formatPhone(taskWithDate.phone);
    return taskWithDate;
  }


  /**
   * Форматирует дату задачи в заданный формат.
   * @param {Object} taskData - Данные задачи.
   * @param {string} type - Тип формата ('date' или 'date-time').
   * @returns {Object} Отформатированные данные задачи.
  */
  formatTaskDateTime (taskData, type = 'date') {
    const dataCopy = {...taskData};  
  
    if (type === 'date') {
      dataCopy.date = this.formatDate( dataCopy.timestamp);
    }

    if (type === 'date-time') {
      dataCopy.date = this.formatDateTime( dataCopy.timestamp, 'date-time')
    }
    return dataCopy;
  }

  /**
   * Форматирует временную метку в строку ISO для даты и времени.
   * @param {number} timestamp - Временная метка.
   * @returns {string} Отформатированная строка даты и времени.
  */
  formatDateTime (timestamp) {
    const dateStamp = new Date(timestamp);
    let dateTime = dateStamp.toISOString();

    return dateTime = dateTime.slice(0, -5).replace('T', ' ');
  }

  /**
   * Форматирует временную метку в строку даты.
   * @param {number} timestamp - Временная метка.
   * @returns {string} Отформатированная строка даты.
  */
  formatDate (timestamp) {
    const formatter = new Intl.DateTimeFormat ( 'ru-RU', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }
    );

    return formatter.format( new Date(timestamp));
  }
}

export { Formatter };