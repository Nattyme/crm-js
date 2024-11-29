/**
 * Класс для форматирования данных, таких как телефон, имя и URL.
 */
class tableDataFormatter {
  /**
 * Возвращает объект с методами для форматирования полей данных.
 * @returns {Object} Объект с методами для обработки данных.
 */
  static fieldGetReady () {
    return {
      /**
     * Форматирует номер телефона в формат '+7 (XXX) XXX-XX-XX'.
     * @param {string} phoneNumber - Номер телефона.
     * @returns {string|null} Отформатированный номер телефона или `null`, если номер неверный.
     */
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

      /**
       * Обрезает полное имя до имени и фамилии.
       * @param {string} fullName - Полное имя.
       * @returns {string} Имя и фамилия.
       */
      name : (fullName) => {
        return fullName.split(' ').slice(0, 2).join(' ');
      },

      /**
       * Извлекает параметр `id` из URL.
       * @param {string} url - URL-адрес.
       * @returns {string|null} Значение параметра `id` или `null`, если параметр не найден.
       */
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