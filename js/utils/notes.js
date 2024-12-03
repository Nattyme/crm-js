class Notes {
  constructor (wrapperElement) {
    this.container = wrapperElement;
    if(!this.container) console.log('Нет контейнера!');
  }

  getHTMLTmpl (className, text) {
    return  `
              <div class="alert ${className}" role="alert">
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
    this.container.insertAdjacentHTML('beforeend', note);
  }
}

export {Notes};