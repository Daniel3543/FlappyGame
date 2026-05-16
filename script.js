const gamePlay = document.querySelector('.menu .menuPipe .play');
const menu = document.querySelector('.menu');
const music = new Audio('music.mp3','b','c')

const recordTags = document.querySelectorAll('.menu .menuPipe :is(h5, h6)');
let myRecord = localStorage.getItem('FlappyRec') || 0;
let myRecordTime = localStorage.getItem('FlappyTime') || 0;
recordTags[0].innerText = 'My Record Point ' + myRecord;
recordTags[1].innerText = 'My Record Time ' + myRecordTime + 's';
const flappy = () => {
const game = document.querySelector('.game');
game.style.animation = 'bg 7s linear infinite';
const floor = document.querySelector('.game .floor');
floor.style.animation = ' bg 5s linear infinite';
const bird = document.querySelector('.game .bird');
const gameOver = document.querySelector('.game h3');
const allPipe = document.querySelectorAll('.game .pipe');
const pipeTop = document.querySelectorAll('.game .pipe.top');
const pipeBottom = document.querySelectorAll('.game .pipe.bottom');
const point = document.querySelector('.game .display .point');
const time = document.querySelector('.game .display .time');
const enemyBird = document.querySelector('.game .enemyBird');
enemyBird.style.animation = ' pipe 4s linear infinite';
allPipe.forEach(item => item.style.animationName = 'pipe');
pipeTop[1].style.animation = 'pipe 6s linear 2s infinite, press 4s infinite';
pipeBottom[1].style.animation = 'pipe 6s linear 2s infinite, press 4s infinite';
let curPipe = 0; // trubaneri qnaky hashvelu hamar
let pointDighit = 0;
let timeDighit = 0;
let night = true; //gisher cereki hamar
floor.style.backgroundSize = `100% ${window.screen.height * 1.5}px`;// talis enq nra hamar vor ekrani chapery poxveluc hataki chapy mna anpopox (da nra hamar e arvum vor city satki chisht texum)
let birdY = bird.offsetTop;
let birdRotate = 0;
// citi sharjy
let toDown = setInterval(() =>{
    // birdY++; //stugelu ev tesnelu hamar
    birdY += 15;
    // birdRotate += 15;  //stugelu ev tesnelu hamar
    birdRotate < 50 ? birdRotate += 15 : '';
    bird.style.top = birdY + 'px';
    bird.style.rotate = birdRotate + 'deg';
},50);

// knopkan sexmely
document.onkeydown = e =>{
    if(e.which == 38 || e.which == 32){
        birdY -= 100;
        bird.style.top = birdY + 'px';
        birdRotate = -50;
        bird.style.rotate = birdRotate + 'deg';
    }
};

// nkaragrum e partutyuny
const endGame = () => {
     gameOver.style = 'opacity:1; top: 50%;';
     clearInterval(toDown);
     clearInterval(endTime);
     bird.style.rotate = '180deg';
     game.style.animationPlayState = 'paused';
     floor.style.animationPlayState = 'paused';
     bird.style.backgroundImage = 'url(images/deathBird.png)';
     document.onkeydown = null; // city ch hambardzvelu hamar
     allPipe.forEach(item => item.style.animationPlayState = 'paused');
     bird.style.top = floor.offsetTop - bird.offsetHeight / 1.1 + 'px';// nra hamar e vor city satki getnin chisht texum
     pointDighit > myRecord ? localStorage.setItem('FlappyRec', pointDighit): '';
     timeDighit > myRecordTime ? localStorage.setItem('FlappyTime', timeDighit): '';
     setTimeout(() => window.location.reload(),2e3);
     music.pause();
}
setInterval(() => {
    if(bird.offsetTop + bird.offsetHeight >= floor.offsetTop){
        // gameOver.style = 'opacity:1; top: 50%;';
        // clearInterval(toDown);
        // bird.style.rotate = '180deg';
        // game.style.animationPlayState = 'paused';
        // floor.style.animationPlayState = 'paused';
        // bird.style.backgroundImage = 'url(images/deathBird.png)';
        // document.onkeydown = null; // city ch hambardzvelu hamar
        // allPipe.forEach(item => item.style.animationPlayState = 'paused');
        endGame();
    }
    pipeTop.forEach(item => { //nra hamar e vor tesnenq city kpav verevi trubin te che (verevi trubai payman)
        if(item.offsetLeft <= bird.offsetLeft + bird.offsetWidth -10 && bird.offsetTop <= item.offsetTop + item.offsetHeight && item.offsetLeft + item.offsetWidth >= bird.offsetLeft){
            // alert('over')
            endGame();
        }

    });
    pipeBottom.forEach(item => {
        if(item.offsetLeft <= bird.offsetLeft + bird.offsetWidth -10 && bird.offsetTop + bird.offsetHeight >= item.offsetTop && item.offsetLeft + item.offsetWidth >= bird.offsetLeft){
            endGame();
        }
    });
    if(bird.offsetLeft > pipeTop[curPipe].offsetLeft + pipeTop[curPipe].offsetWidth){
        curPipe++;
        curPipe == pipeTop.length ? curPipe = 0 : '';
        pointDighit++;
        point.innerText = 'Point ' + pointDighit;
    }
    if(enemyBird.offsetLeft < 0){// char ciry patahakan uxutyamb galu paymany
        enemyBird.style.top = Math.random() * (game.offsetHeight - floor.offsetHeight - enemyBird.offsetHeight) + 'px';
    }
    if(enemyBird.offsetLeft <= bird.offsetLeft + bird.offsetWidth && enemyBird.offsetLeft + enemyBird.offsetWidth >= bird.offsetLeft && bird.offsetTop <= enemyBird.offsetTop + enemyBird.offsetHeight && bird.offsetTop + bird.offsetHeight >= enemyBird.offsetTop){
        endGame();// char citin kpnelu paymany
    }
    if(bird.offsetTop < 0){
        endGame();
    }
},1);

let endTime = setInterval(() => {
    timeDighit++;
    time.innerText = 'Time ' + timeDighit;
    if(timeDighit % 10 == 0){
        if(night){
            game.style.setProperty('--bg',.81);
        }
        else{
            game.style.setProperty('--bg',0);
        }
        night = !night; // gishery cerek darna kam hakaraky
    }
},1e3);
};
gamePlay.onclick = () => {
    menu.style.top = '100%';
    music.play();
    music.currentTime = 27;// ergi vor erord varkyanic sksvi
    music.volume = .2; //ergi bardzrutyunn e ashxatum e (0 -> 1)
    music.controls = true; 
    flappy();
}