let slots = document.querySelectorAll('.slot')

for (let slot of slots) {
    slot.onclick = check
}

let turn = 0
function check() {
    if (this.textContent == 'X' || this.textContent == 'O') {
        console.log('ja fui cricado')
    } else {
        turn++
        if (turn % 2) {
            this.textContent = 'X';
        } else {
            this.textContent = 'O'
        }
        verify()
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
            console.log('ok')
        }
        else {
            console.log('thomsom')
        }
    }
    else if (turn === 9) {
        console.log('old')
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