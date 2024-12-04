class FormManager {
  constructor ({form, select, inputs, formatter}) {
    this.form = form;
    this.select = select;
    this.inputs = inputs;
    this.formatter = formatter;
  }
  
  /**
   * Получает значения из формы.
   * Пробегает все инпуты формы и возвращает объект с их значениями.
   * 
   * @returns {Object} Объект с данными из формы, где ключи — это имена полей формы, а значения — введённые данные.
   * @see Task
   */
  getFormData(formElement) {
    const formDataObj = new FormData(formElement);
    let formData = {}; // Объект для значений формы

    // Получим данные из полей
    for (let pair of formDataObj.entries()) {
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
  setFormData (task, elems) {    
    // Установим значения в поля формы
    elems.inputs.full_name.value = task.full_name || null;
    elems.inputs.phone.value = task.phone || null;
    elems.inputs.email.value = task.email || null;
    let options = elems.select.options || null;

    // Ищем нужную опцию в select и показываем её
    elems.select.selectedIndex = Array.from(options).findIndex( (element) => {
      return element.value === task.product; 
    });

    if(elems.select.selectedIndex === -1) { console.log('Не удалось задать select. Продукт не найден')}

  }

  /**
   * Очищает все формы и сбрасывает выбранные значения в форме.
   * 
   * Этот метод очищает все поля ввода и сбрасывает значение выбранного элемента
   * в селекторе на первое значение по умолчанию.
   * 
   * @method resetForm
  */
  resetForm (formElement) {
    formElement.reset();
  }

  prepareDisplay (taskData) {
    return {
      ...taskData,
      phone : this.formatter.formatPhone(taskData.phone),
      full_name : this.formatter.formatName(taskData.full_name)
    }
    
  }

}

export { FormManager };


