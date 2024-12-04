class Notes {
  constructor () {
    this.container = this.setContainer();
    if(!this.container) console.log('Нет контейнера!');
  }
  
  setContainer(wrapperElement) {
    this.container = wrapperElement;
  }

  getHTMLTmpl (className, text) {
    return  `
              <div class="alert ${className}" role="alert" data-note>
                ${text}
              </div>
            `;
  }

  getNote(type, text) {
    if(type === 'error') {
      let note = this.getHTMLTmpl('alert-danger', text);
      this.displayNote(note, this.container)
    }
    if(type === 'success') {
      let note = this.getHTMLTmpl('alert-success', text);
      this.displayNote(note, this.container)
    }
  }

  displayNote(note) {
    this.removeNote();
    this.container.insertAdjacentHTML('afterbegin', note);
  }

  findNotes () {
    return this.container.querySelectorAll('[data-note]');
  }

  removeNote() {
    const notes = this.findNotes();

    if (notes) {
      notes.forEach(element => {
        element.remove();
      });
    }
 
  }
}

const notes = new Notes();
export {notes};