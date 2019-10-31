const preloadBombs = (scene) => {
    scene.load.image('bombs', 'src/assets/img/red_square.png');
}

const createBombs = (scene, bombs, player) => {
    bombs = scene.physics.add.staticGroup();
    return bombs
}