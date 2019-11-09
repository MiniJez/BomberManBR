const preloadBombs = (scene) => {
    scene.load.image('bombs', 'src/assets/img/red_square.png');
}

const createBombs = (scene, bombs) => {
    bombs = scene.physics.add.staticGroup();
    return bombs
}

const bombExplose = (scene, bombs, bomb) => {
    bombs.remove(bomb, true);
    creatBombParticles(scene, bomb)
}