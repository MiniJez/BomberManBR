var p1CanPlaceBomb = true
var p2CanPlaceBomb = true

const preloadPlayer = (scene) => {
    scene.load.image('player1', 'src/assets/img/blue_square.png');
    scene.load.image('player2', 'src/assets/img/pink-square.jpg');
}

const createPlayer = (scene) => {
    var player1 = scene.physics.add.sprite(48, 48, 'player1');
    var player2 = scene.physics.add.sprite(945, 48, 'player2');
    player1.setCollideWorldBounds(true);
    player2.setCollideWorldBounds(true);
    player1.setDisplaySize(PLAYER_SIZE, PLAYER_SIZE)
    player2.setDisplaySize(PLAYER_SIZE, PLAYER_SIZE)

    return [player1, player2]
}

const movePlayer = (player1, player2, key) => {
    let velX1 = 0;
    let velY1 = 0;
    let velX2 = 0;
    let velY2 = 0;
    let speed = PLAYER_SPEED

    if (key.q.isDown) {
        velX1 -= speed
    }

    if (key.d.isDown) {
        velX1 += speed
    }

    if (key.z.isDown) {
        velY1 -= speed
    }

    if (key.s.isDown) {
        velY1 += speed
    }

    if (key.left.isDown) {
        velX2 -= speed
    }

    if (key.right.isDown) {
        velX2 += speed
    }

    if (key.up.isDown) {
        velY2 -= speed
    }

    if (key.down.isDown) {
        velY2 += speed
    }

    if(velX1 !== 0 && velY1 !== 0){
        velY1 = velY1 / 1.5
        velX1 = velX1 / 1.5
    }

    if(velX2 !== 0 && velY2 !== 0){
        velY2 = velY2 / 1.5
        velX2 = velX2 / 1.5
    }

    player1.setVelocityX(velX1);
    player1.setVelocityY(velY1);

    player2.setVelocityX(velX2);
    player2.setVelocityY(velY2);
}

const placeBomb = (scene, bombs, player1, player2, key, map) => {
    if (Phaser.Input.Keyboard.JustDown(key.space) && p1CanPlaceBomb && player1.visible) {
        p1CanPlaceBomb = false
        let pos = snapToGrid({x: player1.x, y: player1.y})
        var bomb = bombs.create(pos.x, pos.y, 'bombs').setDisplaySize(BOMB_SIZE, BOMB_SIZE)
        bomb.refreshBody()
        scene.time.delayedCall(1000, () => bombExplose(scene, bombs, bomb, map, player1, 'player1'), null, scene)
    }

    if (Phaser.Input.Keyboard.JustDown(key.plus) && p2CanPlaceBomb && player2.visible) {
        p2CanPlaceBomb = false
        let pos = snapToGrid({x: player2.x, y: player2.y})
        var bomb = bombs.create(pos.x, pos.y, 'bombs').setDisplaySize(BOMB_SIZE, BOMB_SIZE)
        bomb.refreshBody()
        scene.time.delayedCall(1000, () => bombExplose(scene, bombs, bomb, map, player2, 'player2'), null, scene)
    }
}