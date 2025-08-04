const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What makes the space completely silent?',
        choice1: 'There is no atmosphere in space',
        choice2: 'There is no light in space',
        choice3: 'There is no gravity in space',
        choice4: 'None of the above',
        answer: 1,
    },
    {
        question: 'Which of the following animals have the most teeth?',
        choice1: 'Snails',
        choice2: 'Sharks',
        choice3: 'Dolphins',
        choice4: 'Gold fish',
        answer: 1,
    },
    {
        question: 'Which organ makes urine?',
        choice1: 'Thyroid',
        choice2: 'Pituitary',
        choice3: 'Kidney',
        choice4: 'Intestine',
        answer: 3,
    },
    {
        question: 'Which organ is responsible for regulating the blood sugar level?',
        choice1: 'Ovaries',
        choice2: 'Pancreas',
        choice3: 'Testes',
        choice4: 'Sphincter Muscle',
        answer: 2,
    },
    {
        question: 'What is the common name for the tympanic membrane?',
        choice1: 'Nostrils',
        choice2: 'Mouth',
        choice3: 'Tonsils',
        choice4: 'Ear Drum',
        answer: 4,
    },
    {
        question: 'Most of the dust in your house is made of human skin.',
        choice1: 'Partially True',
        choice2: 'Partially False',
        choice3: 'True',
        choice4: 'False',
        answer: 4,
    },
    {
        question: 'Reindeer eyeballs turn blue in winter to help them see at lower light levels.',
        choice1: 'True',
        choice2: 'False',
        choice3: 'Partially False',
        choice4: 'Partially True',
        answer: 1,
    },
    {
        question: 'The biggest asteroid known is:',
        choice1: 'Vesta',
        choice2: 'Icarus',
        choice3: 'Ceres',
        choice4: 'Asteroid belt',
        answer: 3,
    },
    {
        question: 'Who was the first man to classify stars according to their brightness?',
        choice1: 'Pythagorus',
        choice2: 'Hipparchus',
        choice3: 'Copernicus',
        choice4: 'Newton',
        answer: 2,
    },
    {
        question: 'Polar bears have white fur.',
        choice1: 'False',
        choice2: 'Partially False',
        choice3: 'True',
        choice4: 'Partially True',
        answer: 1,
    },
    {
        question: 'Which of the following animals have almost identical fingerprints to humans?',
        choice1: 'Gorilla',
        choice2: 'Chimpanzee',
        choice3: 'Koala',
        choice4: 'Bear',
        answer: 3,
    },
    {
        question: 'The word "muscle" came from a Latin word that means "little mouse".',
        choice1: 'Partially True',
        choice2: 'True',
        choice3: 'False',
        choice4: 'Partially False',
        answer: 2,
    },
    {
        question: 'One Jupiter day is equal to 9 hours and 50 minutes.',
        choice1: 'Partially True',
        choice2: 'Partially False',
        choice3: 'True',
        choice4: 'False',
        answer: 3,
    },
    {
        question: 'How many galaxies does the universe contain?',
        choice1: 'over 200 billion',
        choice2: 'over 500 billion',
        choice3: 'over 100 billion',
        choice4: 'over 300 billion',
        answer: 3,
    },
    {
        question: 'Which type of frog freezes during winter to hibernate?',
        choice1: 'Green Frog',
        choice2: 'American Bullfrog',
        choice3: 'Wood Frog',
        choice4: 'None of the above, frogs do not freeze.',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`


    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()