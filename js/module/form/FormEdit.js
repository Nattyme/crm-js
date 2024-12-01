
import { Formatter } from '../../utils/formatter.js';
import FormActions from './FormActions.js';

class FormEdit extends FormActions {
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

 /**
 * Получает ID задачи из строки запроса URL.
 * Если ID не найден, выводит сообщение об ошибке.
 *
 * @returns {number|null} Возвращает ID задачи, если он найден, или null, если ID не найден.
 */
 setTaskId () {
  return this.getTaskID();
 }

 getTaskID () {
  const formatter = new Formatter();

  // получим и вернём id задачи
  if ( formatter.getUrlID() !== null ) {
    return formatter.getUrlID();
  } else {
    console.log('Не получен ID задачи'); 
    return null;
  }
 }

 getTask(id) {
 
 }

 setFormTaskValue() {
  console.log(this);
  const id = getTaskID();
  const taskData = getTask(id);
  console.log(taskData);
 }


}
// this.setFormData();
export { FormEdit };