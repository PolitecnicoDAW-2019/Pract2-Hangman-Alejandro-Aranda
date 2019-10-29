class HangmanServices {
  constructor() {}
  containsLetter = (letter, word) => word.includes(letter);
  controlLive = live => live - 1;
  getRandomWord = arraysWords => arraysWords[Math.floor(Math.random() * arraysWords.length)];
  checkIfPlayerWin = (word, correctLetters) => word.length === correctLetters;
  readWordsJson = () => {
    return fetch('/resources/words.json').then(response => {
      return response.json();
    });
  };
}
