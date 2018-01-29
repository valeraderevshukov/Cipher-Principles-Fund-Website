import { DOC } from '../_constants';
class SplitIntoRows {

  constructor(props) {
    this._container = props.container;
    this._text = props.container.textContent;
    this._init();
  }

  _init() {
    let container = this._container;
    let words = this._text.split(' ');
    let wordsLength = words.length;
    container.innerHTML = '<span></span>';
    let row = container.querySelector('span');
    row.setAttribute('data-stagger', 'wrap');
    let parentWidth = container.offsetWidth;
    row.style.whiteSpace = 'nowrap';
    let rowInner = document.createElement('span');
    rowInner.setAttribute('data-stagger', 'inner');
    row.appendChild(rowInner);

    for (let i = 0; i < wordsLength; i++) {
      //get current word with space
      let word = words[i];
      let editedWord = (word + ' ');
      //caching old text value for new line
      let oldTextValue = rowInner.textContent;
      //set new text value (add new word)
      rowInner.textContent += editedWord;

      //if row width with new word bigger then parent width
      //create line with text value minus current word
      if (row.offsetWidth > parentWidth) {
        let newLine = document.createElement('span');
        newLine.setAttribute('data-stagger', 'wrap');
        let newLineInner = document.createElement('span');
        newLineInner.setAttribute('data-stagger', 'inner');
        newLineInner.textContent = oldTextValue;
        newLine.appendChild(newLineInner);
        container.insertBefore(newLine, row);
        //reset row text value to current words with space
        rowInner.textContent = editedWord;

        //remove if line is empty
        if (!newLine.textContent.length) newLine.remove();
      }
      //if it's last word - remove white space and use this span for last line
      if (i === wordsLength - 1) {
        row.removeAttribute('style');
        this._container.classList.add('is-split');
      }
      
    }
  }

  reinit() {
    this._init();
  }

  destroy() {
    this._container.textContent = this._text;
  }

  update() {
    this._text = this._container.textContent;
    this._init();
  }

}

export default () => {
  let staggers = document.querySelectorAll('[data-stagger="rows"]');
  if (!staggers.length) return;
  for (var i = 0; i <= staggers.length - 1; i++) {
    new SplitIntoRows({ container: staggers[i] });
  }
};

