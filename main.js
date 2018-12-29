let slots = document.querySelectorAll('.slot')
for (let slot of slots) {
    slot.onclick = check
}

let player1SymbolInput = document.querySelector('#player1Symbol');
let player2SymbolInput = document.querySelector('#player2Symbol');
let player1Symbol = '❌';
let player2Symbol = '⭕';

let applyChanges = document.querySelector('.applyChanges');
let game = document.querySelector('#actualGame')

let showSettings = document.querySelector('#upAndDown');
let settings = document.querySelector('aside')

showSettings.onclick = () => {
    settings.classList.toggle('showSettings')
}

applyChanges.onclick = () => {
    if (player1SymbolInput.value == '') {
        player1SymbolInput.value = '❌'
    }else{
        player1Symbol = player1SymbolInput.value
    }
    if (player2SymbolInput.value == '') {
        player2SymbolInput.value = '⭕'
    }else{
        player2Symbol = player2SymbolInput.value
    }
    console.log(player1Symbol)
    console.log(player2Symbol)
}

let turn = 0
function check() {
    if (this.textContent == player1Symbol || this.textContent == player2Symbol) {
        console.log('ja fui cricado')
    } else {
        turn++
        if (turn % 2) {
            this.textContent = player1Symbol;
        } else {
            this.textContent = player2Symbol
        }
        verify()
    }
}

let player1Point = 0, player2Point = 0;
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
            let p1Points = document.querySelector('#p1Points')
            p1Points.textContent = player1Point;
        }
        else {
            player2Point++
            let p2Points = document.querySelector('#p2Points')
            p2Points.textContent = player2Point;
        }
        reset()
    }
    else if (turn === 9) {
        console.log('old')
        reset()
    }
}

function reset() {
    player1Point, player2Point, turn = 0;
    for (let slot of slots) {
        slot.textContent = ''
        slot.onclick = check
    }
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