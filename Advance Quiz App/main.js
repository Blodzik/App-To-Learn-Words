const translationWord = document.getElementById('translation-input');
const word = document.getElementById('word-input');
const button = document.getElementById('btn');
const scoreEl = document.getElementById('score');
const startButton = document.getElementById('start');
const container = document.querySelector('.container');
const showContainer = document.querySelector('.show-container');
const startGameCont = document.querySelector('.start-game-cont');
const scoreContainer = document.querySelector('.score-cont');

let score = 0;
let currentWordIndex = 0;

const words = [];

function addWord () {
    if (translationWord.value.length === 0 || word.value.length === 0) {
        alert('You need to enter translation and word first');
    } else {
        const currentTranslation = translationWord.value;
        const currentWord = word.value;
        
        words.push({ translation: currentTranslation, word: currentWord});

        console.log(words);

        const show = document.createElement('p');
        show.classList.add('show');
        show.innerHTML = `${currentTranslation}: &nbsp; ${currentWord}`;
        showContainer.appendChild(show);

        word.value = '';
        translationWord.value = '';
    }
};

function startGame () {
    startGameCont.innerHTML = '';

    scoreContainer.style.display = 'block';
    scoreEl.textContent = 'Score: ';

    const wordsCont = document.createElement('div');    
    const inputAnswer = document.createElement('input');
    const checkButton = document.createElement('button');
    const divAnswer = document.createElement('div');

    checkButton.textContent = 'Check';
    inputAnswer.setAttribute('placeholder', 'Type your answer here');  
    wordsCont.classList.add('words-cont');
    
    wordsCont.appendChild(divAnswer);
    wordsCont.appendChild(inputAnswer);
    wordsCont.appendChild(checkButton);

    startGameCont.appendChild(scoreContainer);
    startGameCont.appendChild(wordsCont);

    divAnswer.innerHTML = words[currentWordIndex].translation;
    
    checkButton.addEventListener('click', () => {
        checkAnswer(currentWordIndex, inputAnswer.value);
        scoreContainer.style.display = 'block';
        scoreEl.innerHTML = `Score: ${score}`;
        startGameCont.appendChild(scoreContainer);
        
        currentWordIndex++;  

        if (currentWordIndex < words.length) {
            startGameCont.innerHTML = ''; 
            displayWord(currentWordIndex);
        } else {
            container.innerHTML = 'Game Over';
        }
    })
    
    inputAnswer.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkAnswer(currentWordIndex, inputAnswer.value);
            currentWordIndex++;

            if (currentWordIndex < words.length) {
                startGameCont.innerHTML = '';
                displayWord(currentWordIndex);
            } else {
                container.innerHTML = 'Game Over';
            }
        }
    });
    container.innerHTML = '';
};

function checkAnswer (index, userAnswer) {
    const correctAnswer = words[index].word.toLowerCase();
    if (userAnswer === correctAnswer) {
        score++;
    } else {
        return;
    }
};

function moveFocusToNextInput (nextInput) {
    nextInput.focus();
};

/* function displayWord (index) {
    const divAnswer = document.createElement('div');
    const wordsCont = document.createElement('div');   
    divAnswer.innerHTML = words[index].translation;
    wordsCont.appendChild(divAnswer);
    startGameCont.appendChild(wordsCont);
} */

function displayWord (index) {
    const wordsCont = document.createElement('div');    
    const inputAnswer = document.createElement('input');
    const checkButton = document.createElement('button');
    const divAnswer = document.createElement('div');

    checkButton.textContent = 'Check';
    inputAnswer.setAttribute('placeholder', 'Type your answer here');  
    wordsCont.classList.add('words-cont');
    divAnswer.innerHTML = words[index].translation;
    
    wordsCont.appendChild(divAnswer);
    wordsCont.appendChild(inputAnswer);
    wordsCont.appendChild(checkButton);
    startGameCont.appendChild(wordsCont);
}

translationWord.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        event.preventDefault();
        moveFocusToNextInput(word);
    }
})

word.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addWord();
        moveFocusToNextInput(translationWord);
    }
})

startButton.addEventListener('click', startGame);

button.addEventListener('click', addWord);




