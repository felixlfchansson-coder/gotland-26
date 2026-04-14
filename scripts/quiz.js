const questions = [
  {
    question: "Vilken av dessa är mest stolig?",
    answers: ["Stol", "Regn", "Torsdag"],
    correct: 0
  },
  {
    question: "Vad är 1 + 1?",
    answers: ["2", "3", "Fisk"],
    correct: 0
  },
  {
    question: "Vilken av dessa är en färg?",
    answers: ["Blå", "Hund", "Stol"],
    correct: 0
  },
  {
    question: "Vilken är störst?",
    answers: ["Elefant", "Myran", "Dammkorn"],
    correct: 0
  },
  {
    question: "Vilket av dessa är mat?",
    answers: ["Bröd", "Sten", "Luft"],
    correct: 0
  },
  {
    question: "Vilket djur säger mjau?",
    answers: ["Katt", "Hund", "Ko"],
    correct: 0
  },
  {
    question: "Vilket djur får bäst plats i ett kylskåp?",
    answers: ["Giraffen", "Blåval", "Geopard"],
    correct: 2
  },
  {
    question: "Vilket av dessa är ett ord?",
    answers: ["Hej", "!!!", "123"],
    correct: 0
  },
  {
    question: "Vad gör man med vatten?",
    answers: ["Dricker", "Lyssnar", "Ignorerar"],
    correct: 0
  },
  {
    question: "Vilken är mest rund?",
    answers: ["Boll", "Bok", "Penna"],
    correct: 0
  },
  {
    question: "En koala är inte en apa. Vad är den då?",
    answers: ["Pungdjur", "Hunddjur", "Björn"],
    correct: 0
  },
  {
    question: "Vad är Aix galericulata?",
    answers: ["Domherre", "Mandarinand", "Svaveltukan"],
    correct: 1
  },
  {
    question: "Vad gör kläder när de hänger?",
    answers: ["Sover", "De lever inte", "Hänger som vanligt"],
    correct: 0
  },
  {
    question: "Vad gör ett papper när det går sönder?",
    answers: ["Dör", "Slutar leva", "Blir hälften"],
    correct: 2
  },
  {
    question: "Vad blir en hjärna när den blir smart?",
    answers: ["Jobbar", "Är det blodet?", "Blir större"],
    correct: 0
  },
  {
    question: "Vilket djur är snabbast?",
    answers: ["Geopard", "Giraffen", "Flodhästen"],
    correct: 0
  },
  {
    question: "Vilket djur springer snabbast?",
    answers: ["Giraffen", "Blåvalen", "Geopard"],
    correct: 0
  },
  {
    question: "Vilken färg har eld?",
    answers: ["Röd", "Det beror på vad som brinner", "Orange"],
    correct: 1
  },
  {
    question: "Vad är tyngst?",
    answers: ["Trä", "Vatten", "Is"],
    correct: 1
  },
  {
    question: "Vilken av följande är människan mest lik på biologisk nivå?",
    answers: ["Mus", "Banan", "Zebrafisk"],
    correct: 1
  },
  {
    question: "Om alla delar av något byts ut – är det fortfarande samma sak?",
    answers: ["Ja", "Nej", "Det beror på"],
    correct: 2
  },
  {
    question: "Om en exakt kopia av dig skapas – vem är du?",
    answers: ["Originalet", "Kopian", "Ingen / båda"],
    correct: 2
  },
  {
    question: "Finns färger utanför ditt medvetande?",
    answers: ["Ja", "Nej", "Delvis"],
    correct: 1
  },
  {
    question: "Om ingen upplever något – existerar det då som upplevelse?",
    answers: ["Ja", "Nej", "Det beror på definitionen"],
    correct: 2
  },
  {
    question: "Har du fri vilja?",
    answers: ["Ja", "Nej", "Delvis"],
    correct: 2
  },
  {
    question: "Om dina minnen försvinner – är du kvar?",
    answers: ["Ja", "Nej", "Delvis"],
    correct: 1
  },
  {
    question: "Kan du veta att andra är medvetna?",
    answers: ["Ja", "Nej", "Du kan bara anta"],
    correct: 2
  },
  {
    question: "Om allt är en simulation – spelar det roll?",
    answers: ["Ja", "Nej", "Bara om du vet det"],
    correct: 2
  },
  {
    question: "Vad gör dig till dig?",
    answers: ["Minnen", "Kroppen", "Något annat"],
    correct: 2
  },
  {
    question: "Finns det ett rätt svar?",
    answers: ["Ja", "Nej", "Du vet redan"],
    correct: 2
  }
];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const resultEl = document.getElementById("result");
const finalTextEl = document.getElementById("finalText");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const moodEl = document.getElementById("mood");
const cardEl = document.getElementById("card");
const appEl = document.getElementById("app");
const titleEl = document.getElementById("title");
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const startText = document.getElementById("startText");
const startMood = document.getElementById("startMood");

let startClicks = 0;
let currentQuestionIndex = 0;
let score = 0;
let locked = false;
let timer = null;
let timeLeft = 12;

