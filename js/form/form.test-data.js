class Records {
  constructor () {
    this.data = [
      {
        "date" : "26-11-2024",
        "product" : "php курс",
        "name" : "Екатерина",
        "email" : "justkate@google.com",
        "phone" : "89253458675"
      },
      {
        "date" : "26-11-2024",
        "product" : "js курс",
        "name" : "Sofi",
        "email" : "sofi@outlook.com",
        "phone" : "89245600000"
      },
      {
        "date" : "29-10-2024",
        "product" : "html курс",
        "name" : "Alexander",
        "email" : "alex@mail.ru",
        "phone" : "89253458675"
      },
      {
        "date" : "26-11-2024",
        "product" : "php курс",
        "name" : "Екатерина",
        "email" : "justkate@google.com",
        "phone" : "89253458675"
      },
      {
        "date" : "02-01-2024",
        "product" : "php курс",
        "name" : "Анатолий",
        "email" : "anatol@google.com",
        "phone" : "89253458675"
      },
      {
        "date" : "16-07-2024",
        "product" : "php курс",
        "name" : "Polina",
        "email" : "polly777@google.com",
        "phone" : "89253555555"
      }
    ];
  }

  // Метод возвращает все данные
  getAll() {
    return this.data;
  }

  // Метод возвращает случ. запись
  getRandom() {
    // Получаем случ-ое число
    const randomIndex = Math.floor(Math.random() * this.data.length - 1);
    
    // Вернём случ. запись
    return this.data[randomIndex];
  }

  // Метод добавляет запись
  addNewData(record) {
    const calcID = function (data) {
      const lastRecord = data[data.length - 1];
      return data.length !== 0 ? lastRecord.id + 1 : 1;
    }
    
    // Посчитаем id и запишем в св-во записи
    const id = calcID(this.data);
    record.id = id;
    this.data.push(record)
    return;
  }
  
}

const recordsData = new Records();
// const testData = ;
console.log(recordsData)
console.log(recordsData.getAll())
console.log(recordsData.getRandom())
const testData = [
  {
    "date" : "26-11-2024",
    "product" : "php курс",
    "name" : "Екатерина",
    "email" : "justkate@google.com",
    "phone" : "89253458675"
  },
  {
    "date" : "26-11-2024",
    "product" : "js курс",
    "name" : "Sofi",
    "email" : "sofi@outlook.com",
    "phone" : "89245600000"
  },
  {
    "date" : "29-10-2024",
    "product" : "html курс",
    "name" : "Alexander",
    "email" : "alex@mail.ru",
    "phone" : "89253458675"
  },
  {
    "date" : "26-11-2024",
    "product" : "php курс",
    "name" : "Екатерина",
    "email" : "justkate@google.com",
    "phone" : "89253458675"
  },
  {
    "date" : "02-01-2024",
    "product" : "php курс",
    "name" : "Анатолий",
    "email" : "anatol@google.com",
    "phone" : "89253458675"
  },
  {
    "date" : "16-07-2024",
    "product" : "php курс",
    "name" : "Polina",
    "email" : "polly777@google.com",
    "phone" : "89253555555"
  }
];
