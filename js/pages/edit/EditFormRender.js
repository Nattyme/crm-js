class EditFormRender  {
 constructor () {
    this.formElems = {}; 
    this.formElems.inputs = {}
    this.noteWrapper = null;
 }

  // Задает значения элементов в конструктор
  initFormEdit() {
    this.formElements = {
      form: document.querySelector('#form') || null,
      id : document.querySelector('#number') || null,
      date : document.querySelector('#date') || null,
      select: document.querySelector('#product') || null,
      selectStatus: document.querySelector('#status') || null,
      inputs: {
        full_name: document.querySelector('#full_name') || null,
        email: document.querySelector('#email') || null,
        phone: document.querySelector('#phone') || null,
      }
    };
    this.noteWrapper = document.querySelector('.form__buttons');
  }

  getFormElems(){
    this.initFormEdit();
    return this.formElements;
  }

  getNoteWtapper() {
    return this.noteWrapper;
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
    this.selectStatus.selectedIndex = statusNew;
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