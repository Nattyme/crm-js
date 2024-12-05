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

  addNote(type, content) {
    if (!type || !content) {
      return console.log('Не получилось добавить ошибку. Нет параметра');
    }

    this.removeNotes();


    if(type === 'error') {
      this.errors.push({type: type, title: content});
    }

    if ( type === 'success' && !this.errors.length > 0) {
      this.success.push({type: type, title: content});
    }

    this.getNote(type, content);
  }

  existErrors() {
    return this.errors.length > 0;
  }

  resetNotes () {
    this.errors = [];
    this.success = [];
  }

  getHTMLTmpl (className, text) {
    return  `
              <div class="alert ${className}" role="alert" data-note>
                ${text}
              </div>
            `;
  }

  getNote(type, text) {
    let note;
    if(!this.container) return console.log('Нет контейнера');
   
    if(type === 'error') {
      note = this.getHTMLTmpl('alert-danger', text);
    }
    if(type === 'success') {
      note = this.getHTMLTmpl('alert-success', text);
    }

    this.displayNote(note, this.container);
    return;
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

    if (notes) {
      notes.forEach(element => {
        console.log('удалено:', element);
        
        element.remove();
      });
    }

    this.resetNotes();
  }
}

export { Notes };