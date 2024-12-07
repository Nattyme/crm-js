class TaskEditManager {
  createDataCopyFormatted (taskData) {
    const dataCopy = {...taskData};     // Копия объекта задачи
    dataCopy.date = this.formatDateTime( dataCopy.timestamp, 'date-time'); // Cв-во 'дата' в нужно формате

    return dataCopy;  // Вернём запись
  }

  tasksPrepareDisplay (taskDataAll) {
    return formatter.formatPrepareDisplayTask(taskDataAll); 
  }

  // formatDateTime (timestamp, type = 'date') {
  //   if (type === 'date') {
  //     return formatter.formatDate(timestamp);
  //   }

  //   if (type === 'date-time') {
  //     return formatter.formatDateTime(timestamp);
  //   }
  // }
}

export { TaskEditManager };