const preloadBombs = (scene) => {
    scene.load.image('bombs', 'src/assets/img/red_square.png');
}

const createBombs = (scene) => {
    var bombs = scene.physics.add.staticGroup();
    return bombs
}

function loot(tile) {
    rand = Math.floor(Math.random() * 100)
    if (rand < 25){
        randItem = Math.floor(Math.random() * 100)
        if (randItem < 40) map.removeTile(tile, 196)
        if (randItem > 70) map.removeTile(tile, 198)
        if (randItem > 40 && randItem < 70) map.removeTile(tile, 197)
    } else {
        map.removeTile(tile, 20)
    }
}

const bombExplose = (scene, bombs, bomb, map, player, playerType) => {
    tilesTop = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE / 2), bomb.y - (TILE_SIZE + (TILE_SIZE / 2)), TILE_SIZE, TILE_SIZE)
    tilesRight = map.getTilesWithinWorldXY(bomb.x + (TILE_SIZE / 2), bomb.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)
    tilesBot = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE / 2), bomb.y + (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)
    tilesLeft = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE + (TILE_SIZE / 2)), bomb.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)

    tilesTop[0].index == 46 ? loot(tilesTop) : null
    tilesBot[0].index == 46 ? loot(tilesBot) : null
    tilesLeft[0].index == 46 ? loot(tilesLeft) : null
    tilesRight[0].index == 46 ? loot(tilesRight) : null

    isDead = false
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

    if(playerType == 'player1') {
        isDeadP1 = isDead
        p1CanPlaceBomb = true
    } else {
        isDeadP2 = isDead
        p2CanPlaceBomb = true
    }

    bombs.remove(bomb, true);
    creatBombParticles(scene, bomb)
}