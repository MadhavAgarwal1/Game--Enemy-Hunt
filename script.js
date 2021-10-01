let kill = 0;
let killTarget = 12;
// key controls
let keyUp = 'ArrowUp';
let keyDown = 'ArrowDown';
let keyLeft = 'ArrowLeft';
let keyRight = 'ArrowRight';
let pressedKey;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;    // canvas width and height must be equal to canvas's image size
canvas.height = 500;
const player = {
    x: 150,
    y: 100,
    width: 40,
    height: 72,
    frameX: 0,
    frameY: 0,
    speed: 4,
    moving: false
};
class Eenemy {
    constructor() {
        this.width = 103.0625;
        this.height = 113.125;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frameX = 0;
        this.frameY = 3;
        this.speed = 4;
        this.moving = true;
    }
    drawEnemy() {
        drawSprite(enemySprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    walkingMoveEnemy() {
        setTimeout(() => {
            if (this.frameX < 14 && this.moving == true)
                this.frameX++;
            else
                this.frameX = 3;
            // on go out of the canvas body
            if (this.x > canvas.width) {
                this.x = Math.random() * (canvas.width - this.width);
                this.y = Math.random() * (canvas.height - this.height);
            }
        }), 10
    };

    collisionCheck() {
        if ((player.x + 8) < (this.x + 24) + (this.width - 50) && (player.x + 8) + (player.width - 15) > (this.x + 24) && (player.y + 13) < (this.y + 15) + (this.height - 34) && (player.y + 13) + (player.height - 16) > (this.y + 15)) {
            this.moving = false;
            killCount();
            this.y = canvas.height + this.height;
        }
        else {
            this.x++;
            this.speed;
            this.moving = true;
        }
    }
}
let enemy = [];
for (let i = 0; i < 10; i++) {
    enemy.push(new Eenemy);               // pushing object to an array
}

const playerSprite = new Image();
playerSprite.src = "Images/chewie.png";
const enemySprite = new Image();
enemySprite.src = "Images/enemy.png";
const background = new Image();
background.src = "Images/background.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animating() {
    // canvas image
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    movePlayer();
    //draw player
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)
    // enemy
    for (let i = 0; i < enemy.length; i++) {
        enemy[i].walkingMoveEnemy();
        enemy[i].drawEnemy();
        enemy[i].collisionCheck();
    }
    requestAnimationFrame(animating);
    popupData();
}
animating();

window.addEventListener('keydown', (e) => {
    pressedKey = e.key;
    player.frameX = 1;
})
window.addEventListener('keyup', (e) => {
    pressedKey = '';
    player.frameX = 0;
})

function movePlayer() {
    if (pressedKey == keyUp && player.y > 0) {
        player.y -= player.speed;
        player.frameY = 3;
        walkingMovePlayer();
    }
    if (pressedKey == keyDown && player.y < (canvas.height - player.height) ) {
        player.y += player.speed;
        player.frameY = 0;
        walkingMovePlayer();
    }
    if (pressedKey == keyLeft && player.x > 0) {
        player.x -= player.speed;
        player.frameY = 1;
        walkingMovePlayer();
    }

    if ( pressedKey == keyRight && player.x < (canvas.width - player.width) ) {
        player.x += player.speed;
        player.frameY = 2;
        walkingMovePlayer();
    }
}
function walkingMovePlayer() {
    if (player.frameX < 3)
        player.frameX++;
    else
        player.frameX = 1;
}
function killCount() {
    let showKills = document.querySelector('.showKills');
    kill++;
    showKills.innerHTML = `${kill}`;
}

//timer code
let showTime = document.querySelector('.showTime');
let storeTime;
let min = '00', sec = '00';
setInterval(function timerfun() {
    if (kill != killTarget) {
        sec++;
        if (sec == 60) {
            min++;
            min < 10 ? min = `0${min}` : `${min}`;
            if (min == 60) {
                min = '00';
            }
            sec = 0;
        }
        sec < 10 ? sec = `0${sec}` : `${sec}`;
        showTime.innerHTML = `${min}:${sec}`;

    }
}, 1000);

function popupData() {
    if (kill >= killTarget) {
        enemy = [];
        player.x = canvas.width + player.x;
        storeTime = showTime.innerHTML;
        if (min != 0) {
            storeTime = `${min} minute ${sec} seconds`;
        } else {
            storeTime = `${sec} seconds`;
        }
        let killed = document.getElementById('killed');
        let timeUsed = document.getElementById('timeUsed');
        let popup = document.getElementById('popup');
        timeUsed.innerHTML = `${storeTime}`;
        killed.innerHTML = `${kill}`;
        popup.style = `display:block`;
    }
}