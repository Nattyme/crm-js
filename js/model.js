const getTestDate = function () {
  const testData = [ 
    {
      id : 1,
      date : '26-11-2024',
      product : 'php курс',
      name : 'Екатерина',
      email : 'justkate@google.com',
      phone : '89253458675',
    }, 
    {}
  ];

  const getRandomInt = function (testData) {
    const randomIndex = Math.floor(Math.random * (testData.length-1));
    return randomIndex;
  }

  const randomIndex = getRandomInt(testData);

  const randomData = testData[randomIndex];
}