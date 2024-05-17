// Constants
const OS_CLASSES = {
    Windows: '.os-win',
    Macintosh: '.os-mac',
    Android: '.os-android',
    iPad: '.os-ios',
    iPhone: '.os-ios',
    WindowsPhone: '.os-win',
};

const UA_CLASSES = {
    Firefox: '.ua-firefox',
    Safari: '.ua-safari',
    Chrome: '.ua-chrome',
    Trident: '.ua-trident',
    Opera: '.ua-opera',
    Edge: '.ua-edge',
};

const DEV_CLASSES = {
    desktop: '.dev-desktop',
    mobile: '.dev-mobile',
};

// Function to get OS and UA classes
function getOsAndUaClasses() {
    const userAgent = navigator.userAgent;
    let osClass, uaClass, devClass;

    Object.keys(OS_CLASSES).forEach((os) => {
        if (userAgent.indexOf(os) !== -1) {
            osClass = OS_CLASSES[os];
            devClass = os === 'Windows' || os === 'Macintosh' ? DEV_CLASSES.desktop : DEV_CLASSES.mobile;
        }
    });

    Object.keys(UA_CLASSES).forEach((ua) => {
        if (userAgent.indexOf(ua) !== -1) {
            uaClass = UA_CLASSES[ua];
        }
    });

    return { osClass, uaClass, devClass };
}

// Function to add classes to elements
function addClassesToElements({ osClass, uaClass, devClass }) {
    const osElement = document.querySelector(osClass);
    const uaElement = document.querySelector(uaClass);
    const devElement = document.querySelector(devClass);

    if (osElement) osElement.classList.add('os-current');
    if (uaElement) uaElement.classList.add('ua-current');
    if (devElement) devElement.classList.add('dev-current');
}

// Function to validate form input
function validateFormInput() {
    const urlInput = document.querySelector('#landing-scan-url');
    const validationMessage = document.querySelector('#scan-form-validation');

    return (e) => {
        const url = urlInput.value.trim().toLowerCase();

        if (url === '') {
            validationMessage.textContent = 'Please enter a URL to scan';
            return false;
        }

        if (url.indexOf('www.') === 0 || url.indexOf('http') === 0) {
            return true;
        }

        validationMessage.textContent = 'URLs must start with www or http or https';
        return false;
    };
}

// Function to speak text
function speak(text) {
    if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    }
}

// Function to add event listeners
function addEventListeners() {
    document.querySelectorAll('#landing-scan-form').forEach((form) => {
        form.addEventListener('submit', validateFormInput());
    });

    document.querySelectorAll('button.speak-example').forEach((button) => {
        if (window.speechSynthesis) {
            button.addEventListener('click', () => {
                const speakId = button.dataset.speakId;
                const text = document.getElementById(speakId).textContent;
                speak(text);
            });
        } else {
            button.style.display = 'none';
        }
    });

    document.querySelectorAll('select.ua-filter').forEach((select) => {
        select.addEventListener('change', () => {
            const allElements = document.querySelectorAll('.test-all');
            allElements.forEach((element) => {
                element.style.display = 'none';
            });

            const filteredElements = document.querySelectorAll(select.value);
            filteredElements.forEach((element) => {
                element.style.display = '';
            });
        });
    });
}

// Document ready
document.addEventListener('DOMContentLoaded', () => {
    const { osClass, uaClass, devClass } = getOsAndUaClasses();
    addClassesToElements({ osClass, uaClass, devClass });
    addEventListeners();
});