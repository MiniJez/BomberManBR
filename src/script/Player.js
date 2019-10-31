const preloadPlayer = (scene) => {
    scene.load.image('player', 'src/assets/img/blue_square.png');
}

const createPlayer = (scene, player) => {
    player = scene.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true);
    player.setDisplaySize(16, 16)

    return player
}

const movePlayer = (player, cursors) => {
    let x = player.x
    let y = player.y

    if (cursors.left.isDown) {
        x -= 5
    }
    
    if (cursors.right.isDown) {
        x += 5
    }
    
    if (cursors.up.isDown) {
        y -= 5
    }
    
    if (cursors.down.isDown) {
        y += 5
    }

    player.setX(x);
    player.setY(y);
}