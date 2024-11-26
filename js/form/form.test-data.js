class TaskManager {
  constructor () {
    this.data = [];
  }

  // Метод возвращает все данные
  getAll() {
    return this.data;
  }

  // Метод возвращает случ. запись
  getRandom() {
    // Получаем случ-ое число
    const randomIndex = Math.floor(Math.random() * this.data.length);
    
    // Вернём случ. запись
    return this.data[randomIndex];
  }

  // Метод добавляет запись
  addNewData(record) {
    this.data.push(record)
    return;
  }

  calcID (data) {
    let id = Number;
    if ( data.length !== 0 ) {
      const lastIndex = data[data.length - 1];
      const lastRecord = data.length[lastIndex];
      id = lastRecord.id + 1;
    } else {
      id = 1;
    }

    return Number(id);
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
    const task = {};
    this.id = id,
    this.timestamp = Date.now();
    this.full_name = this.setName(full_name),
    this.product = product,
    this.email = this.setEmail(email),
    this.phone = this.setPhone(phone)
  }

  setName(full_name) {
    const nameValid = String(full_name.trim());
    const nameRegex = /^[a-zA-Za-яА-ЯёЁ]+\s[a-zA-Za-яА-ЯёЁ]$/;
    if( nameValid === '' ) return console.log('Ошибка. Пустое поле имени');
    if( !nameRegex.test(nameValid) ) return console.log('Ошибка. Неверный формат имени. Введите имя и фамилию в текстовом формате.');
    
    return String( nameValid );
  }

  setPhone(phone) {
    const phoneValid = Number( phone.trim() );
    const phoneRegex = /^[0-9]{11,}$/;

    if( phone === '') return console.log('Ошибка. Пустое поле телефона');
    if (isNaN(phoneValid) || phoneValid.length > 25) return console.log('Ошибка. Номер телефона слишком длинный');
    if( !phoneRegex.test(phoneValid) ) return console.log('Ошибка. Неверный формат номера телефона');

    return Number( phoneValid );
  }

  setEmail(email) {
    const emailValid = String( email.trim() );
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const emailRegexParts = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (emailValid === '') return console.log('Ошибка. Поле email не должно быть пустым');
    if ( emailValid.length > 320 ) return  console.log('Ошибка. Длинна email слишком большая.')
    if ( !emailRegex.test(emailValid) ) return console.log('Ошибка. Недопустимые символы в поле email.');
    if ( !emailRegexParts.test(emailValid) ) return console.log('Ошибка. Неверный формат имени или домена  email.');
    
    return String( emailValid );
  }


  

  getTask() {
    return this.task;
  }
}

const getTestData = function () {
  // Тестовые данные
  const testData = [
    {
      "full_name" : "Екатерина М",
      "product" : "php курс",
      "email" : "justkate@google.com",
      "phone" : "89253458675"
    },
    {
      "full_name" : "Sofi B",
      "product" : "js курс",
      "email" : "sofi@outlook.com",
      "phone" : "89245600000"
    },
    {
      "full_name" : "Alexander B",
      "product" : "html курс",
      "email" : "alex@mail.ru",
      "phone" : "89253458675"
    },
    {
      "full_name" : "Екатерина С",
      "product" : "php курс",
      "email" : "justkate@google.com",
      "phone" : "89253458675"
    },
    {
      "full_name" : "Анатолий Ш",
      "product" : "php курс",
      "email" : "anatol@google.com",
      "phone" : "89253458675"
    },
    {
      "full_name" : "Polina S",
      "product" : "php курс",
      "email" : "polly777@google.com",
      "phone" : "89253555555"
    }
  ];

  // Метод возвращает случ. запись
  const getRandom = function (testData) {
    // Получаем случ-ое число
    const randomIndex = Math.floor(Math.random() * testData.length);
    
    // Вернём случ. запись
    return testData[randomIndex];
  }

  const data = getRandom( testData );
  return data;
}

const manager = new TaskManager();
const data = manager.getAll();
const id = manager.calcID(data);
const testData = getTestData();
console.log(manager);
console.log(data);
console.log(id);
console.log(testData);
const task = new Task(id, {...testData});
console.log(task);


