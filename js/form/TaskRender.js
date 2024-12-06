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
    this.form = null;
    this.select = null;
    this.inputs = {};
    this.options = {};
    // this.noteWrapper = document.querySelector('#noteWrapper');
  }

  initTaskRender() {
    this.initFormElems();
  }

  initFormElems() {
    this.form = document.querySelector('#form'),
    this.select = this.form.querySelector('#product'),

    this.inputs = {
      full_name  : this.form.querySelector('#full_name'),
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

  getFormElems () {
    return {
      form : this.form,
      inputs : this.inputs,
      select : this.select
    }
  }
}

const render = new TaskRender();
export { render }
