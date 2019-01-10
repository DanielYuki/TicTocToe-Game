let slots = document.querySelectorAll('.slot')
for (let slot of slots) {
    slot.onclick = check
}

let player1Point = 0, player2Point = 0;
let player1SymbolInput = document.querySelector('#player1Symbol');
let player2SymbolInput = document.querySelector('#player2Symbol');
let p1Points = document.querySelector('#p1Points')
let p2Points = document.querySelector('#p2Points')
let player1Symbol = '❌';
let player2Symbol = '⭕';

let applyChanges = document.querySelector('.applyChanges');
let game = document.querySelector('#actualGame')

let showSettings = document.querySelector('#upAndDown');
let settings = document.querySelector('aside')

let bestOf1 = document.querySelector('#match1');
let bestOf3 = document.querySelector('#match3');
let bestOf5 = document.querySelector('#match5');

bestOf1.onclick = () => {
    bestOf1.classList.toggle('selected');
    bestOf3.classList.remove('selected');
    bestOf5.classList.remove('selected');
}

bestOf3.onclick = () => {
    bestOf3.classList.toggle('selected');
    bestOf1.classList.remove('selected');
    bestOf5.classList.remove('selected');
}

bestOf5.onclick = () => {
    bestOf5.classList.toggle('selected');
    bestOf3.classList.remove('selected');
    bestOf1.classList.remove('selected');
}

showSettings.onclick = () => {
    settings.classList.toggle('showSettings');
    game.classList.toggle('blurTableGame');
}
game.onclick = () => {
    settings.classList.remove('showSettings');
    game.classList.remove('blurTableGame');
}

let cpuButton = document.querySelector('.onoffswitch');
let cpuOn = false;
cpuButton.onclick = () => {
    cpuButton.classList.toggle('cpuOn')
}

applyChanges.onclick = () => {
    if (player1SymbolInput.value == '') {
        player1SymbolInput.value = '❌'
    } else {
        player1Symbol = player1SymbolInput.value
    }
    if (player2SymbolInput.value == '') {
        player2SymbolInput.value = '⭕'
    } else {
        player2Symbol = player2SymbolInput.value
    }
    if (cpuButton.classList == 'onoffswitch cpuOn') {
        // cpuOn = true;
    } else {
        cpuOn = false;
    }
    hardReset();
    console.log(player1Symbol)
    console.log(player2Symbol)
}

let turn = 0
function check() {
    if (this.textContent == player1Symbol || this.textContent == player2Symbol) {
        console.log('Nope')
        addAnimation(this);
    } else {
        turn++
        if (turn % 2) {
            this.textContent = player1Symbol;
            verify()
            if (cpuOn) {
                setTimeout(checkRandomSlot, 250)
            }
        } else {
            this.textContent = player2Symbol
            verify()
        }
    }
}

function addAnimation(thisSlot) {
    thisSlot.style.animation = 'shake 1s ease-in-out'
    setTimeout(gambiarra01 = () => { thisSlot.style.animation = '' }, 1500)
}

function verify() {
    if (validator(slots[0], slots[1], slots[2]) ||
        validator(slots[3], slots[4], slots[5]) ||
        validator(slots[6], slots[7], slots[8]) ||
        validator(slots[0], slots[3], slots[6]) ||
        validator(slots[1], slots[4], slots[7]) ||
        validator(slots[2], slots[5], slots[8]) ||
        validator(slots[0], slots[4], slots[8]) ||
        validator(slots[2], slots[4], slots[6])) {
        for (let slot of slots) {
            slot.onclick = null;
        }
        if (turn % 2) {
            player1Point++
            p1Points.textContent = player1Point;
        }
        else {
            player2Point++
            p2Points.textContent = player2Point;
        }
        setTimeout(bestOf, 100);
    }
    else if (turn === 9) {
        console.log('old')
        setTimeout(reset, 1500)
    }
}

function reset() {
    turn = 0;
    for (let slot of slots) {
        slot.textContent = ''
        slot.onclick = check
    }
}

function hardReset() {
    player1Point = 0, player2Point = 0;
    p1Points.textContent = 0
    p2Points.textContent = 0
    reset();
}

function validator(slotA, slotB, slotC) {
    if (slotA.textContent === slotB.textContent &&
        slotB.textContent === slotC.textContent &&
        slotA.textContent !== "") {
        return true;
    } else {
        return false;
    }
}

function bestOf() {
    if (bestOf1.classList == 'selected') {
        if (player1Point == 1) {
            alert('Player 1 Wins');
            hardReset()
        } else if (player2Point == 1) {
            alert('Player 2 Wins')
            hardReset()
        }
    } else if (bestOf3.classList == 'selected') {
        if (player1Point == 2) {
            alert('Player 1 Wins');
            hardReset()
        } else if (player2Point == 2) {
            alert('Player 2 Wins')
            hardReset()
        } else {
            setTimeout(reset, 1500)
        }
    } else if (bestOf5.classList == 'selected') {
        if (player1Point == 3) {
            alert('Player 1 Wins');
            hardReset()
        } else if (player2Point == 3) {
            alert('Player 2 Wins')
            hardReset()
        } else {
            setTimeout(reset, 1500)
        }
    } else {
        setTimeout(reset, 1500)
    }
}

//CHECK RANDOM SLOT(AKA "STUPID CPU")
function checkRandomSlot() {
    let randomNumber = Math.floor(Math.random() * Math.floor(9));
    let randomSlot = slots[randomNumber];
    if (randomSlot.textContent == player1Symbol || randomSlot.textContent == player2Symbol) {
        if (turn != 9) {
            checkRandomSlot();
        }
    } else {
        randomSlot.textContent = player2Symbol
        verify()
        turn++
    }
}


// Detects if device is on iOS 
const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}
// Detects if device is in standalone mode
const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

// Checks if should display install popup notification:
if (isIos() && !isInStandaloneMode()) {
    let showModaliOS = document.querySelector('#iosAlertBoxWebApp');
    showModaliOS.style.animation = 'showiOSModal 8s ease-in-out 2s'
    showModaliOS.style.display = 'flex'
    setTimeout(timeOutModal = () => { showModaliOS.style.display = 'none' }, 10000)
}


// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        }, function (error) {
            console.error(error);
        });
}