const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // Canvas context

canvas.width = 1024;
canvas.height = 576; 

const gravity = 0.7;

c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/img/background.png'
});

const shop = new Sprite({
    position: {
        x: 575,
        y: 129
    },
    imageSrc: './assets/img/shop_anim.png',
    scale: 2.75,
    framesMax: 6
});

const player = new Fighter({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/img/samuraiBushido/Idle.png',
    scale: 2.5,
    framesMax: 8,
    offset: {
        x: 215,
        y: 155
    },
    sprites: {
        idle: {
            imageSrc: './assets/img/samuraiBushido/Idle.png',
            framesMax: 8,
        },
        idle2: {
            imageSrc: './assets/img/samuraiBushido/Idle2.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './assets/img/samuraiBushido/Run.png',
            framesMax: 8,
        },
        run2: {
            imageSrc: './assets/img/samuraiBushido/Run2.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './assets/img/samuraiBushido/Jump.png',
            framesMax: 2,
        },
        jump2: {
            imageSrc: './assets/img/samuraiBushido/Jump2.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './assets/img/samuraiBushido/Fall.png',
            framesMax: 2,
        },
        fall2: {
            imageSrc: './assets/img/samuraiBushido/Fall2.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './assets/img/samuraiBushido/Attack1.png',
            framesMax: 6,
        },
        attack2: {
            imageSrc: './assets/img/samuraiBushido/Attack2.png',
            framesMax: 6,
        },
        takeHit: {
            imageSrc: './assets/img/samuraiBushido/Take Hit.png',
            framesMax: 4,
        },
        takeHit2: {
            imageSrc: './assets/img/samuraiBushido/Take Hit2.png',
            framesMax: 4,
        },
        death: {
            imageSrc: './assets/img/samuraiBushido/Death.png',
            framesMax: 6,
        }
    },
    attackBox: {
        offset: {
            xNormal: 100,
            xOpposite: -185,
            y: 50
        },
        width: 145,
        height: 50,
    }
});

const enemy = new Fighter({
    position: {
        x: 850,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    imageSrc: './assets/img/samuraiKenji/Idle.png',
    scale: 2.5,
    framesMax: 4,
    offset: {
        x: 215,
        y: 170
    },
    sprites: {
        idle: {
            imageSrc: './assets/img/samuraiKenji/Idle.png',
            framesMax: 4,
        },
        idle2: {
            imageSrc: './assets/img/samuraiKenji/Idle2.png',
            framesMax: 4,
        },
        run: {
            imageSrc: './assets/img/samuraiKenji/Run1.png',
            framesMax: 8,
        },
        run2: {
            imageSrc: './assets/img/samuraiKenji/Run2.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './assets/img/samuraiKenji/Jump.png',
            framesMax: 2,
        },
        jump2: {
            imageSrc: './assets/img/samuraiKenji/Jump2.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './assets/img/samuraiKenji/Fall.png',
            framesMax: 2,
        },
        fall2: {
            imageSrc: './assets/img/samuraiKenji/Fall2.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './assets/img/samuraiKenji/Attack1.png',
            framesMax: 4,
        },
        attack2: {
            imageSrc: './assets/img/samuraiKenji/Attack2.png',
            framesMax: 4,
        },
        takeHit: {
            imageSrc: './assets/img/samuraiKenji/Take hit.png',
            framesMax: 3,
        },
        takeHit2: {
            imageSrc: './assets/img/samuraiKenji/Take hit2.png',
            framesMax: 3,
        },
        death: {
            imageSrc: './assets/img/samuraiKenji/Death.png',
            framesMax: 7,
        }
    },
    attackBox: {
        offset: {
            xNormal: -173,
            xOpposite: 73,
            y: 50
        },
        width: 173,
        height: 50,
    },
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    c.fillStyle = 'rgba(0, 0, 0, 0.07)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    
    if(keys.a.pressed && player.lastKey == 'a' && player.position.x > 0) {
        player.velocity.x = -5;
        player.switchSprite('run2');
    } else if(keys.d.pressed && player.lastKey == 'd' && player.position.x < 1024 - 70) {
        player.velocity.x = 5;
        player.switchSprite('run');
    } else if(player.velocity.x == 0 && player.lastKey == 'a') {
        player.switchSprite('idle2');
    } else {
        player.switchSprite('idle');
    }

    //player jump

    if(player.velocity.y < 0) {
        player.switchSprite('jump');

        if(keys.a.pressed && player.lastKey == 'a' || player.lastKey == 'a') {
            player.switchSprite('jump2');
        }
    } else if(player.velocity.y > 0) {
        player.switchSprite('fall');

        if(keys.a.pressed && player.lastKey == 'a' || player.lastKey == 'a') {
            player.switchSprite('fall2');
        }
    }

    //enemy movement

    if(keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft' && enemy.position.x > 0) {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    } else if(keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight' && enemy.position.x < 1024 - 70) {
        enemy.velocity.x = 5;
        enemy.switchSprite('run2');
    } else if(enemy.velocity.x == 0 && enemy.lastKey == 'ArrowRight') {
        enemy.switchSprite('idle2');
    } else {
        enemy.switchSprite('idle');
    }

    //enemy jump

    if(enemy.velocity.y < 0) {
        enemy.switchSprite('jump');

        if(keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight' || enemy.lastKey == 'ArrowRight') {
            enemy.switchSprite('jump2');
        }
    } else if(enemy.velocity.y > 0) {
        enemy.switchSprite('fall');

        if(keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight' || enemy.lastKey == 'ArrowRight') {
            enemy.switchSprite('fall2');
        }
    }

    //detect collision

    if(
        rectangularColision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking && player.frameCurrent === 4
    ) {
        enemy.takeHit();
        player.isAttacking = false;
        gsap.to('#enemyHealth', { width: `${enemy.health}%`});
    }

    if(
        rectangularColision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking && enemy.frameCurrent === 2
    ) {
        player.takeHit();
        enemy.isAttacking = false;
        gsap.to('#playerHealth', { width: `${player.health}%`});
    }

    //if player misses

    if(player.isAttacking && player.frameCurrent === 4) {
        player.isAttacking = false;
    }

    //if enemy misses

    if(enemy.isAttacking && enemy.frameCurrent === 2) {
        enemy.isAttacking = false;
    }

    //detect player enemy bar

    if(enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }

    //detect player facing side

    if(player.lastKey == 'd') {
        player.facingSide = 'normal';
    } else if(player.lastKey == 'a') {
        player.facingSide = 'opposite';
    }

    //detect enemy facing side

    if(enemy.lastKey == 'ArrowLeft') {
        enemy.facingSide = 'normal';
    } else if(enemy.lastKey == 'ArrowRight') {
        enemy.facingSide = 'opposite';
    }
}

animate();

window.addEventListener('keydown', (event) => {
    if(!player.dead) {
        switch(event.key) {
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'w':
                if(player.velocity.y == 0) {
                    player.velocity.y = -15;
                    player.doubleJump = true;
                } else if(player.doubleJump) {
                    player.velocity.y = -13;
                    player.doubleJump = false;
                }
                break;
            case ' ':
                player.attack();
                break;
        }
    }

    if(!enemy.dead) {
        switch(event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break;
            case 'ArrowUp':
                if(enemy.velocity.y == 0) {
                    enemy.velocity.y = -15;
                    enemy.doubleJump = true;
                } else if(enemy.doubleJump) {
                    enemy.velocity.y = -13;
                    enemy.doubleJump = false;
                }
                break;
            case 'ArrowDown':
                enemy.attack();
                break;
        }
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

    switch(event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});
