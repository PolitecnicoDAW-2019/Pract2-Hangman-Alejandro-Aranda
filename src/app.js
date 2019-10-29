const hangmanView = new HangmanView();
hangmanView.loadHtml().then(response => (app = new HangmanController(hangmanView, new HangmanServices())));
