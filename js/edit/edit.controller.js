import { EditFormRender } from './EditFormRender.js';
import { FormEdit } from './../module/form/FormEdit.js';

class Controller {
  constructor () {
    this.render = new EditFormRender();
    this.manager = new FormEdit();
  }

  setInit() {
    console.log( this.edit);
  }
}

const controller = new Controller();
controller.setInit();