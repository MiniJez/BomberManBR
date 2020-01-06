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
        console.log(randItem)
        if (randItem < 40) map.removeTile(tile, 196)
        if (randItem > 70) map.removeTile(tile, 198)
        if (randItem > 40 && randItem < 70) map.removeTile(tile, 197)
    } else {
        map.removeTile(tile, 20)
    }
}
const bombExplose = (scene, bombs, bomb, map, player) => {
    tilesTop = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE / 2), bomb.y - (TILE_SIZE + (TILE_SIZE / 2)), TILE_SIZE, TILE_SIZE)
    tilesRight = map.getTilesWithinWorldXY(bomb.x + (TILE_SIZE / 2), bomb.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)
    tilesBot = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE / 2), bomb.y + (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)
    tilesLeft = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE + (TILE_SIZE / 2)), bomb.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)

    tilesTop[0].index == 46 ? loot(tilesTop) : null
    tilesBot[0].index == 46 ? loot(tilesBot) : null
    tilesLeft[0].index == 46 ? loot(tilesLeft) : null
    tilesRight[0].index == 46 ? loot(tilesRight) : null
    if((player.x < bomb.x && player.x > bomb.x - 60) && (player.y > bomb.y - 28 && player.y < bomb.y + 28)) {
        isDead = true
    } else if((player.x > bomb.x && player.x < bomb.x + 60) && (player.y > bomb.y - 28 && player.y < bomb.y + 28)) {
        isDead = true
    } else if((player.y > bomb.y && player.y < bomb.y + 60) && (player.x > bomb.x - 28 && player.x < bomb.x + 28)) {
        isDead = true
    } else if((player.y < bomb.y && player.y > bomb.y - 60) && (player.x > bomb.x - 28 && player.x < bomb.x + 28)) {
        isDead = true
    } else if(player.y == bomb.y && player.x == bomb.x) {
        isDead = true
    }
    bombs.remove(bomb, true);
    canPlaceBomb = true
    creatBombParticles(scene, bomb)
}