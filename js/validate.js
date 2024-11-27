const validate = {

  // Метод проверяет знач-е поля name
  name(full_name) {
    // if(!full_name) {
    //   return {
    //     valid : false,
    //     error : 'Ошибка.Поле full_name пустое или некорректно заполнено'
    //   };
    // } 
 

    const nameValid = String(full_name).trim(); // Преобразуем в строку, удалим пробелы
    
    const nameRegex = /^[a-zA-Za-яА-ЯёЁ]+[\s][a-zA-Za-яА-ЯёЁ]+$/; // Если пользователь ввел фамилию и имя
    const threeNameRegex = /^[a-zA-Za-яА-ЯёЁ]+[\s][a-zA-Za-яА-ЯёЁ]+[\s][a-zA-Za-яА-ЯёЁ]+$/; // Если пользователь ввёл ФИО
    console.log('Name after trim:', nameValid);
    console.log('Regex 2 words match:', nameRegex.test(nameValid));
    console.log('Regex 3 words match:', threeNameRegex.test(nameValid));
    // Проверка на пустую строку
    if( nameValid === '' ) {
      return {
        valid: false, 
        error: 'Ошибка. Пустое поле имени' 
      } 
    }  

    // Проверка на рег. выражения
    if( !nameRegex.test(nameValid) && !threeNameRegex.test(nameValid)) {
      console.log(nameValid);
      console.log('unvalid');
      return {
        valid: false, 
        error: 'Ошибка. Неверный формат имени. Введите имя и фамилию в текстовом формате.'
      } 
    } 
    
    // Если всё ок 
    return {valid: true, value : nameValid};
  },

  // Метод проверяет знач-е поля phone
  phone(phone) {
    const phoneValid = String(phone).trim(); // Преобразуем в строку, удалим пробелы
    const phoneRegex = /^\+?[0-9\s\-()]{11,}$/; // Проверка номера

    // Проверка на пустую строку
    if( phone === '') {
      return {valid : false, error : console.log('Ошибка. Пустое поле телефона')};
    }

    // Проверка NaN и рег.выражения
    if (isNaN(phoneValid) || !phoneRegex.test(phoneValid)) {
      return {valid : false, error : console.log('Ошибка. Неверный формат номера телефона')};
    } 

    // Если всё ок 
    return {valid: true, value : phoneValid};
  },

  // Метод проверяет знач-е поля email
  email(email) {
    const emailValid = String(email).trim(); // Преобразуем в строку, удалим пробелы

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/; // Общий формат email
    const emailRegexParts = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; // Проверка на имя, один символ @ и домен

    // Проверка на пустую строку
    if (emailValid === '') {
      return {valid: false, error : 'Ошибка. Поле email не должно быть пустым'
      };
    }

    // Проверка на макс. длинну
    if ( emailValid.length > 320 ) {
      return {valid: false, error : 'Ошибка. Значение поля email слишком длинное.'};
    };

    // Проверка на рег. выражение 
    if ( !emailRegex.test(emailValid) ) {
      return {valid: false, error : 'Ошибка. Недопустимые символы в поле email.'};
    }

    // Проверка на рег. выражение имени и домена
    if ( !emailRegexParts.test(emailValid) ) {
      return {valid: false, error : 'Ошибка. Неверный формат email.'};
    };

    // Если всё ок 
    return {valid: true, value : emailValid};
  }
}

export { validate }