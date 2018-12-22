

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