const PLAYER_SIZE = 26
const BOMB_SIZE = 26;
const PLAYER_SPEED = 200;

const preloadPlayer = (scene) => {
    scene.load.image('player', 'src/assets/img/blue_square.png');
}

const createPlayer = (scene, player) => {
    player = scene.physics.add.sprite(48, 48, 'player');
    player.setCollideWorldBounds(true);
    player.setDisplaySize(PLAYER_SIZE, PLAYER_SIZE)

    return player
}

const movePlayer = (player, key, bombs) => {
    let velX = 0;
    let velY = 0;
    let speed = PLAYER_SPEED

    if (key.q.isDown || key.left.isDown) {
        velX -= speed
    }

    if (key.d.isDown || key.right.isDown) {
        velX += speed
    }

    if (key.z.isDown || key.up.isDown) {
        velY -= speed
    }

    if (key.s.isDown || key.down.isDown) {
        velY += speed
    }

    if(velX !== 0 && velY !== 0){
        velY = velY / 1.5
        velX = velX / 1.5
    }

    player.setVelocityX(velX);
    player.setVelocityY(velY);
}

const placeBomb = (scene, bombs, player, key, map) => {

    if (Phaser.Input.Keyboard.JustDown(key.space)) {
        let pos = snapToGrid({x: player.x, y: player.y})
        var bomb = bombs.create(pos.x, pos.y, 'bombs').setDisplaySize(BOMB_SIZE, BOMB_SIZE)
        bomb.refreshBody()
        scene.time.delayedCall(3000, () => bombExplose(scene, bombs, bomb, map), null, scene)
    }
}