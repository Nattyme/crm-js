class EditFormRender  {
 constructor () {
  this.form = document.querySelector('#form'); 
  this.noteWrapper = this.form.querySelector('.form__buttons');
  this.date = this.form.querySelector('#date');
  this.id = this.form.querySelector('#number');          
  this.select = this.form.querySelector('#product');
  this.selectStatus = this.form.querySelector('#status');

  this.inputs =  {
    full_name  : this.form.querySelector('#full_name'),
    phone : this.form.querySelector('#phone'),
    email : this.form.querySelector('#email'),
  }
 }
 
 getFormElements(){
  return {
    form : this.form,
    noteWrapper : this.noteWrapper,
    id : this.id,
    date : this.date,
    select : this.select,
    selectStatus : this.selectStatus,
    inputs : this.inputs
  }
 }

}
// this.setFormData();
export { EditFormRender };