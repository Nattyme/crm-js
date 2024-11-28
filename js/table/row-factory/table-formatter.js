class tableDataFormatter {
  static fieldGetReady () {
    return {
      phone : (phoneNumber) => {
        const phone = phoneNumber.replace(/\D/g, '');

        if (phone.length === 11 && phone[0] === '8') {
          // Заменяем 8 на 7
          return phone.replace(/^8(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($1) $2-$3-$4');
        } else {
          console.log('Неверный номер');
          return null;
        }
      },

      name : (fullName) => {
        return fullName.split(' ').slice(0, 2).join(' ');
      },

      urlID : (url) => {
        const uri = url.split('?')[1]; // строка с парам-ми из url

        if ( !uri ) {
          console.log('В url нет параметров');
          return null;
        }

        const params = new URLSearchParams(uri);
        const id = params.get('id'); // найдем знач-е id в подстроке
    
        // Проверим, что парам-р в ссылке - id
        if ( !id ) {
          console.log('В параметре ID нет значения.');
          return null;
        }
  
         return id;
      }
    }
  }
}

export { tableDataFormatter };