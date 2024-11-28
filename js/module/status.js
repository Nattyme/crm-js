/**
 * Класс `Status` представляет статусы задач с их типами и описаниями.
 */
class Status {
  constructor () {
    this.status = {
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
  }

  getStatusData () {
    return this.status;
  }
  
  /**
   * Возвращает данные статуса по его имени.
   * @param {string} name - Имя статуса.
   * @returns {Object|null} Данные статуса или `null`, если статус не найден.
   */
  getStatus(name) {
    for (let type in this.types) {
      return name === type ? this.types[type] : null;
    }
  }

}

export { Status };