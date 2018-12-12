let guessWord = ""

//themes data
let fourThemes = [{
        act: ["Tail", "Shaving", "Flying a drone", "daydreaming", "dancing", "giving a CPR"]
    },
    {
        act: ["piking a lock", "making coffee", "sauteing food", "rowing a boat", "climbing a rope",
            "puting on lotion"
        ]
    },
    {
        act: ["wine tasting", "nightmare", "3D", "working on cars", "scootering",
            "eating a pepsicle"
        ]
    },
    {
        act: ["ping pong", "writing a check", "bicycling", "hocking", "rolling dice",
            "water skiing"
        ]
    }
];

//set 1st camera on
let video = document.getElementById('myVideo');

navigator.webkitGetUserMedia({
        video: true,
        audio: true,
    },
    function (localMediaStream) { // Success
        stream = localMediaStream;
        video.src = window.webkitURL.createObjectURL(stream);
    },
    function (err) { // Failure
        alert('getUserMedia failed: Code ' + err.code);
    }
);

//counting down...
var fourTheme = fourThemes[0];
var timeLeft = 60;
var timer = document.getElementById('timer');
var timerId = setInterval(function () {
    countdown();
}, 1000);

function countdown() {
    if (timeLeft == 0) {
        changeThemePrompt();
        fourTheme = fourThemes[Math.floor(Math.random() * 4)];
        timeLeft = 60;

    } else {
        timer.innerHTML = timeLeft + ' seconds remaining';
        timeLeft--;
    }
}

document.getElementById("newWords").innerHTML = fourThemes[0].act[0];
guessWord = fourThemes[0].act[0];

//click button to trigger next words
function changeToNextwords() {
    var myarray = fourTheme.act;
    var random = myarray[Math.floor(Math.random() * 6)];

    guessWord = random

    document.getElementById("newWords").innerHTML = random;
}

function changeThemePrompt() {
    alert("change to next theme!");
}

//getting scores
var points = document.getElementById("points");
var point = 0;

function addOnepoint() {
    point = point + 1;
    points.innerHTML = "Score: " + point;

}

//two buttons
let buttonOne = document.getElementById("myBu1")
buttonOne.addEventListener('click', changeToNextwords)
buttonOne.addEventListener('click', addOnepoint)

let buttonTwo = document.getElementById("myBu2")
buttonTwo.addEventListener('click', changeToNextwords)


//
//voice getting into Result Bar
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var words = [];
var grammar = '#JSGF V1.0; grammar words; public <word> = ' + words.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');

recognition.start();

recognition.onresult = function (event) {
    var last = event.results.length - 1;
    var word = event.results[last][0].transcript;
    diagnostic.textContent = '' + word + '.';
    console.log(event);
    console.log('Confidence: ' + event.results[0][0].confidence);
    // let wordList = word.split(' ')
    console.log(guessWord.toLowerCase())
    if (word.includes(guessWord.toLowerCase())) {
        alert("You said the magic word!")
    }
}

recognition.

recognition.onspeechend = function () {

}

recognition.onnomatch = function (event) {
    diagnostic.textContent = "I didn't get.";
}

recognition.onerror = function (event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}