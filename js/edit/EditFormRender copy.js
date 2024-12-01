
// import { Formatter } from '../utils/formatter.js';
import FormActions from '../module/form/FormActions.js';

class EditFormRender extends FormActions {
 constructor (form, select, selectStatus, inputs) {
  super( form, select, selectStatus, inputs );                  // Вызовем констр-р род. класса и передадим ему парам-ры

  this.form = document.querySelector('#form');                // Теперь можно исполз-ть 'this'. Надём форму на текущ. странице            
  this.select = this.form.querySelector('#product');
  this.selectStatus = this.form.querySelector('#status');

  this.inputs =  {
    full_name  : this.form.querySelector('#name'),
    phone : this.form.querySelector('#phone'),
    email : this.form.querySelector('#email'),
  }

  this.taskId = this.setTaskId();                     // Установим ID задачи 
 }
}
// this.setFormData();
export { FormEdit };