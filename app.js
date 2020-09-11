/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What does the acronym CPU stand for?',
      answers: [
        'Control Programming Unit',
        'Central Processing Unit',
        'Computer Processing Unit',
        'Computed Program Unit'
      ],
      correctAnswer: 'Central Processing Unit'
    },
    {
      question: 'What is the native resolution of a 4K UHD television?',
      answers: [
        '1980 x 1080',
        '2560 x 1600',
        '3840 x 2160',
        '2560 x 1440'
      ],
      correctAnswer: '3840 x 2160'
    },
    {
      question: 'How many Megabytes does a 1 Terabyte hard drive store?',
      answers: [
        '100,000 Megabytes',
        '10,000 Megabytes',
        '1,000 Megabytes',
        '1,000,000 Megabytes'
      ],
      correctAnswer: '1,000,000 Megabytes'
    },
    {
      question: 'Which company released their most recent gaming console on March 3, 2017?',
      answers: [
        'Nintendo',
        'Sony',
        'Microsoft',
        'Samsung'
      ],
      correctAnswer: 'Nintendo'
    },
    {
      question: 'What is the technology used to create autonomous machine learning?',
      answers: [
        'JavaScript',
        'Artificial Intelligence',
        'Augmented Reality',
        'Computer Automation'
      ],
      correctAnswer: 'Artificial Intelligence'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  submittingAnswer: false,
  isCorrect: false,
  usersAnswer: ""
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates
//This is the HTML that will be inserted when the user begins the quiz
function createStartPage () {
  return `
  <section class="welcome-page">
            <form>
                <p>
                    Welcome to my technology quiz! Press the button below to start the quiz.
                </p>
                
                <button type="submit" id="startQuiz" autofocus>Start Quiz</button>
            </form>
        </section>
  `
}
//This function creates two arrays housing the current question object's answers list and index numbers
function createQuizAnswersArray(answers){
  let answerArray = [];
  let indexArray = [];
  answers.forEach(answer => {
    answerArray.push(answer);
    indexArray.push(answers.indexOf(answer));
  });
  //console.log(answerArray);
  //console.log(indexArray);
  //returns a concatanated string with all of the list items from each indexed answer together
  return answerArray.map(answer => createQuizAnswersList(answer)).join('');
}

function createQuizAnswersList(answer){
  let questionNumber = store.questionNumber;
  let id = store.questions[questionNumber].answers.indexOf(answer);
  //console.log(id);

  return `
    <li>      
      <input type="radio" name="answers" id="answer-${id}" value="${answer}">
      <label for="answer-${id}"> ${answer}</label>      
    </li>
  `;
}


//This function will create the template for the questions main section
function createQuizQuestionPageMain (questionsList) {
  //console.log(questionsList);
  let questionNumber = questionsList[store.questionNumber];
  //console.log(questionNumber.answers);
  return `
  <section class="questions-page">
    <p>${questionNumber.question}</p>
    <form>
      <ol>
      ${createQuizAnswersArray(questionNumber.answers)}
      </ol>
      <button type="submit" id="submitAnswer">Submit Answer</button>
    </form>
  </section>`
}

//This function will create the template for the quiz questions header section
function createQuizQuestionPageHeader () {
  return `
  <h1>Technology Quiz</h1>
  <h2>Question ${store.questionNumber + 1} out of ${store.questions.length}</h2>
  <h2>Current Score: ${store.score}</h2>
  `
}

//This function will create the submission results page that tells the user if the selection is correct or incorrect
function createSubmissionResultsPage() {
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  //console.log(correctAnswer);
  if (store.isCorrect === true) {
    return `
      <section class="submission-result">
        <form>
          <p>${correctAnswer} is correct!</p>
          <p>Great Job!</p>
          <p>Current Score: ${store.score} out of ${store.questions.length}</p>
          <button type="submit" id="next-question">Next</button>
        </form>
      </section>
    `
  }
  else {
    return `
    <section class="submission-result">
      <form>
        <p>${store.usersAnswer} is incorrect!</p>
        <p>The correct answer was ${correctAnswer}.</p>
        <p>Current Score: ${store.score} out of ${store.questions.length}</p>
        <button type="submit" id="next-question">Next</button>
      </form>
    </section>
  `
  }
}
//This function creates the template for the Quiz results
function createQuizResults() {
  return `
    <section class="results-page">
    <form>
        <h3>Congratulations! You completed the quiz.</h3>
        <p>Your Results: ${store.score} out of ${store.questions.length}</p>
        <button type="submit" id="restartQuiz">Restart Quiz</button>
    </form>
  </section>
  `
}
/********** RENDER FUNCTION(S) **********/

function renderQuizApp() {
  let html =""
  if (store.quizStarted === false) {
    $("main").html(createStartPage());
    return;
  }
  else if (store.questionNumber >= 0 && store.questionNumber < store.questions.length) {
     if (store.submittingAnswer === true) {
        $("header").html(createQuizQuestionPageHeader())
        $("main").html(createSubmissionResultsPage());
     }
     else {
        $("header").html(createQuizQuestionPageHeader());
        $("main").html(createQuizQuestionPageMain(store.questions));
     } 
  }
  else {
    $("main").html(createQuizResults());
  }
}

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

//This handles when a user clicks on the start button on the welcome page
function handleStartQuizClick() {
  $("main").on("click", "#startQuiz", (event) => {
    event.preventDefault();
    store.quizStarted = true;
    renderQuizApp();
  });
}

//This handles the submit answer button on the questions form
function handleSubmitAnswerClick() {
  $("main").on("click", "#submitAnswer", (event) => {
    event.preventDefault();
    let submittedAnswer = $("input[name='answers']:checked").val();
    let correctAnswer = store.questions[store.questionNumber].correctAnswer
    if (submittedAnswer == null) {
      alert("Please select an option first.")
    }
    else {
      if(submittedAnswer === correctAnswer) {
        store.score += 1;
        store.isCorrect = true;
      }
      store.usersAnswer = submittedAnswer; 
      store.submittingAnswer = true;
      renderQuizApp();
    }    
  });
}

//This will handle the next question button click event
function handleNextQuestionClick() {
  $("main").on("click", "#next-question", (event) =>{
    event.preventDefault();
    store.isCorrect = false;
    store.submittingAnswer = false;
    store.usersAnswer = "";
    if (store.questionNumber < store.questions.length) {
      store.questionNumber += 1;
    }    
    renderQuizApp();
  });
}

//This function will handle the restart the quiz button and reset the quiz to start over.
function handleRestartQuizClick() {
  $("main").on("click", "#restart-quiz", (event) => {
    event.preventDefault();
    store.score = 0;
    store.quizStarted = false;
    store.questionNumber = 0;
    renderQuizApp();
  });
}
// This is the callback function for the app that initializes the script
function handleQuizApp () {
  renderQuizApp();
  handleStartQuizClick();
  handleSubmitAnswerClick();
  handleNextQuestionClick();
  handleRestartQuizClick();
}

$(handleQuizApp);