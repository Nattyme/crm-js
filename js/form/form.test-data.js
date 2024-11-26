class TestDataFactory {
  static createRecord (data) {
    console.log(data);
    
    return {
      full_name : data.full_name,
      product : data.product,
      email : data.email,
      phone : data.phone
    };
  }

  static createRandomRecord () {
     // Тестовые данные
    const testData = [
      {
        "full_name" : "Екатерина М",
        "product" : "Курс по JavaScript",
        "email" : "justkate@google.com",
        "phone" : "89253458675"
      },
      {
        "full_name" : "Екатерина М",
        "product" : "Курс по VUE JS",
        "email" : "justkate@google.com",
        "phone" : "89253458675"
      },
      {
        "full_name" : "Sofie Braz",
        "product" : "Курс по WordPress",
        "email" : "sofie@outlook.com",
        "phone" : "89245600000"
      },
      {
        "full_name" : "Alexander B",
        "product" : "Курс по PHP",
        "email" : "@mail.ru",
        "phone" : "89253458675"
      },
      {
        "full_name" : "Екатерина С",
        "product" : "Курс по VUE JS",
        "email" : "justkate@google",
        "phone" : "89253458675"
      },
      {
        "full_name" : "Анатолий",
        "product" : "Курс по VUE JS",
        "email" : "anatol@google.com",
        "phone" : "89253458675"
      },
      {
        "full_name" : "Stepanova Polina Vladimirovna",
        "product" : "Курс по PHP",
        "email" : "polly777@google.com",
        "phone" : "89253555555"
      },
      {
        "full_name" : "Stepanova Polina Vladimirovna",
        "product" : "Курс по VUE JS",
        "email" : "polly777@google.com",
        "phone" : "89253555555"
      },
      {
        "full_name" : "Stepanova Polina Vladimirovna",
        "product" : "Курс по JavaScript",
        "email" : "polly777@google.com",
        "phone" : ""
      },
      {
        "full_name" : "99 Pavel [//>>{}]",
        "product" : "Курс по VUE JS",
        "email" : "polly777@google.com",
        "phone" : ""
      },
      {
        "full_name" : "",
        "product" : "",
        "email" : "",
        "phone" : ""
      }
    ];

    // Получаем случ-ое число
    const randomIndex = Math.floor(Math.random() * testData.length);
    
    // Вернём случ. запись
    return TestDataFactory.createRecord(testData[randomIndex]);
  }
}

// const getTestData = function () {
//   // Тестовые данные
//   const testData = [
//     {
//       "full_name" : "Екатерина М",
//       "product" : "Курс по JavaScript",
//       "email" : "justkate@google.com",
//       "phone" : "89253458675"
//     },
//     {
//       "full_name" : "Екатерина М",
//       "product" : "Курс по VUE JS",
//       "email" : "justkate@google.com",
//       "phone" : "89253458675"
//     },
//     {
//       "full_name" : "Sofie Braz",
//       "product" : "Курс по WordPress",
//       "email" : "sofie@outlook.com",
//       "phone" : "89245600000"
//     },
//     {
//       "full_name" : "Alexander B",
//       "product" : "Курс по PHP",
//       "email" : "@mail.ru",
//       "phone" : "89253458675"
//     },
//     {
//       "full_name" : "Екатерина С",
//       "product" : "Курс по VUE JS",
//       "email" : "justkate@google",
//       "phone" : "89253458675"
//     },
//     {
//       "full_name" : "Анатолий",
//       "product" : "Курс по VUE JS",
//       "email" : "anatol@google.com",
//       "phone" : "89253458675"
//     },
//     {
//       "full_name" : "Stepanova Polina Vladimirovna",
//       "product" : "Курс по PHP",
//       "email" : "polly777@google.com",
//       "phone" : "89253555555"
//     },
//     {
//       "full_name" : "Stepanova Polina Vladimirovna",
//       "product" : "Курс по VUE JS",
//       "email" : "polly777@google.com",
//       "phone" : "89253555555"
//     },
//     {
//       "full_name" : "Stepanova Polina Vladimirovna",
//       "product" : "Курс по JavaScript",
//       "email" : "polly777@google.com",
//       "phone" : ""
//     },
//     {
//       "full_name" : "99 Pavel [//>>{}]",
//       "product" : "Курс по VUE JS",
//       "email" : "polly777@google.com",
//       "phone" : ""
//     },
//     {
//       "full_name" : "",
//       "product" : "",
//       "email" : "",
//       "phone" : ""
//     }
//   ];

//   // Метод возвращает случ. запись
//   const getRandom = function (testData) {
//     // Получаем случ-ое число
//     const randomIndex = Math.floor(Math.random() * testData.length);
    
//     // Вернём случ. запись
//     return testData[randomIndex];
//   }

//   const data = getRandom( testData );
//   return data;
// }

export { TestDataFactory }