/**
 * Класс для создания тестовых данных.
 * Этот класс генерирует случайные записи для тестирования с использованием заранее подготовленных данных.
 * 
 * @class
 * @see TaskManager
 */
class TestDataFactory {
  /**
   * Создаёт объект задачи на основе переданных данных.
   * 
   * @param {Object} data Данные для создания записи.
   * @param {string} data.full_name Полное имя пользователя.
   * @param {string} data.product Продукт или курс.
   * @param {string} data.email Адрес электронной почты.
   * @param {string} data.phone Номер телефона.
   * 
   * @returns {Object} Объект задачи, содержащий данные для заполнения формы.
   * @see TaskRender#setValue
   */
  static createRecord (data) {
    return {
      full_name : data.full_name,
      product : data.product,
      email : data.email,
      phone : data.phone
    };
  }

  /**
   * Возвращает случайную запись из предустановленных тестовых данных.
   * Этот метод выбирает случайный элемент из массива и создаёт объект записи с использованием метода {@link TestDataFactory#createRecord}.
   * 
   * @returns {Object} Случайно выбранный объект задачи.
   * @see TestDataFactory#createRecord
   */
  static createRandomRecord () {
     // Тестовые данные
    const testData = [
      {
        "full_name" : "Elena Aurgas",
        "phone" : "89253458675",
        "email" : "helen@google.com",
        "product" : "Курс по JavaScript"
      },
      {
        "full_name" : "Екатерина М",
        "phone" : "89253458675",
        "email" : "justkate@google.com",
        "product" : "Курс по VUE JS"
      },
      {
        "full_name" : "Sofie Braz",
        "phone" : "89245600000",
        "email" : "sofie@outlook.com",
        "product" : "Курс по WordPress",
      },
      {
        "full_name" : "Alexander B",
        "phone" : "89253458675",
        "email" : "al@mail.ru",
        "product" : "Курс по PHP",
      },
      {
        "full_name" : "Екатерина С",
        "phone" : "89253458675",
        "email" : "justkate@google.com",
        "product" : "Курс по VUE JS"
      },
      {
        "full_name" : "Анатолий Ш",
        "phone" : "89253458675",
        "email" : "anatol@google.com",
        "product" : "Курс по VUE JS",
      },
      {
        "full_name" : "Stepanova Polina Vladimirovna",
        "phone" : "89253555555",
        "email" : "polly777@google.com",
        "product" : "Курс по PHP"
      },
      {
        "full_name" : "Stepanova Polina Vladimirovna",
        "phone" : "89253555555",
        "email" : "polly777@google.com",
        "product" : "Курс по VUE JS"
      },
      {
        "full_name" : "Ivan Ivanov Ivanovuch",
        "phone" : "89253555555",
        "email" : "vanya@google.com",
        "product" : "Курс по JavaScript",
      },
      {
        "full_name" : "Pavel Nerezov",
        "phone" : "89253555555",
        "email" : "pn@google.com",
        "product" : "Курс по VUE JS"
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