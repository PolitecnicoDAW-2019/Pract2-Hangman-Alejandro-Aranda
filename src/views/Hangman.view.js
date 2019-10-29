class HangmanView {
  constructor() {}
  DOM = {
    canvas: '',
    buttons: '',
    btnPlayAgain: '',
    context: '',
    takeLives: '',
    lettersbuttons: {},
    lettersCoord: []
  };
  correctLetters = 0;
  Tox = 360;
  Toy = 250;
  gameFinished = false;
  loadHtml = () => {
    return fetch('/views/hangman.html')
      .then(divHangman => divHangman.text())
      .then(divHangman => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(divHangman, 'text/html');
        const section = htmlDocument.documentElement.querySelector('div');
        document.getElementById('canvas').appendChild(section);
        LETTERS.forEach(element => {
          const button = document.createElement('button');
          button.value = element;
          button.innerHTML = element;
          this.DOM.lettersbuttons[element] = button;
          document.getElementById('myPanelLetters').appendChild(button);
        });
      })
      .then(() => {
        this.DOM.canvas = document.getElementById('myCanvas');
        this.DOM.buttons = document.getElementById('myPanelLetters').childNodes;
        this.DOM.context = this.DOM.canvas.getContext('2d');
        this.DOM.btnPlayAgain = document.getElementById('playAgain');
      });
  };

  bindkeyLetters = handler => {
    document.addEventListener('keyup', event => {
      this.checkLetter(handler, event.key);
    });
  };

  bindclickLetters = handler => {
    [...this.DOM.buttons].forEach(element =>
      element.addEventListener('click', event => {
        this.checkLetter(handler, event.target.value);
      })
    );
  };

  checkLetter = (handler, letter) => {
    const exists = handler(letter.toUpperCase());
    if (exists) {
      this.drawLetter(letter.toUpperCase());
      this.checkWinGame();
    } else if (exists != undefined) {
      this.checkLossGame();
    }
  };

  bindPlayAgainButton = handler => {
    this.DOM.btnPlayAgain.addEventListener('click', () => {
      this.correctLetters = 0;
      this.Tox = 360;
      this.Toy = 250;
      this.DOM.context.clearRect(0, 0, this.DOM.canvas.width, this.DOM.canvas.height);
      this.DOM.lettersCoord = [];
      handler();
      this.gameFinished = false;
      this.turnOnOffLettersButtons(false);
    });
  };
  bindUnderScore = handler => {
    const word = handler();
    console.log(word);
    word.split('').forEach(element => {
      this.drawUnderScore();
      this.DOM.lettersCoord.push({ letter: element, Tox: this.Tox, Toy: this.Toy });
    });
  };

  endGame = () => {
    this.turnOnOffLettersButtons(true);
    this.gameFinished = true;
  };
  checkLossGame = () => {
    const Errors = {
      0: this.drawErrorsCanvas.bind(this, { Fromx: 60, Fromy: 70, Tox: 100, Toy: 100 }),
      1: this.drawErrorsCanvas.bind(this, { Fromx: 60, Fromy: 70, Tox: 20, Toy: 100 }),
      2: this.drawErrorsCanvas.bind(this, { Fromx: 60, Fromy: 46, Tox: 20, Toy: 50 }),
      3: this.drawErrorsCanvas.bind(this, { Fromx: 60, Fromy: 46, Tox: 100, Toy: 50 }),
      4: this.drawErrorsCanvas.bind(this, { Fromx: 60, Fromy: 36, Tox: 60, Toy: 70 }),
      5: this.drawHead.bind(this),
      6: this.drawErrorsCanvas.bind(this, { Fromx: 60, Fromy: 5, Tox: 60, Toy: 15 }),
      7: this.drawErrorsCanvas.bind(this, { Fromx: 0, Fromy: 5, Tox: 70, Toy: 5 }),
      8: this.drawErrorsCanvas.bind(this, { Fromx: 10, Fromy: 0, Tox: 10, Toy: 150 }),
      9: this.drawErrorsCanvas.bind(this, { Fromx: 0, Fromy: 150, Tox: 150, Toy: 150 })
    };
    const lives = this.DOM.takeLives();
    if (lives === 0) {
      this.DOM.context.fillText('YOU LOSS ', 500, 100);
      this.endGame();
    }
    Errors[lives]();
  };
  checkWinGame = () => {
    if (this.bindCheckIfPlayerWin(this.correctLetters)) {
      this.DOM.context.fillText('YOU WIN ', 500, 100);
      this.endGame();
    }
  };

  turnOnOffLettersButtons = onoff => {
    [...this.DOM.buttons].forEach(button => (button.disabled = onoff));
  };
  drawLetter = letter => {
    this.DOM.lettersCoord.forEach(element => {
      if (element.letter === letter) {
        this.correctLetters++;
        this.DOM.context.font = '40px monospace';
        this.DOM.context.fillText(letter, element.Tox, element.Toy);
      }
    });
  };
  drawUnderScore = () => {
    this.Tox = this.Tox + 60;
    this.DOM.context.font = '50px monospace';
    this.DOM.context.fillText('_', this.Tox, this.Toy);
  };

  drawErrorsCanvas(positions) {
    this.DOM.context.beginPath();
    this.DOM.context.moveTo(positions.Fromx, positions.Fromy);
    this.DOM.context.lineTo(positions.Tox, positions.Toy);
    this.DOM.context.stroke();
  }

  drawHead() {
    this.DOM.context.beginPath();
    this.DOM.context.arc(60, 25, 10, 0, Math.PI * 2, true);
    this.DOM.context.stroke();
  }
}
