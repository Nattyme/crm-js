import { validate } from './validate.js';
// Ф-ция форматирует временную метку
const dateFormatter = function (timestamp, formatter) {
  const date = formatter.format( new Date(timestamp) );

  return date;
}

// Класс управляет задачами (добав-е, удал-е, поиск и т д)
class TaskManager {
  constructor (eventBus) {
    this.data = [];
    this.eventBus = eventBus; // общий EventBus

    // Подписка на события
    this.eventBus.on('tasks:load', this.loadFromStorage.bind(this));
    this.eventBus.on('tasks:save', this.saveToStorage.bind(this));
    this.eventBus.on('tasks:clear', this.clearStorage.bind(this));

    // Получим данные из localStorage
    this.loadFromStorage();

    console.log('DATA ',this.data); 
  }

  // Метод загружает данные из localStorage
  loadFromStorage () {
    const storedData = localStorage.getItem('tasksData');
    this.data = storedData ? JSON.parse(storedData) : [];
    console.log('Задачи получены из localStorage');
  }

  // Метод сохраняет данные в localStorage
  saveToStorage() {
    localStorage.setItem('tasksData', JSON.stringify(this.data));
    console.log('Данные сохранены в local storage');
    
  }

  // Метод очищает local storage
  clearStorage() {
    localStorage.removeItem('tasksData');
    this.data = [];
    this.eventBus.emit('tasks:save'); // Уведомлие об изменениях
    console.log('Данные удалены из local storage. Массив data пуст');
    
  }

  // Метод возвращает все данные
  getAll() {
    return this.data;
  }

  // Метод возвращает случ. запись
  getData(id) {
    // В массиве data найдём нужную по ID
    let data = this.data.find(task => task.id === id);
    console.log(data);
    
    // Если ID не найден
    if (!data) return console.error(`Запись не найдена в ${this.data}`);

    const dataCopy = {...data};     // Создадим копию массива
    dataCopy.date = this.getFormattedData( dataCopy.timestamp); // Добавим св-во дата в нужно формате
    console.log('Запись, вовращённая getData: ');
    console.log(dataCopy);
    
    return dataCopy;  // Вернём запись
  }

  // Метод хранит формат и форматирует временную метку
  getFormattedData (timestamp) {
    const formatter = new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    return dateFormatter(timestamp, formatter);
  }

  // Метод добавляет запись
  addNewData(id, record) {
    // Обходим св-ва в массиве, ищем пустые знач-я
    for ( const field in record) {
  
      if ( record[field] === null || record[field] === undefined) {
        console.log('Ошибка данных. Запись не добавлена.');
        return;
      }
    }

    record.id = id; // Запишем ID в задачу
    this.data.push(record); // Добавим задачу в массив
console.log('DATA at ADDNEW', this.data);

    // Событие сохранения
    this.eventBus.emit('tasks:save');
    return record;
  }

  calcID (data) {
    let id;
    
    if ( data.length !== 0 ) {
      const lastRecord = data[data.length - 1];
      id = lastRecord.id + 1;
    } else {
      id = 1;
    }

    return id;
  }

  // Метод удаляет запись 
  removeData (recordID) {
    const recordIndex = this.data.findIndex(record => record.id === recordID);
    if (recordIndex !== -1) {
      this.data.splice(recordIndex, 1);
    }
    return recordID;
  }

}

// Класс создаёт задачу, валидирует св-ва
class Task {
  constructor ( {full_name, phone, email, product}) {
    console.log('Task', full_name);
    console.log('Task', product);
    console.log('Task', email);
    console.log('Task', phone);
    
    // this.id = id,
    this.timestamp = Date.now();
    this.full_name = this.setProperty( full_name, validate.name),
    this.product = product,
    this.email = this.setProperty( email, validate.email),
    this.phone = this.setProperty( phone, validate.phone)
  }
 
  setProperty ( value, validate) {
    const result = validate(value);
   console.log('value: ', value);
   console.log('validate', validate);
   console.log('result: ', result);
   console.log('!result.valid: ', !result.valid);
   
    if(!result.valid) {
      console.log(result.error);
      return null;
    } 
    
    return result.value;
  }

}

// Просулшивание событий
class EventBus {
  constructor () {
    this.listeners = {} // объект хранит события и подписчиков
  }

  // Метод для подписки на события
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  // Метод для 'отписки' от события
  off (event, callback) {
    if ( !this.listeners[event]) return;

    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  // Методы вызывает событие
  emit ( event, data) {
    if ( !this.listeners[event]) return;
    this.listeners[event].forEach(callback => callback(data));
  }
}

// Единый экз-р EventBus
const eventBus = new EventBus();


export { TaskManager, Task, EventBus, dateFormatter, eventBus}




