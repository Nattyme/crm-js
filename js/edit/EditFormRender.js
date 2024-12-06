class EditFormRender  {
 constructor () {
    this.formElems = {}; 
    this.noteWrapper = null;
 }

  initEditFormRender() {
  this.setFormElements();
  this.setNoteWrapper();
  }

  setFormElements(){
  this.formElems.form = document.querySelector('#form');
  this.formElems.id = this.formElems.form.querySelector('#number');
  this.formElems.date = this.formElems.form.querySelector('#date');
  this.formElems.select = this.formElems.form.querySelector('#product');
  this.formElems.selectStatus = this.formElems.form.querySelector('#status');
  this.formElems.inputs.full_name  = this.form.querySelector('#full_name');
  this.formElems.inputs.phone = this.form.querySelector('#phone');
  this.formElems.inputs.email = this.form.querySelector('#email');
  }
  getFormElements(){
    return this.formElems;
  }


  setNoteWrapper () {
    this.noteWrapper = this.form.querySelector('.form__buttons');
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

 
}

const renderEditForm = new EditFormRender();

export { renderEditForm };