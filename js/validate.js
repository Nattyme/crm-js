const validate = {
  // Метод проверяет знач-е поля name
  name(full_name) {
    const nameValid = String(full_name).trim();
    const nameRegex = /^[a-zA-Za-яА-ЯёЁ]+\s[a-zA-Za-яА-ЯёЁ]+$/;
    const threeNameRegex = /^[a-zA-Za-яА-ЯёЁ]+\s[a-zA-Za-яА-ЯёЁ]+\s[a-zA-Za-яА-ЯёЁ]+$/;

    if( nameValid === '' ) {
      return {
        valid: false, 
        error: 'Ошибка. Пустое поле имени' 
      } 
    }  

    if( !nameRegex.test(nameValid) && !threeNameRegex.test(nameValid)) {
      return {
        valid: false, 
        error: 'Ошибка. Неверный формат имени. Введите имя и фамилию в текстовом формате.'
      } 
    } 
    
    return {valid: true, value : nameValid};
  },

  // Метод проверяет знач-е поля phone
  phone(phone) {
    const phoneValid = String(phone).trim();
    const phoneRegex = /^\+?[0-9\s\-()]{10,}$/;
  
    if( phone === '') {
      return {valid : false, error : console.log('Ошибка. Пустое поле телефона')};
    }

    if (isNaN(phoneValid) || !phoneRegex.test(phoneValid)) {
      return {valid : false, error : console.log('Ошибка. Неверный формат номера телефона')};
    } 
  
    return {valid: true, value : phoneValid};
  },

  // Метод проверяет знач-е поля email
  email(email) {
    const emailValid = String(email).trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const emailRegexParts = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (emailValid === '') {
      return {valid: false, error : 'Ошибка. Поле email не должно быть пустым'
      };
    }
    if ( emailValid.length > 320 ) {
      return {valid: false, error : 'Ошибка. Значение поля email слишком длинное.'};
    };
    if ( !emailRegex.test(emailValid) ) {
      return {valid: false, error : 'Ошибка. Недопустимые символы в поле email.'};
    }
    if ( !emailRegexParts.test(emailValid) ) {
      return {valid: false, error : 'Ошибка. Неверный формат email.'};
    };
    
    return {valid: true, value : emailValid};
  }

}

export { validate }