const startRefusalTexts = [
  "Tryck på knappen om du absolut måste. Jag tänker inte göra det lätt.",
  "Nej.",
  "Fortfarande nej.",
  "Okej då. Men jag är inte glad över det."
];

const startButtonTexts = [
  "Starta quizet",
  "Är du säker?",
  "Sluta tjata",
  "Okej då..."
];

const startMoodTexts = [
  "Jag vill egentligen inte börja.",
  "Du gav dig visst inte.",
  "Det här känns påträngande.",
  "Fine. Men jag gör det motvilligt."
];

const angryCorrectMessages = [
  "Tyvärr. Du hade rätt.",
  "Bra. Nu blev jag irriterad.",
  "Rätt igen? Otrevligt av dig.",
  "Du förstör stämningen genom att vara kompetent.",
  "Jaha. Ett rätt till. Kul för dig.",
  "Det där svaret var korrekt och jag ogillar det.",
  "Du börjar gå mig på nerverna.",
  "Oj nej, du tänkte tydligen.",
  "Rätt. Det var onödigt starkt av dig.",
  "Jag hoppades faktiskt på ett fel där."
];

const wrongMessages = [
  "Fel. Äntligen lite ödmjukhet.",
  "Nej. Det där var inte ens nära.",
  "Fel svar. Värmande.",
  "Tack. Ett misstag. Det behövdes.",
  "Nej. Quizet mår bättre nu.",
  "Fel. Nu känns allt mer rimligt.",
  "Du gjorde bort dig. Uppskattas."
];

const timeoutMessages = [
  "Tiden tog slut. Du tvekade. Svagt.",
  "För långsam. Frågan hann tröttna på dig.",
  "Slut på tid. Paniken klädde dig.",
  "Du svarade inte. Jag tolkar det som nederlag."
];

