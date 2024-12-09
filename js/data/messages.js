const MESSAGES = {
  ERROR : {
            unvalid_value : function (value) {
              return `Ошибка: некорректный ввод.`;
            },

            empty_value : function () {
              return 'Ошибка: запись не сохранена. Заполните все поля формы.';
            }
  },

  SUCCESS : {
              save : function () {
                return 'Успех: задача обновлена.'
              }
  }
}

export { MESSAGES };

