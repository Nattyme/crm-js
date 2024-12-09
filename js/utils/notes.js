class Notes {
  constructor (wrapper) {
    this.container = wrapper;

    if(!this.container){return 'Нет контейнера!'};

    this.errors = [];
    this.success = [];
  }
  
  setContainer(wrapperElement) {
    this.container = wrapperElement;
  }
  
  existErrors() {
    return this.errors.length > 0;
  }


  addNote(type, content) {
    if (!type || !content) {
      return console.log('Не получилось добавить ошибку. Нет параметра');
    }

    this.removeNotes();


    if(type === 'error') {
      this.errors.push({type: type, title: content});
    }

    if ( type === 'success' && !this.errors.length) {
      this.success.push({type: type, title: content});
    }

    this.getNote(type, content);
  }

  displayNote(note) {
    if(!note) return;
    this.container.insertAdjacentHTML('afterbegin', note);
  }

  
  findNotes () {
    return this.container.querySelectorAll('[data-note]');
  }


  resetNotes () {
    this.errors = [];
    this.success = [];
  }

  removeNotes() {
    const notes = this.findNotes();

    if (notes) {
      notes.forEach(element => {  
        element.remove();
      });
    }

    this.resetNotes();
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
   
    if(type === 'error') {
      note = this.getHTMLTmpl('alert-danger', text);
    }
    if(type === 'success') {
      note = this.getHTMLTmpl('alert-success', text);
    }

    this.displayNote(note, this.container);
    return;
  }
}

export { Notes };