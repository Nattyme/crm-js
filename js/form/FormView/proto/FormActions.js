class FormActions {
  constructor (form, select, inputs) {
    this.form = form;
    this.select = select;
    this.inputs = inputs;
  }
  
  /**
   * Получает значения из формы.
   * Пробегает все инпуты формы и возвращает объект с их значениями.
   * 
   * @returns {Object} Объект с данными из формы, где ключи — это имена полей формы, а значения — введённые данные.
   * @see Task
   */
  getFormData() {
    const form = new FormData(this.form);
 
    let formData = {}; // Объект для значений формы

    // Получим данные из полей
    for (let pair of form.entries()) {
      formData[pair[0]] = pair[1];
    }
    
    return formData;
  }

  /**
   * Устанавливает значения в форму.
   * Заполняет поля формы значениями из переданного объекта задачи.
   * 
   * @param {Object} task Объект задачи, который содержит данные для заполнения формы.
   * @param {string} task.full_name Полное имя пользователя.
   * @param {string} task.phone Номер телефона.
   * @param {string} task.email Адрес электронной почты.
   * @param {string} task.product Выбранный продукт.
   */
  setFormData (task) {
    const inputs = this.inputs; // инпуты формы
    const options = Array.from(this.select.options); // опции селекта

    // Установим значения в поля формы
    inputs.full_name.value = task.full_name;
    inputs.phone.value = task.phone;
    inputs.email.value = task.email;

    // Ищем нужную опцию в select и показываем её
    this.select.selectedIndex = options.findIndex( (element) => element.textContent === task.product);;
  }

  /**
   * Очищает все формы и сбрасывает выбранные значения в форме.
   * 
   * Этот метод очищает все поля ввода и сбрасывает значение выбранного элемента
   * в селекторе на первое значение по умолчанию.
   * 
   * @method resetForm
  */
  resetForm () {

    for ( const inputName in this.inputs) {
      this.inputs[inputName].value = '';    //  Очищаем инпуты
    }

    this.select.selectedIndex = 0;  // Сбросим селектор опций
  }

  /**
   * Метод для отображения ошибок.
   * @todo Реализовать отображение ошибок на форме.
   */
  setError() {

  }

}

export default FormActions;

