class TaskRender {
  constructor () {
    this.form = document.querySelector('#form'),
    this.select = this.form.querySelector('#product'),
    this.inputs = {
      name  : this.form.querySelector('#name'),
      phone : this.form.querySelector('#phone'),
      email : this.form.querySelector('#email'),
      email : this.form.querySelector('#email')
    }
    this.options = {
      html : this.select.querySelector('[value = "course-html"]'),
      js   : this.select.querySelector('[value = "course-js"]'),
      vue  : this.select.querySelector('[value = "course-vue"]'),
      php  : this.select.querySelector('[value = "course-php"]'),
      wp  : this.select.querySelector('[value = "course-wordpress"]'),
    }
  }
  
  // Метод получает значения из формы
  getValue() {
    let inputs = this.inputs; // Инпуты формы
    let formData = {}; // Объект для значений формы

    // Обойдём каждый инпут и получим значения. Добавим в formData
    for (const data in inputs) {
      const input = inputs[data];
      formData[data] = input.value;
    }

    return formData;
  }

  // Метод устанавливает значения в форму
  setValue(task) {
    const inputs = this.inputs; // инпуты формы
    const options = this.options; // опции селекта

    // Установим значения в поля формы
    inputs.name.value = task.full_name;
    inputs.phone.value = task.phone;
    inputs.email.value = task.email;

    let selectedProduct; // Переменная для выбранного продукта

    // Обойдем селект и найдем нужный продукт. 
    for (const item in options) {
      const option = options[item];
      if (option.textContent === task.product) {
        selectedProduct = option;
      }
    }

    // Установим для него атрибут selected
    selectedProduct.setAttribute('selected', '');
  }

  // Метод показывает ошибки
  setError() {

  }
}



export { TaskRender }
