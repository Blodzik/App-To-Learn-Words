const translationWord = document.getElementById('translation-input');
const word = document.getElementById('word-input');
const button = document.getElementById('btn');
const scoreEl = document.getElementById('score');
const startButton = document.getElementById('start');
const container = document.querySelector('.container');
const showContainer = document.querySelector('.show-container');
const startGameCont = document.querySelector('.start-game-cont');
const scoreContainer = document.querySelector('.score-cont');
const gameCont = document.querySelector('.game-cont');
const backBtn = document.querySelector('.back-btn');
const mistakesDiv = document.getElementById('mistakes');
const mistake = document.getElementById('mistake');

let score = 0;
let currentWordIndex = 0;

const words = [];
let wrongAnswers = [];

function addWord () {
    if (translationWord.value.length === 0 || word.value.length === 0) {
        alert('You need to enter translation and word first');
    } else {
        const currentTranslation = translationWord.value;
        const currentWord = word.value;
        
        words.push({ translation: currentTranslation, word: currentWord});

        const show = document.createElement('p');
        const deleteIcon = document.createElement('i');
        const showWordsCont = document.createElement('div');

        deleteIcon.classList.add('bi', 'bi-x-lg');
        show.classList.add('show');
        showWordsCont.classList.add('show-words-cont')

        show.innerHTML = `${currentTranslation}: &nbsp; ${currentWord}`;

        showWordsCont.appendChild(show);
        showWordsCont.appendChild(deleteIcon);

        showContainer.appendChild(showWordsCont);

        deleteIcon.addEventListener('click', () => {
            const indexToDelete = words.findIndex(w => w.translation === currentTranslation && w.word === currentWord);

            if (indexToDelete !== -1) {
                words.splice(indexToDelete, 1);
                showContainer.removeChild(showWordsCont);
            }
        })

        word.value = '';
        translationWord.value = '';
    }
};

function startGame () {
    if (words.length === 0) {
        alert('You need to enter translation and word first');
    } else {

        backBtn.addEventListener('click', () => {
            window.location.href='game.html';
        });

        startGameCont.innerHTML = '';

        scoreContainer.style.display = 'block';
        scoreEl.textContent = 'Score: 0';

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

        gameCont.appendChild(scoreContainer);
        startGameCont.appendChild(wordsCont);

        divAnswer.innerHTML = words[currentWordIndex].translation;
        
        checkButton.addEventListener('click', () => {
            checkAnswer(currentWordIndex, inputAnswer.value);
            scoreContainer.style.display = 'block';
            scoreEl.innerHTML = `Score: ${score}`;
            gameCont.appendChild(scoreContainer);
            
            currentWordIndex++;  

            if (currentWordIndex < words.length) {
                divAnswer.innerHTML = words[currentWordIndex].translation;
                inputAnswer.value = '';
            } else {
                startGameCont.innerHTML = 'Game Over';
                console.log(wrongAnswers)
                if (wrongAnswers.length === 0) {
                    mistakesDiv.innerHTML = 'Well done. You have 0 mistakes';
                } else {
                    const mistakeDiv = document.createElement('div');
                    mistakeDiv.innerHTML = `Your answer: ${wrongAnswers.userAnsw} &nbsp; Right answer: ${wrongAnswers.correctAnsw}`;
                    mistakesDiv.appendChild(mistakeDiv);
                }
            }
        })
        
        inputAnswer.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                checkAnswer(currentWordIndex, inputAnswer.value);
                scoreContainer.style.display = 'block';
                scoreEl.innerHTML = `Score: ${score}`;
                gameCont.appendChild(scoreContainer);
            
                currentWordIndex++;  

                if (currentWordIndex < words.length) {
                    divAnswer.innerHTML = words[currentWordIndex].translation;
                    inputAnswer.value = '';
                } else {
                    startGameCont.innerHTML = 'Game Over';
                    startGameCont.style.fontSize = '50px';
                    if (wrongAnswers.length === 0) {
                        mistakesDiv.innerHTML = 'Well done. You have 0 mistakes';
                    } else {
                        for (let i = 0; i < wrongAnswers.length; i++) {
                            const mistakeDiv = document.createElement('div');
                            const rightAnswerDiv = document.createElement('div');

                            rightAnswerDiv.classList.add('right-div');
                            mistakeDiv.classList.add('mistake-div')

                            mistakeDiv.innerHTML = `Your answer: ${wrongAnswers[i].userAnsw}`;
                            rightAnswerDiv.innerHTML = `Right answer: ${wrongAnswers[i].correctAnsw}`;

                            mistake.appendChild(rightAnswerDiv);
                            mistake.appendChild(mistakeDiv);

                            mistakesDiv.appendChild(mistake);
                        }
                    }
                }
            }
        });
        container.style.display = 'none';
    }
};

function checkAnswer (index, userAnswer) {
    const correctAnswer = words[index].word.toLowerCase();
    if (userAnswer.toLowerCase() === correctAnswer) {
        score++;
    } else {
        wrongAnswers.push({ userAnsw: userAnswer, correctAnsw: correctAnswer});
        return;
    } 
};

function moveFocusToNextInput (nextInput) {
    nextInput.focus();
};

 function displayWord (index) {
    const divAnswer = document.createElement('div');
    const wordsCont = document.createElement('div');   
    divAnswer.innerHTML = words[index].translation;
    wordsCont.appendChild(divAnswer);
    startGameCont.appendChild(wordsCont);
} 

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



