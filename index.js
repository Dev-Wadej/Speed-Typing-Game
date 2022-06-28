const settingsBtn = document.querySelector('#setting-btn');
const settings = document.querySelector('#settings');
const difficultySelect = document.querySelector('#difficulty');
const word = document.querySelector('#word');
const inputText = document.querySelector('#input-text');
const scoreEl = document.querySelector('#score');
const timeEl = document.querySelector('#time');
const endGameEl = document.querySelector('#end-game-container');

// const words = [
//     'good',
//     'south',
//     'independent',
//     'steering',
//     'gold',
//     'home',
//     'artificial',
//     'intelligence',
//     'nine',
//     'fame',
//     'dismiss',
//     'drop',
//     'caring',
//     'sing',
//     'utensil',
//     'airplane',
//     'pilot',
//     'basket',
//     'juice',
//     'ukraine',
//     'captain',
//     'this',
//     'game',
//     'is',
//     'difficult',
//     'south',
//     'independent',
//     'steering',
//     'gold',
//     'home',
//     'artificial',
//     'intelligence',
//     'nine',
//     'fame',
//     'dismiss',
//     'drop',
//     'caring',
//     'sing',
//     'utensil',
//     'airplane',
//     'pilot',
//     'basket',
//     'juice',
//     'ukraine',
//     'captain',
//     'this',
//     'game',
//     'is',
//     'difficult',
// ];

{
    /* <button onClick='window.location.reload()'>Reload</button>`; */
}
let data,
    randomWord,
    score = 0,
    difficulty,
    time = 11;

// API call and generates Random numbers of 5000 words
randomWordsFunc = async() => {
    const response = await fetch(
        'https://random-word-api.herokuapp.com/word?number=5000'
    );
    data = await response.json();
    if (data) {
        addWordToDOM(data[Math.floor(Math.random() * 5000)]);
    }
};
randomWordsFunc();

//Focus on Input Field on load
inputText.focus();

// Function To Update Score
function updateScore() {
    score += 2;
    scoreEl.innerHTML = score;
}

//Timing Function
function updateTime() {
    time--;
    timeEl.innerHTML = `${time}s`;

    if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

function gameOver() {
    inputText.disabled = true;
    time = 0;
    endGameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Here is your Final score: ${score}</p> 
    <button onClick='clearUi()'> Go back</button>`;
    endGameEl.style.display = 'flex';
}

function clearUi() {
    endGameEl.style.display = 'none';
}

difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value.toLowerCase();
    console.log(difficulty);
});
const timeInterval = setInterval(updateTime, 1000);

//Function to add word to  DOM
async function addWordToDOM(randomWor) {
    word.innerHTML = randomWor;
    randomWord = randomWor;
}

// Settings button Functionality
//button on click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('show');
});

//Event Listener for the Input field matching the typed text
inputText.addEventListener('input', (e) => {
    const typedWord = e.target.value.toLowerCase();
    if (typedWord === randomWord) {
        addWordToDOM(data[Math.floor(Math.random() * 5000)]);
        updateScore();
        inputText.value = '';

        //time difficulty  functionality
        if (difficulty === 'hard') {
            time += 1;
        } else if (difficulty === 'medium') {
            time += 2;
        } else {
            time += 4;
        }
    }
});
updateTime();