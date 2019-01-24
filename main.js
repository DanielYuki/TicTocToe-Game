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

let showInfo = document.querySelector('.showInfo');
let info = document.querySelector('section');

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
    if (info.classList == 'showSection') {
        info.classList.remove('showSection')
        game.classList.remove('blurTableGame');
    } else {
        settings.classList.toggle('showSettings');
        game.classList.toggle('blurTableGame');
    }
}

game.onclick = () => {
    settings.classList.remove('showSettings');
    game.classList.remove('blurTableGame');
    info.classList.remove('showSection')
}

showInfo.onclick = () => {
    if (settings.classList == 'showSettings') {
        settings.classList.remove('showSettings');
        game.classList.remove('blurTableGame');
    } else {
        info.classList.toggle('showSection')
        game.classList.toggle('blurTableGame');
    }
}

let cpuButton = document.querySelector('.onoffswitch');
let cpuOn = false;
cpuButton.onclick = () => {
    cpuButton.classList.toggle('cpuOn')
}

//LOCAL STORAGE VARIABLES
let totalP1 = localStorage.getItem('totalP1') || 0
let totalP2 = localStorage.getItem('totalP2') || 0
let totalDraw = localStorage.getItem('totalDraw') || 0
let totalCpuWin = localStorage.getItem('totalCpuWin') || 0

let p1R = document.querySelector('#p1R')
let p2R = document.querySelector('#p2R')
let drawR = document.querySelector('#drawR')
let cpuR = document.querySelector('#cpuR')
p1R.innerHTML = totalP1;
p2R.innerHTML = totalP2;
drawR.innerHTML = totalDraw;
cpuR.innerHTML = totalCpuWin;

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
        cpuOn = true;
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
        addNopeAnimation(this);
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

function addNopeAnimation(thisSlot) {
    thisSlot.style.animation = 'shake 1s ease-in-out'
    setTimeout(gambiarra01 = () => { thisSlot.style.animation = '' }, 1500)
}

function addWinAnimation() {
    switch (validator(slots, slots, slots)) {
        case validator(slots[0], slots[1], slots[2]):
            for (let i = 0; i < 3; i++) {
                slots[i].style.animation = 'scaleUp 0.75s ease-in-out'
                setTimeout(gambiarra01 = () => { slots[i].style.animation = '' }, 1000)
            }
            console.log('1Row')
            break;
        case validator(slots[3], slots[4], slots[5]):
            for (let i = 3; i < 6; i++) {
                slots[i].style.animation = 'scaleUp 0.75s ease-in-out'
                setTimeout(gambiarra01 = () => { slots[i].style.animation = '' }, 1000)
            }
            console.log('2Row')
            break;
        case validator(slots[6], slots[7], slots[8]):
            for (let i = 6; i < 9; i++) {
                slots[i].style.animation = 'scaleUp 0.75s ease-in-out'
                setTimeout(gambiarra01 = () => { slots[i].style.animation = '' }, 1000)
            }
            console.log('3Row')
            break;
        case validator(slots[0], slots[3], slots[6]):
            for (let i = 0; i < 7; i += 3) {
                slots[i].style.animation = 'scaleUp 0.75s ease-in-out'
                setTimeout(gambiarra01 = () => { slots[i].style.animation = '' }, 1000)
            }
            console.log('1colum')
            break;
        case validator(slots[1], slots[4], slots[7]):
            for (let i = 1; i < 8; i += 3) {
                slots[i].style.animation = 'scaleUp 0.75s ease-in-out'
                setTimeout(gambiarra01 = () => { slots[i].style.animation = '' }, 1000)
            }
            console.log('2colum')
            break;
        case validator(slots[2], slots[5], slots[8]):
            for (let i = 2; i < 9; i += 3) {
                slots[i].style.animation = 'scaleUp 0.75s ease-in-out'
                setTimeout(gambiarra01 = () => { slots[i].style.animation = '' }, 1000)
            }
            console.log('3colum')
            break;
        case validator(slots[0], slots[4], slots[8]):
            for (let i = 0; i < 9; i += 4) {
                slots[i].style.animation = 'scaleUp 0.75s ease-in-out'
                setTimeout(gambiarra01 = () => { slots[i].style.animation = '' }, 1000)
            }
            console.log('L2R')
            break;
        case validator(slots[2], slots[4], slots[6]):
            for (let i = 2; i < 7; i += 2) {
                slots[i].style.animation = 'scaleUp 0.75s ease-in-out'
                setTimeout(gambiarra01 = () => { slots[i].style.animation = '' }, 1000)
            }
            console.log('R2L')
            break;
        default:
            console.log('error')
            break;
    }
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
            totalP1++
            player1Point++
            p1Points.textContent = player1Point;
        }
        else {
            totalP2++
            player2Point++
            p2Points.textContent = player2Point;
        }
        addWinAnimation()
        setTimeout(bestOf, 100);
    }
    else if (turn === 9) {
        totalDraw++
        console.log('old')
        setTimeout(reset, 1500)
    } else {
        if (cpuOn) {
            setTimeout(checkRandomSlot, 250)
        }
    }
    localStorageData(totalP1, totalP2, totalDraw, totalCpuWin)
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
        verifyCpu()
        turn++
    }
}

function verifyCpu() {
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
        totalCpuWin++
        totalP2++
        player2Point++
        p2Points.textContent = player2Point;
        addWinAnimation()
        setTimeout(bestOf, 100);
    }
    else if (turn === 9) {
        totalDraw++
        console.log('old')
        setTimeout(reset, 1500)
    }
    localStorageData(totalP1, totalP2, totalDraw, totalCpuWin)
}

// LocalStorage1.0
function localStorageData(allP1points, allP2points, Draws, cpuWins) {
    localStorage.setItem('totalP1', allP1points)
    localStorage.setItem('totalP2', allP2points)
    localStorage.setItem('totalDraw', Draws)
    localStorage.setItem('totalCpuWin', cpuWins)
    p1R.innerHTML = totalP1;
    p2R.innerHTML = totalP2;
    drawR.innerHTML = totalDraw;
    cpuR.innerHTML = totalCpuWin;
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