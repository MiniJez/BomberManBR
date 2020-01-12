var p1CanPlaceBomb = true
var p2CanPlaceBomb = true
var p1CompteurBombe = 0
var p2CompteurBombe = 0

const preloadPlayer = (scene) => {
    scene.load.spritesheet('player1', 
        'src/assets/img/perso1.png',
        { frameWidth: 16, frameHeight: 16 }
    );
    scene.load.spritesheet('player2', 
        'src/assets/img/perso2.png',
        { frameWidth: 16, frameHeight: 16 }
    );
}

const createPlayer = (scene) => {
    var player1 = scene.physics.add.sprite(48, 48, 'player1');
    var player2 = scene.physics.add.sprite(945, 48, 'player2');

    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    player1.setDisplaySize(PLAYER_SIZE, PLAYER_SIZE)
    player2.setDisplaySize(PLAYER_SIZE, PLAYER_SIZE)

    scene.anims.create({
        key: 'p1_idle',
        frames: scene.anims.generateFrameNumbers('player1', { start: 4, end: 4 }),
        frameRate: 1,
        repeat: -1
    });

    scene.anims.create({
        key: 'p2_idle',
        frames: scene.anims.generateFrameNumbers('player2', { start: 4, end: 4 }),
        frameRate: 1,
        repeat: -1
    });

    return [player1, player2]
}

const movePlayer = (player1, player2, key, bonusMS_player1, bonusMS_player2) => {
    let velX1 = 0;
    let velY1 = 0;
    let velX2 = 0;
    let velY2 = 0;
    let speedp1 = PLAYER_SPEED + bonusMS_player1
    let speedp2 = PLAYER_SPEED + bonusMS_player2

    if (key.q.isDown) {
        velX1 -= speedp1
    }

    if (key.d.isDown) {
        velX1 += speedp1

    }

    if (key.z.isDown) {
        velY1 -= speedp1
    }

    if (key.s.isDown) {
        velY1 += speedp1
    }

    if (key.left.isDown) {
        velX2 -= speedp2
    }

    if (key.right.isDown) {
        velX2 += speedp2
    }

    if (key.up.isDown) {
        velY2 -= speedp2
    }

    if (key.down.isDown) {
        velY2 += speedp2
    }

    if(velX1 !== 0 && velY1 !== 0){
        velY1 = velY1 / 1.5
        velX1 = velX1 / 1.5
    }

    if(velX2 !== 0 && velY2 !== 0){
        velY2 = velY2 / 1.5
        velX2 = velX2 / 1.5
    }

    player1.play('p1_idle');
    player2.play('p2_idle');

    player1.setVelocityX(velX1);
    player1.setVelocityY(velY1);

    player2.setVelocityX(velX2);
    player2.setVelocityY(velY2);
}


const placeBomb = (scene, bombs, player1, player2, key, map) => {
    if (Phaser.Input.Keyboard.JustDown(key.space) && p1CompteurBombe <= 0 + bonusAddBomb_player1 && player1.visible) {
        let pos = snapToGrid({x: player1.x, y: player1.y})
        var bomb = bombs.create(pos.x, pos.y, 'bombs').setDisplaySize(BOMB_SIZE, BOMB_SIZE)
        p1CompteurBombe += 1
        bomb.refreshBody()
        scene.time.delayedCall(1000, () => bombExplose(scene, bombs, bomb, map, player1, player2, 'player1', bonusBombRange_player1), null, scene)
        bombs.playAnimation('bomb_explose')
    }

    if (Phaser.Input.Keyboard.JustDown(key.plus) && p2CompteurBombe <= 0 + bonusAddBomb_player2 && player2.visible) {
        let pos = snapToGrid({x: player2.x, y: player2.y})
        var bomb = bombs.create(pos.x, pos.y, 'bombs').setDisplaySize(BOMB_SIZE, BOMB_SIZE)
        p2CompteurBombe += 1
        bomb.refreshBody()
        scene.time.delayedCall(1000, () => bombExplose(scene, bombs, bomb, map, player1, player2, 'player2', bonusBombRange_player2), null, scene)
        bombs.playAnimation('bomb_explose')
    }
}