
// import { Formatter } from '../utils/formatter.js';

class EditFormRender  {
 constructor () {
  this.form = document.querySelector('#form');                          
  this.select = this.form.querySelector('#product');
  this.selectStatus = this.form.querySelector('#status');

  this.inputs =  {
    full_name  : this.form.querySelector('#name'),
    phone : this.form.querySelector('#phone'),
    email : this.form.querySelector('#email'),
  }

  this.taskId = this.setTaskId();      
 }
 
 getFormElements(){
  return {
    form : this.form,
    select : this.select,
    selectStatus : this.selectStatus,
    inputs : this.inputs,
    taskId : this.taskId
  }
 }

 setTaskId(id) {
  return id;
 }


}
// this.setFormData();
export { EditFormRender };