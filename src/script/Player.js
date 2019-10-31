const preloadPlayer = (scene) => {
    scene.load.image('player', 'src/assets/img/blue_square.png');
}

const createPlayer = (scene, player) => {
    player = scene.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true);
    player.setDisplaySize(16, 16)

    return player
}

const movePlayer = (player, key, bombs) => {
    let velX = 0;
    let velY = 0;
    let speed = 150

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

    player.setVelocityX(velX);
    player.setVelocityY(velY);
}

const placeBomb = (bombs, player, key) => {

    if (Phaser.Input.Keyboard.JustDown(key.space)) {
        var bomb = bombs.create(player.x, player.y, 'bombs').setDisplaySize(16, 16)
        bomb.refreshBody()
    }
}