const moodLevels = [
  "Det här är ett quiz. Håll dig lugn.",
  "Du har fått lite för många rätt för min smak.",
  "Nu börjar jag aktivt ogilla din prestation.",
  "Jag saboterar snart om du fortsätter så här.",
  "Jag är rasande. Inget här är tryggt längre."
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getAngerLevel() {
  if (score >= 24) return 4;
  if (score >= 16) return 3;
  if (score >= 9) return 2;
  if (score >= 4) return 1;
  return 0;
}

function getTimeForQuestion() {
  const anger = getAngerLevel();
  const baseQuestion = questions[currentQuestionIndex];

  if (!baseQuestion) return 12;

  if (currentQuestionIndex < 10) {
    return Math.max(5, 12 - anger);
  }

  if (currentQuestionIndex < 20) {
    return Math.max(5, 11 - anger * 2);
  }

  return Math.max(4, 10 - anger * 2);
}

function updateHUD() {
  progressEl.textContent = `Fråga ${currentQuestionIndex + 1} / ${questions.length}`;
  scoreEl.textContent = `Poäng: ${score}`;
  timerEl.textContent = `Tid: ${timeLeft}`;
}

function updateMood() {
  const anger = getAngerLevel();
  moodEl.textContent = moodLevels[anger];
  document.body.className = "";
  if (anger > 0) {
    document.body.classList.add(`angry-${anger}`);
  }

  cardEl.className = "card";
  cardEl.classList.add(`angry-level-${anger}`);

  const angryTitles = [
    "Surquizet",
    "Irriterat Quiz",
    "Motvilligt Quiz",
    "Fientligt Quiz",
    "Hatquizet"
  ];

  titleEl.textContent = angryTitles[anger];
}

function startTimer() {
  clearInterval(timer);
  timeLeft = getTimeForQuestion();
  updateHUD();

  timer = setInterval(() => {
    timeLeft--;
    updateHUD();

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function getPreparedAnswers(questionObj) {
  const mappedAnswers = questionObj.answers.map((text, index) => ({
    text,
    originalIndex: index
  }));

  const anger = getAngerLevel();
  let shouldShuffle = false;

  if (anger >= 1 && Math.random() < 0.30) shouldShuffle = true;
  if (anger >= 2 && Math.random() < 0.45) shouldShuffle = true;
  if (anger >= 3 && Math.random() < 0.65) shouldShuffle = true;
  if (anger >= 4) shouldShuffle = true;

  return shouldShuffle ? shuffleArray(mappedAnswers) : mappedAnswers;
}

function handleStartClick() {
  startClicks++;

  startBtn.classList.remove("start-btn-shake");
  void startBtn.offsetWidth;
  startBtn.classList.add("start-btn-shake");

  if (startClicks === 1) {
    startText.textContent = startRefusalTexts[1];
    startMood.textContent = startMoodTexts[1];
    startBtn.textContent = startButtonTexts[1];
    startBtn.classList.add("refuse-1");
    return;
  }

  if (startClicks === 2) {
    startText.textContent = startRefusalTexts[2];
    startMood.textContent = startMoodTexts[2];
    startBtn.textContent = startButtonTexts[2];
    startBtn.classList.remove("refuse-1");
    startBtn.classList.add("refuse-2");
    return;
  }

  startText.textContent = startRefusalTexts[3];
  startMood.textContent = startMoodTexts[3];
  startBtn.textContent = startButtonTexts[3];
  startBtn.classList.remove("refuse-2");
  startBtn.classList.add("refuse-3");

  setTimeout(() => {
    startScreen.classList.add("hidden");
    cardEl.classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion();
  }, 600);
}

function renderQuestion() {
  locked = false;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.classList.add("hidden");

  const current = questions[currentQuestionIndex];
  questionEl.textContent = current.question;
  answersEl.innerHTML = "";

  const preparedAnswers = getPreparedAnswers(current);

  preparedAnswers.forEach((answerObj, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answerObj.text;
    btn.dataset.correct = answerObj.originalIndex === current.correct ? "true" : "false";
    btn.dataset.index = index;

    const anger = getAngerLevel();
    if (anger >= 2 && Math.random() < 0.25) {
      btn.classList.add("wiggle");
    }

    btn.addEventListener("click", () => selectAnswer(btn));
    answersEl.appendChild(btn);
  });

  updateMood();
  updateHUD();
  startTimer();

  if (getAngerLevel() >= 3) {
    cardEl.classList.add("rage-pop");
    setTimeout(() => cardEl.classList.remove("rage-pop"), 250);
  }
}

function disableAnswers() {
  const buttons = answersEl.querySelectorAll(".answer-btn");
  buttons.forEach((btn) => {
    btn.disabled = true;
  });
}

function revealCorrectAnswer() {
  const buttons = answersEl.querySelectorAll(".answer-btn");
  buttons.forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function triggerAngryEffects() {
  const anger = getAngerLevel();

  if (anger >= 1) {
    cardEl.classList.add("shake");
    setTimeout(() => cardEl.classList.remove("shake"), 350);
  }

  if (anger >= 2) {
    appEl.style.transform = `translateX(${Math.random() * 6 - 3}px)`;
    setTimeout(() => {
      appEl.style.transform = "translateX(0)";
    }, 120);
  }

  if (anger >= 3) {
    const buttons = answersEl.querySelectorAll(".answer-btn");
    buttons.forEach((btn) => {
      if (Math.random() < 0.4) {
        btn.style.transform = `translateX(${Math.random() * 16 - 8}px)`;
      }
    });

    setTimeout(() => {
      buttons.forEach((btn) => {
        btn.style.transform = "";
      });
    }, 250);
  }
}

function selectAnswer(selectedBtn) {
  if (locked) return;
  locked = true;
  clearInterval(timer);

  disableAnswers();

  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    score++;
    selectedBtn.classList.add("correct");
    feedbackEl.textContent = getRandomItem(angryCorrectMessages);
    feedbackEl.className = "feedback good";
    triggerAngryEffects();
  } else {
    selectedBtn.classList.add("wrong");
    feedbackEl.textContent = getRandomItem(wrongMessages);
    feedbackEl.className = "feedback bad";
  }

  revealCorrectAnswer();
  updateMood();
  updateHUD();
  nextBtn.classList.remove("hidden");
}

function handleTimeout() {
  if (locked) return;
  locked = true;
  disableAnswers();
  revealCorrectAnswer();

  feedbackEl.textContent = getRandomItem(timeoutMessages);
  feedbackEl.className = "feedback bad";

  nextBtn.classList.remove("hidden");
  updateMood();
}

function showResult() {
  clearInterval(timer);
  cardEl.classList.add("hidden");
  resultEl.classList.remove("hidden");

  const anger = getAngerLevel();

  let ending = "";

  if (score <= 5) {
    ending = `Du fick ${score} av ${questions.length}. Quizet är ovanligt nöjt med din kollaps.`;
  } else if (score <= 12) {
    ending = `Du fick ${score} av ${questions.length}. Mediokert. Quizet muttrar, men överlever.`;
  } else if (score <= 20) {
    ending = `Du fick ${score} av ${questions.length}. Det här gick lite för bra. Quizet är irriterat.`;
  } else if (score <= 27) {
    ending = `Du fick ${score} av ${questions.length}. Du gjorde quizet märkbart fientligt. Grattis, antar jag.`;
  } else {
    ending = `Du fick ${score} av ${questions.length}. Fullständig katastrof. För quizet alltså. Det hatar dig nu.`;
  }

  if (anger >= 4) {
    ending += " Ingen här kommer att förlåta dig.";
  }

  finalTextEl.textContent = ending;
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    showResult();
    return;
  }

  renderQuestion();
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  locked = false;
  startClicks = 0;
  clearInterval(timer);

  resultEl.classList.add("hidden");
  cardEl.classList.add("hidden");
  startScreen.classList.remove("hidden");

  document.body.className = "quiz-page";
  appEl.style.transform = "translateX(0)";

  startText.textContent = startRefusalTexts[0];
  startMood.textContent = startMoodTexts[0];
  startBtn.textContent = startButtonTexts[0];
  startBtn.classList.remove("refuse-1", "refuse-2", "refuse-3");

  progressEl.textContent = `Fråga 0 / ${questions.length}`;
  scoreEl.textContent = "Poäng: 0";
  timerEl.textContent = "Tid: -";
  titleEl.textContent = "Motvilliga Quizet";
}

startBtn.addEventListener("click", handleStartClick);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

restartQuiz();