/**
 * Класс `Status` представляет статусы задач с их типами и описаниями.
 */
class Status {
  constructor () {

    // Если экз-р уже был создан - то всегда получаем только его
    if ( Status.istance ) {
      return Status.istance;
    }

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

    Status.istance = this; // Сохрн. экзем-р в стат. св-ве
  }

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