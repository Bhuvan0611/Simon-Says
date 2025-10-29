let gameseq = [];
let userseq = [];
let colors = ["btn1", "btn2", "btn3", "btn4"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

let currentScore = 0;
let bestScore = localStorage.getItem('simonBestScore') || 0;

// Update the score display initially
document.getElementById('best-score').textContent = bestScore;

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        levelup();
    }
});
function btnflash(btn) {
    btn.classList.add("blink");
    setTimeout(function () {
        btn.classList.remove("blink")
    }, 300);
}
function levelup() {
    userseq = [];
    level++;
    currentScore = level - 1;
    document.getElementById('current-score').textContent = currentScore;
    h2.innerText = `Level : ${level}`;
    let randindx = Math.floor(Math.random() * 4);
    let randbtn = colors[randindx];
    let btnreq = document.querySelector(`.${randbtn}`);
    gameseq.push(randbtn);
    btnflash(btnreq);

}

function userflash(btn) {
    btn.classList.add("user");
    setTimeout(function () {
        btn.classList.remove("user")
    }, 300);
}

function checkans(indx) {
    if (userseq[indx] == gameseq[indx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    }
    else {
        if (currentScore > bestScore) {
            bestScore = currentScore;
            localStorage.setItem('simonBestScore', bestScore);
            document.getElementById('best-score').textContent = bestScore;
        }
        h2.innerText = "Game over ! press any key to start"
        restart();
    }
}

function btnclick() {
    let btn = this;
    userflash(btn);
    usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length - 1);
}

function restart() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
    currentScore = 0;
    document.getElementById('current-score').textContent = currentScore;
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnclick);
}