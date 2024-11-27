class TaskRender {
  constructor () {
    this.form = document.querySelector('#form'),
    this.select = this.form.querySelector('#product'),
    this.inputs = {
      full_name  : this.form.querySelector('#name'),
      phone : this.form.querySelector('#phone'),
      email : this.form.querySelector('#email'),
      product : this.form.querySelector('#product')
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
  getValues() {
    let inputs = this.inputs; // Инпуты формы
    console.log('all input: ', inputs);
    let formData = {}; // Объект для значений формы

    // Обойдём каждый инпут и получим значения. Добавим в formData
    for (const data in inputs) {
      const input = inputs[data];
      console.log('input: ', input);
      console.log('input data: ', input[data]);
      console.log('input value: ', input.value);
      
      formData[data] = input.value;
    }

    return formData;
  }

  // Метод устанавливает значения в форму
  setValue(task) {
    const inputs = this.inputs; // инпуты формы
    const options = this.options; // опции селекта

    // Установим значения в поля формы
    inputs.full_name.value = task.full_name;
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
