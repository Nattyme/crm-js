import { validate } from './validate.js';

// Ф-ция форматирует временную метку
const dateFormatter = function (timestamp, formatter) {
  const date = formatter.format( new Date(timestamp) );

  return date;
}

class TaskManager {
  constructor () {
    this.data = [];
  }

  // Метод возвращает все данные
  getAll() {
    return this.data;
  }

  // Метод возвращает случ. запись
  getData(id) {
    let data = this.data.find(task => task.id === id);
    console.log(data);
    
    if (!data) return console.error(`Запись не найдена в ${this.data}`);

    const dataCopy = {...data};
    console.log(dataCopy);
    
    dataCopy.date = this.getFormattedData( dataCopy.timestamp);
    console.log('Запись, вовращённая getData: ');
    console.log(dataCopy);
    
    // Вернём случ. запись
    return dataCopy;
  }

  getFormattedData (timestamp) {
    const formatter = new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return dateFormatter(timestamp, formatter);
  }

  // Метод добавляет запись
  addNewData(record) {
    console.log(record);
    
    let isValid = true;

    for ( const data in record) {
      console.log(record[data] );
      if ( record[data] === null || record[data] === undefined) {
        
        console.log('Ошибка данных. Запись не добавленна.');
        isValid = false;
        return;
      }
    }

    if (isValid === true) {
      this.data.push(record);
    };

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

class Task {
  constructor ( id, {full_name, product, email, phone}) {
    this.id = id,
    this.timestamp = Date.now();
    this.full_name = this.setProperty( full_name, validate.name),
    this.product = product,
    this.email = this.setProperty( email, validate.email),
    this.phone = this.setProperty( phone, validate.phone)
  }
 
  setProperty ( value, validate) {
    const result = validate(value);
    console.log(result.value);
    
    console.log(result.valid);
    if(!result.valid) {
      console.log(result.error);
      return null;
    } 
    
    return result.value;
  }

}

export { TaskManager, Task, dateFormatter }




