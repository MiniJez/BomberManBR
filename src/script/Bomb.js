const preloadBombs = (scene) => {
    scene.load.image('bombs', 'src/assets/img/red_square.png');
}

const createBombs = (scene, bombs) => {
    bombs = scene.physics.add.staticGroup();
    return bombs
}

const bombExplose = (scene, bombs, bomb, map) => {
    tilesTop = map.getTilesWithinWorldXY(bomb.x - 16, bomb.y - 48, 32, 32)
    console.log(tilesTop)
    tilesRight = map.getTilesWithinWorldXY(bomb.x + 16, bomb.y - 16, 32, 32)
    tilesBot = map.getTilesWithinWorldXY(bomb.x - 16, bomb.y + 16, 32, 32)
    tilesLeft = map.getTilesWithinWorldXY(bomb.x - 48, bomb.y - 16, 32, 32)

    tilesTop[0].index == 46 ? map.removeTile(tilesTop, 20) : null
    tilesBot[0].index == 46 ? map.removeTile(tilesBot, 20) : null
    tilesLeft[0].index == 46 ? map.removeTile(tilesLeft, 20) : null
    tilesRight[0].index == 46 ? map.removeTile(tilesRight, 20) : null
    
    bombs.remove(bomb, true);
    creatBombParticles(scene, bomb)

}