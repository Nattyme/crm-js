/**
 * Класс для управления задачами.
 * Позволяет добавлять, удалять, сохранять и загружать задачи.
 * 
 * @class TaskManager
 * @see {@link ./validate.js|Модуль валидации}
 * @see {@link ./model.js|Модуль }
 * @see {@link EventBus|EventBus - Объект для управления событиями}
 */
class TasksStorage {
  /**
   * Конструктор класса TaskManager.
   * Подключает обработку событий и загружает задачи из хранилища.
   *
   * @param {EventBus} eventBus - Экземпляр EventBus для управления событиями.
   */
  constructor (eventBus, storage, formatter) {
    // this.data = [];
    this.eventBus = eventBus; // общий EventBus
    this.storage = storage; // экз-р хранилища
    this.formatter = formatter;

  }

  // /**
  //  * Возвращает задачу по её ID.
  //  *
  //  * @method getData
  //  * @memberof TaskManager
  //  * @param {number} id - ID задачи.
  //  * @returns {Object|null} Возвращает задачу или null, если не найдено.
  //  */
  // findOneTask(id, allTaskData) {
  //   // В массиве data найдём нужную по ID
  //   let data = this.findTaskById(id, allTaskData);

  //   // Если ID не найден
  //   if (!data) return console.log(`Запись не найдена в ${this.data}`);

  //   return this.formatTaskData(data);  // Вернём запись
  // }

  // findTaskById(id, allTaskData){
  //   return allTaskData.find(task => task.id === Number(id) );
  // }

  // /**
  //  * Возвращает все задачи.
  //  *
  //  * @method getTaskAllData
  //  * @memberof TaskManager
  //  * @returns {Array} Массив всех задач.
  //  */
  // getAllTasksData() {
  //   return this.data;
  // }

  
  // updateSingleTaskData(taskUpdated) {
  
  //   const updatedTask = taskUpdated;
  //   if (!updatedTask || !updatedTask.id) {
  //     console.error("Нельзя обновить задачу", updatedTask);
  //     return
  //   }

  //   const taskIndex = this.data.findIndex(task => task.id === updatedTask.id);

  //   if (taskIndex !== -1) {
  //     this.data[taskIndex] = updatedTask; // Обновление статуса задачи в массиве
  //     this.eventBus.emit(NAMES.TASKS_SAVE, updatedTask); // Сохраненеи измен-ий
  //   } else {
  //     console.error("Задача с указанным id не найдена:", updatedTask.id);
  //   }
  //   return updatedTask;

  // }

  // /**
  //  * Добавляет новую задачу.
  //  *
  //  * @method addNewTask
  //  * @memberof TaskManager
  //  * @param {number} id - ID новой задачи.
  //  * @param {Object} record - Данные задачи.
  //  * @returns {Object|null} Добавленную задачу или null в случае ошибки.
  //  */
  // addNewTask(record) {
  //   let recordValid = this.taskFieldValidate(record);
    
  //   if(recordValid) {
  //     this.data.push(recordValid); 
  //     this.eventBus.emit(NAMES.TASKS_SAVE, recordValid); 
  
  //     return recordValid;
  //   }
   
  // }

  // fieldsOfTaskObj(taskObj, checkFieldsArray) {
  //   // Ищем пустые знач-я
  //   for ( const field in record) {
  //     if ( record[field] === null || record[field] === undefined) {
  //       console.log('Ошибка данных. Запись не добавлена.');
  //       return;
  //     }
  
  //   }
    
  //   // Список полей для проверки
  //   const checkValues = ['full_name', 'phone', 'email'];
    
  //   // Проверяем только указанные поля
  //   for (const field of checkValues) {
  //       if (!(field in record)) {
  //           console.log(`Ошибка: отсутствует поле ${field}. Запись не добавлена.`);
  //           return;
  //       }

  //       // Проверяем значение 
  //       const validationMethod = validate[field];

  //       if (validationMethod) {
  //           const validationResult = validationMethod(record[field]);
            
  //           if (!validationResult.valid) {
  //               console.log(`Ошибка в поле ${field}`);
  //               return;
  //           }

  //           // Обновляем значение поля на валидированное
  //           record[field] = validationResult.value;
            
  //           return record;
  //       } 
  //   }
  // }

 
  


 



  // formatTaskData (taskData) {
  //   const dataCopy = {...taskData};     // Копия объекта задачи
  //   dataCopy.date = this.formatDateTime( dataCopy.timestamp, 'date-time'); // Cв-во 'дата' в нужно формате

  //   return dataCopy;  // Вернём запись
  // }

  // formatDateTime (timestamp, type = 'date') {
  //   if (type === 'date') {
  //     return this.formatter.formatDate(timestamp);
  //   }

  //   if (type === 'date-time') {
  //     return this.formatter.formatDateTime(timestamp);
  //   }
  // }
 

}

export { TasksStorage };