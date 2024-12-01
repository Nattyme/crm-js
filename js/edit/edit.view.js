
import { Formatter } from './../utils/formatter.js';
import FormActions from './../form/FormView/proto/FormActions.js';

class FormEdit extends FormActions {
 constructor (form, select, inputs) {
  super( form, select, inputs );                      // Вызовем констр-р род. класса
  this.form = document.querySelector('#form');        // Теперь можно исполз-ть 'this'. Надём форму на текущ. странице            
  this.select = this.form.querySelector('#status');
  this.taskId = this.setTaskId();                     // Установим ID задачи 
 }

 setTaskId () {
  const formatter = new Formatter();
  const id = formatter.getUrlID();
  console.log(id);
  // console.log(uriLastParam);
  
 }
}

export { FormEdit };