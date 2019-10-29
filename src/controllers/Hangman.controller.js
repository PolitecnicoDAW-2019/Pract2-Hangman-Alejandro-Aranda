class HangmanController {
  constructor(view, service) {
    this.service = service;
    this.view = view;
    this.service.readWordsJson().then(Json => {
      this.arrayWords = Json;
      this.Player = new Player('Player1');
      this.word = this.service.getRandomWord(this.arrayWords);
      this.view.bindkeyLetters(this.handleContainsLetter);
      this.view.bindclickLetters(this.handleContainsLetter);
      this.view.DOM.takeLives = this.handlerControlLive;
      this.view.bindUnderScore(this.handleWord);
      this.view.bindPlayAgainButton(this.handlePlayAgainButton);
      this.view.bindCheckIfPlayerWin = this.handleCheckIfPlayerWin;
    });
  }
  word;
  Player;
  arrayWords;
  arrayLetters = [];
  handleContainsLetter = letter => {
    if (/^[A-Z]+$/.test(letter) && !this.arrayLetters.includes(letter.toUpperCase()) && !this.view.gameFinished) {
      this.arrayLetters.push(letter.toUpperCase());
      this.view.DOM.lettersbuttons[letter.toUpperCase()].disabled = true;
      return this.service.containsLetter(letter.toUpperCase(), this.word);
    }
  };

  handlerControlLive = () => {
    this.Player.live = this.service.controlLive(this.Player.live);
    return this.Player.live;
  };

  handleWord = () => {
    return this.word;
  };

  handlePlayAgainButton = () => {
    this.Player.live = 10;
    this.arrayLetters = [];
    this.word = this.service.getRandomWord(this.arrayWords);
    this.view.bindUnderScore(this.handleWord);
  };
  handleCheckIfPlayerWin = correctLetters => this.service.checkIfPlayerWin(this.word, correctLetters);
}
