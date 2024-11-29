/**
 * Класс для рендеринга формы задачи.
 * Этот класс управляет взаимодействием с формой, включая получение и установку значений, а также работу с ошибками.
 * 
 * @class
 * @see TaskManager
 */
class TaskRender {
  /**
   * Создаёт экземпляр класса TaskRender.
   * Находит форму и элементы формы на странице.
   * @constructor
   */
  constructor () {
    this.form = document.querySelector('#form'),
    this.select = this.form.querySelector('#product'),
    this.inputs = {
      full_name  : this.form.querySelector('#name'),
      phone : this.form.querySelector('#phone'),
      email : this.form.querySelector('#email'),
    }
    this.options = {
      html : this.select.querySelector('[value = "course-html"]'),
      js   : this.select.querySelector('[value = "course-js"]'),
      vue  : this.select.querySelector('[value = "course-vue"]'),
      php  : this.select.querySelector('[value = "course-php"]'),
      wp  : this.select.querySelector('[value = "course-wordpress"]'),
    }
  }
  
  /**
   * Получает значения из формы.
   * Пробегает все инпуты формы и возвращает объект с их значениями.
   * 
   * @returns {Object} Объект с данными из формы, где ключи — это имена полей формы, а значения — введённые данные.
   * @see Task
   */
  getFormData() {
    const inputs = this.inputs; // инпуты формы
    let formData = {}; // Объект для значений формы

    // Обойдём каждый инпут и получим значения. Добавим в formData
    for (const data in inputs) {
      const input = inputs[data]; 
      formData[data] = input.value;
    }

    const selectedProduct = this.select.options[ this.select.selectedIndex ]; // получем выбранную опцию

    // запишем текст опции селекта в formData
    formData[this.select.name] = selectedProduct.textContent; 

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

export { TaskRender }
