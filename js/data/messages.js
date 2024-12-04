const MESSAGES = {
  ERROR : {
            unvalid_value : function () {
              return 'Ошибка: некорректный ввод.';
            },

            empty_value : function () {
              return 'Ошибка: запись не сохранена. Заполните все поля формы.';
            }
  },

  SUCCESS : {
              save : function () {
                return 'УспехЖ задача обновлена.'
              }
  }
}

export { MESSAGES };
// const TYPE = {
//   ERROR : 'error',
//   SUCCESS : 'success',
//   CANCEL : 'cancel',
// }

// const TEXT = {
//   SHORT : 'short_value',
//   EMPTY : 'empty_value',
//   UNVALID : 'unvalide_value',
// }
