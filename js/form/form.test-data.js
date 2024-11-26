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
      "full_name" : "Екатерина М",
      "product" : "php курс",
      "email" : "justkate@google.com",
      "phone" : "89253458675"
    },
    {
      "full_name" : "Sofi Braz",
      "product" : "js курс",
      "email" : "sofi@outlook.com",
      "phone" : "89245600000"
    },
    {
      "full_name" : "Alexander B",
      "product" : "html курс",
      "email" : "@mail.ru",
      "phone" : "89253458675"
    },
    {
      "full_name" : "Екатерина С",
      "product" : "php курс",
      "email" : "justkate@google",
      "phone" : "89253458675"
    },
    {
      "full_name" : "Анатолий",
      "product" : "php курс",
      "email" : "anatol@google.com",
      "phone" : "89253458675"
    },
    {
      "full_name" : "Stepanova Polina Vladimirovna",
      "product" : "php курс",
      "email" : "polly777@google.com",
      "phone" : "89253555555"
    },
    {
      "full_name" : "Stepanova Polina Vladimirovna",
      "product" : "кулинарный курс",
      "email" : "polly777@google.com",
      "phone" : "89253555555"
    },
    {
      "full_name" : "Stepanova Polina Vladimirovna",
      "product" : "кулинарный курс",
      "email" : "polly777@google.com",
      "phone" : ""
    },
    {
      "full_name" : "99 Pavel [//>>{}]",
      "product" : "кулинарный курс",
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

export { getTestData }