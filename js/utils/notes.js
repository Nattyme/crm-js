import { NAMES } from '../config/config.js';

class Notes {
  constructor (wrapper, MESSAGES) {
    this.container = wrapper;

    if(!this.container){return 'Нет контейнера!'};
    this.MESSAGES = MESSAGES;

    this.errors = [];
    this.success = [];
  }
  
  setContainer(wrapperElement) {
    this.container = wrapperElement;
  }

  addError(type, content) {
    if (!type || !content) {
      console.log('Не получилось добавить ошибку. Нет параметра');
    }
    console.log(type);
    console.log(content);
    console.log(this.errors);
    this.removeNotes();
    console.log('После удаления', this.errors);
    
    this.errors.push({type: type, title: content});
    console.log(this.errors);
    this.getNote(type, content);
    
  }

  existErrors() {
    return this.errors.length > 0;
  }

  resetErrors() {
    this.errors = [];
  }

  getHTMLTmpl (className, text) {
    return  `
              <div class="alert ${className}" role="alert" data-note>
                ${text}
              </div>
            `;
  }

  getNote(type, text) {
    console.log(type);
    if(!this.container) return console.log('Нет контейнера');
   
    if(type === 'error') {
      let note = this.getHTMLTmpl('alert-danger', text);
      console.log(note);
      
      this.displayNote(note, this.container);
      console.log('here error');
      console.log(this.errors, 'massive errors');
      
      return;
    }
    if(type === 'success') {
      let note = this.getHTMLTmpl('alert-success', text);
      this.displayNote(note, this.container);
      console.log('here success');
      
      return;
    }
  }

  displayNote(note) {
    if(!note) return;
    this.container.insertAdjacentHTML('afterbegin', note);
  }

  findNotes () {
    return this.container.querySelectorAll('[data-note]');
  }

  removeNotes() {
    const notes = this.findNotes();
console.log('removing');

    if (notes) {
      notes.forEach(element => {
        element.remove();
      });
    }

    this.resetErrors();
 
  }
}

export { Notes };