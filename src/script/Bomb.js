const preloadBombs = (scene) => {
    scene.load.image('bombs', 'src/assets/img/red_square.png');
}

const createBombs = (scene, bombs) => {
    bombs = scene.physics.add.staticGroup();
    return bombs
}

function loot(tile) {
    rand = Math.floor(Math.random() * 100)
    if (rand < 25){
        randItem = Math.floor(Math.random() * 100)
        if (randItem < 40) map.removeTile(tile, 196)
        if (randItem > 40 && randItem < 70) map.removeTile(tile, 197)
        if (randItem > 70) map.removeTile(tile, 198)
    } else {
        map.removeTile(tile, 20)
    }
}

const bombExplose = (scene, bombs, bomb, map) => {
    tilesTop = map.getTilesWithinWorldXY(bomb.x - 16, bomb.y - 48, 32, 32)
    tilesRight = map.getTilesWithinWorldXY(bomb.x + 16, bomb.y - 16, 32, 32)
    tilesBot = map.getTilesWithinWorldXY(bomb.x - 16, bomb.y + 16, 32, 32)
    tilesLeft = map.getTilesWithinWorldXY(bomb.x - 48, bomb.y - 16, 32, 32)

    tilesTop[0].index == 46 ? loot(tilesTop) : null
    tilesBot[0].index == 46 ? loot(tilesBot) : null
    tilesLeft[0].index == 46 ? loot(tilesLeft) : null
    tilesRight[0].index == 46 ? loot(tilesRight) : null
    
    bombs.remove(bomb, true);
    creatBombParticles(scene, bomb)

}