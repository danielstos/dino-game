const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const score = document.querySelector('.score');

let pontos = 0;
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 250) {
            clearInterval(upInterval);
            //descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                else {
                    position -= 20;
                    dino.style.bottom = position + 'px'
                }

            }, 20)
        } else {

        }
        // subindo
        position += 20;
        dino.style.bottom = position + 'px'
    }, 30)
}

function creatCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;
    let contarPontos = true;
    

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -80) {
            clearInterval(leftInterval);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 80 && position < 60) {
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo :( score:'+pontos+'</h1>';
       

        } else if (contarPontos && cactusPosition > 0 && cactusPosition < 80 && position > 180) {
           pontos+=10;
           contarPontos = false;
            
        }
        else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
        score.textContent = "score:" + pontos;
    }, 30);

    setTimeout(creatCactus, randomTime)
}
creatCactus();
document.addEventListener('keyup', handleKeyUp);
