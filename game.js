const words = [
    'maça', 'banana', 'coco', 'manga', 'cereja',
    'jaca', 'kiwi', 'uva', 'pera', 'amora'
];

const button = document.getElementById('play-button');
const gameContainer = document.getElementById('game-container');

button.addEventListener('click', startGame);

function startGame() {
    let word = words[Math.floor(Math.random() * words.length)];
    let firstLetter = word.charAt(0);
    let guessedWord = '_'.repeat(word.length);
    let attempts = 0;

    button.disabled = true;

    renderGame();

    const input = document.getElementById('guess-input');
    const submitGuess = document.getElementById('submit-guess');
    const nextWord = document.getElementById('next-word');
    const playAgain = document.getElementById('play-again');

    nextWord.style.display = 'none';
    playAgain.style.display = 'none';

    submitGuess.addEventListener('click', () => {
        const guess = input.value.toLowerCase().trim();

        if (guess === word) {
            guessedWord = word;
            updateGameStatus();
        } else {
            attempts++;
            if (attempts >= 3) {
                playAgain.style.display = 'inline-block';
                playAgain.addEventListener('click', startGame);
            } else {
                alert('Tente novamente!');
            }
        }
    });

    nextWord.addEventListener('click', () => {
        word = getNextWord();
        firstLetter = word.charAt(0);
        guessedWord = '_'.repeat(word.length);
        attempts = 0;
        renderGame();
    });

    function getNextWord() {
        return words[Math.floor(Math.random() * words.length)];
    }

    function updateGameStatus() {
        gameContainer.innerHTML = `
            <h2>Palavra: ${guessedWord}</h2>
            <p>Inicial da palavra: ${firstLetter}</p>
            <p>Parabéns! Você acertou!</p>
            <button id="play-again">Jogar Novamente</button>
        `;
        playAgain.style.display = 'inline-block';
        playAgain.addEventListener('click', startGame);
    }

    function renderGame() {
        gameContainer.innerHTML = `
            <h2>Palavra: ${guessedWord}</h2>
            <p>Inicial da palavra: ${firstLetter}</p>
            <input type="text" id="guess-input">
            <button id="submit-guess">Submeter</button>
            <button id="next-word">Próxima Pergunta</button>
            <button id="play-again">Jogar Novamente</button>
        `;
    }
}
