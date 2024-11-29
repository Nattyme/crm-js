/**
 * Класс для управления статусами задач.
 * Обеспечивает доступ к данным статусов, их обновление и хранение в единственном экземпляре.
 */
class Status {
  constructor () {

    // Если экз-р уже был создан - то всегда получаем только его
    if ( Status.istance ) {
      return Status.istance;
    }

    // Данные о статусах.
    this.data = {
        NEW :   {
                  key: 'new',
                  text : 'Новый',
                  class : 'badge-danger'
                },
        DOING : { 
                  key: 'processing',
                  text : 'В работе',
                  class : 'badge-warning'
                },
    
        DONE : {
                  key: 'completed',
                  text : 'Завершенный',
                  class : 'badge-success'
                }
    };

    // Сохраняем экземпляр в статическое свойство для повторного использования.
    Status.istance = this; 
  }

  /**
   * Получает все данные о статусах.
   * @returns {Object} Все статусы.
   */
  getStatusData () {
    return this.data;
  }
  
  /**
   * Возвращает данные статуса по его имени.
   * @param {string} name - Имя статуса.
   * @returns {Object|null} Данные статуса или `null`, если статус не найден.
   */
  getStatus(name) {
    return this.data[name] || null;
  }

  /**
   * Устанавливает новые данные для статуса.
   * @param {string} name - Имя статуса.
   * @param {Object} statusData - Данные нового статуса.
  */
  setStatus (name, statusData) {
    if (this.data[name] ) {
      this.data[name] = statusData;
    } else {
      console.log('Статус не найден');
      return;
    }
  }

}

export { Status };