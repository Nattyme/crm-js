class TaskRender {
  constructor () {
    this.form = document.querySelector('#form'),
    this.inputs = {
       name : this.form.querySelector('#name'),
      phone : this.form.querySelector('#phone'),
      email : this.form.querySelector('#email'),
      product : this.form.querySelector('#product'),
      email : this.form.querySelector('#email')
    }
  }
  

  setValue() {

  }

  setError() {

  }
// getValue({form :, email})
  getValue() {
    let inputs = this.inputs;
    
    let formData = {};

    for (const data in inputs) {
      const input = inputs[data];
      formData[data] = input.value;
    }

    return formData;
  }
}

const taskRender = new TaskRender();
let array = taskRender.getValue();
console.log(array);
