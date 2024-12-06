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







 

  updateNoteWrapper (content) {
    this.noteWrapper.textContent = content;
  }

  getIdValue() {
    return this.id.value;
  }
  setIdValue(id) {
    this.id = id;
  }


  getDateValue() {
    return this.date.value;
  }
  setDateValue(value) {
    this.value = value;
  }

  getInputValues() {
    return {
      full_name : this.full_name,
      phone : this.phone,
      email : this.email
    }
  }
  setInputValues( {full_name, phone, email} ) {
    if (full_name !== undefined) this.inputs.full_name.value = full_name;
    if (phone !== undefined) this.inputs.phone.value = phone;
    if (email !== undefined) this.inputs.email.value = email;
  }

  getProductSelect() {
    return this.select;
  }

  getStatusSelect() {
    return this.selectStatus;
  }
  setSatusValue(statusNew) {
    this.selectStatus.selectedindex = statusNew;
  }

  setFormValues ( {id, date, select, selectStatus, inputs}) {
    if (id !== undefined) this.setTaskId(id);
    if (date !== undefined) this.setDateValue(date);
    if (select !== undefined) this.select.value = select;
    if (selectStatus !== undefined) this.selectStatus.value = selectStatus;
    if (inputs) this.setInputValues(inputs);
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

const renderEditForm = new EditFormRender();

export { renderEditForm };