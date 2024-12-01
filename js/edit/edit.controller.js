import { EditFormRender } from './EditFormRender.js';
import { FormEdit } from './../module/form/FormEdit.js';

class Controller {
  constructor () {
    this.render = new EditFormRender();
    this.manager = new FormEdit();

    // Получим элем-ты формы из render
    const {form, select, selectStatus, inputs} = this.render.getFormElements();
    // Передадим менеджеру
    this.manager.initializeForm(form, select, selectStatus, inputs); // Передадим элем. формы
  }

  setInit() {
    console.log( this.render);
    console.log( this.manager);
  }
}

const controller = new Controller();
controller.setInit();