import { FormEdit } from './Edit.view.js';

class Controller {
  constructor () {
    this.edit = new FormEdit();
  }

  setInit() {
    console.log( this.edit);
  }
}

const controller = new Controller();
controller.setInit();