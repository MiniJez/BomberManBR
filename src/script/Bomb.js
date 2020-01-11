const preloadBombs = (scene) => {
    scene.load.image('bombs', 'src/assets/img/red_square.png');
}

const createBombs = (scene) => {
    var bombs = scene.physics.add.staticGroup();
    return bombs
}

function playerIsDead(player, bomb, bonusBombRange){
    for (var i = 0; i <= bonusBombRange+1; i++){

        // left
        if((player.x < bomb.x && player.x > bomb.x - (28 + 32*i)) && (player.y > bomb.y - 28 && player.y < bomb.y + 28)) {
            return true
        // right
        } else if((player.x > bomb.x && player.x < bomb.x + (28 + 32*i)) && (player.y > bomb.y - 28 && player.y < bomb.y + 28)) {
            return true
        // bot
        } else if((player.y > bomb.y && player.y < bomb.y + (28 + 32*i)) && (player.x > bomb.x - 28 && player.x < bomb.x + 28)) {
            return true
        // top
        } else if((player.y < bomb.y && player.y > bomb.y - (28 + 32*i)) && (player.x > bomb.x - 28 && player.x < bomb.x + 28)) {
            return true
        // on 
        } else if(player.y == bomb.y && player.x == bomb.x) {
            return true
        }
    }

    return false
}

function loot(tile) {
    let rand = Math.floor(Math.random() * 100)
    if (rand < 25){
        let randItem = Math.floor(Math.random() * 100)
        if (randItem < 40) map.removeTile(tile, 196)
        if (randItem > 70) map.removeTile(tile, 198)
        if (randItem > 40 && randItem < 70) map.removeTile(tile, 197)
    } else {
        map.removeTile(tile, 20)
    }
}

const bombExplose = (scene, bombs, bomb, map, player1, player2, playerType, bonusBombRange) => {
    creatBombParticles(scene, bomb, bonusBombRange)

    for(var i = 1; i <= bonusBombRange+1; i++){
        tilesTop = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE / 2) , bomb.y - (TILE_SIZE * i + (TILE_SIZE / 2) ), TILE_SIZE, TILE_SIZE)
        if (tilesTop[0].index == 45){
            break
        }
        if (tilesTop[0].index == 46){
            loot(tilesTop)
            break
        }
    }
    for(var i = 1; i <= bonusBombRange+1; i++){
        tilesRight = map.getTilesWithinWorldXY(bomb.x + (TILE_SIZE / 2) + TILE_SIZE * (i-1), bomb.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)
        if (tilesRight[0].index == 45){
            break
        }
        if (tilesRight[0].index == 46){
            loot(tilesRight)
            break
        }
    }
    for(var i = 1; i <= bonusBombRange+1; i++){
        tilesBot = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE / 2), bomb.y + (TILE_SIZE / 2)  + TILE_SIZE * (i-1), TILE_SIZE, TILE_SIZE)
        if (tilesBot[0].index == 45){
            break
        }
        if (tilesBot[0].index == 46){
            loot(tilesBot)
            break
        }
    }
    for(var i = 1; i <= bonusBombRange+1; i++){
        tilesLeft = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE * i + (TILE_SIZE / 2)), bomb.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)
        if (tilesLeft[0].index == 45){
            break
        }
        if (tilesLeft[0].index == 46){
            loot(tilesLeft)
            break
        }
    }


    isDeadP1 = playerIsDead(player1, bomb, bonusBombRange)
    isDeadP2 = playerIsDead(player2, bomb, bonusBombRange)
    
    if(playerType == 'player1') {
        p1CompteurBombe -= 1
    } else {
        p2CompteurBombe -= 1
    }

    
    bombs.remove(bomb, true);
}