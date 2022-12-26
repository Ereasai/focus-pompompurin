
/* Reference */
let container = null;

let under = null;
let outline = null;
let progressBar = null;

let celebrationEl = null;
let confettiHolder = null;

let menu = null;
let btnStart = null;
let inpNum = null;

/* Control Values */
let progress = 0;
let numProgress = 10;

let state = 'setting';



/* Confetti */
let confetti = null;
let confettiSettings = { 
    target: 'confetti-holder',
    start_from_edge: true,
    respawn: true,
    size: 2,
    clock: 50
};

document.addEventListener('DOMContentLoaded', () => {
    container = document.getElementById('main-container');
    under = document.getElementById('under');
    outline = document.getElementById('outline');
    progressBar = document.getElementById('progress-bar');

    celebrationEl = document.getElementById('celebration');
    confettiHolder = document.getElementById('confetti-holder');

    menu = document.getElementById('menu');
    btnStart = document.getElementById('button-start');
    inpNum = document.getElementById('input-num-progress');

    setupConfetti();
    disableProgressBar(); 
    menu.style.display = 'flex';
    
    container.addEventListener('click', () => {

        

        if (state == 'ready') {
            progress++;
            updateWidget();
            if (progress == numProgress) {
                state = 'setting';
                menu.style.display = 'flex';
                disableProgressBar();
                celebration();
            }
        }
    });

    /* Menu Button */
    btnStart.addEventListener('click', () => {
        if (state != 'setting') return;

        let input = inpNum.value - 0;
        
        // bad input
        if (input < 1) {
            return;
        }

        numProgress = input;
        progress = 0;
        state = 'ready';

        // change visibility
        progressBar.style.display = 'block';
        menu.style.display = 'none';
        celebrationEl.style.display = 'none';
        confettiHolder.style.display = 'none';

        updateWidget();

    });
});

function setupConfetti() {
    confetti = new ConfettiGenerator(confettiSettings);
    confettiHolder.style.display = 'none';
}

function updateWidget() {
    // clear all child.
    while (under.firstChild) {
        under.removeChild(under.firstChild);
    }

    // create over (the moving progress bar).
    createOver();
}

function createOver() {
    let previousPercent = (progress-1)/numProgress;
    let newPercent      = (progress)/numProgress;

    let elOver = document.createElement('div');
    elOver.id = 'over';
    elOver.innerHTML = 
    `<style>
        #over {
            position: relative;
            bottom: 0;

            background-image: url(pompompurin.png);
            background-position: bottom center;
            background-size: cover;
            height: var(--widget-size);
            width: var(--widget-size);

            animation: test 1s ease-in-out 1;   

            /* progress height */
            height: calc( ${newPercent} * var(--widget-size));
        }

        @keyframes test {
            0% {
                height: calc( ${previousPercent} * var(--widget-size));
            }

            100% {
                height: calc( ${newPercent} * var(--widget-size));
            }
            
        }
        `;
    under.appendChild(elOver);
}

function disableProgressBar() {
    progressBar.style.display = 'none';
}

function celebration() {
    confettiHolder.style.display = 'block';
    celebrationEl.style.display = 'block';
    confetti.render();
}