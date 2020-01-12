const preloadBombs = (scene) => {
    scene.load.spritesheet('bombs', 
        'src/assets/img/bombs.png',
        { frameWidth: 16, frameHeight: 16 }
    );
}

const createBombs = (scene) => {
    var bombs = scene.physics.add.staticGroup();

    scene.anims.create({
        key: 'bomb_explose',
        frames: scene.anims.generateFrameNumbers('bombs', { start: 2, end: 0 }),
        frameRate: 3,
        repeat: -1
    });

    return bombs
}

function playerIsDead(player, bomb, bonusUntilBlock, bonusBombRange){
    for (var i = 0; i <= bonusBombRange+1; i++){
        // left
        if((player.x < bomb.x && player.x > bomb.x - (28 + 32*i)) && (player.y > bomb.y - 28 && player.y < bomb.y + 28)) {
            if(i <= bonusUntilBlock[3]){
                return true
            }
        // right
        } else if((player.x > bomb.x && player.x < bomb.x + (28 + 32*i)) && (player.y > bomb.y - 28 && player.y < bomb.y + 28)) {
            if(i <= bonusUntilBlock[1]){
                return true
            }
        // bot
        } else if((player.y > bomb.y && player.y < bomb.y + (28 + 32*i)) && (player.x > bomb.x - 28 && player.x < bomb.x + 28)) {
            if(i <= bonusUntilBlock[2]){
                return true
            }
        // top
        } else if((player.y < bomb.y && player.y > bomb.y - (28 + 32*i)) && (player.x > bomb.x - 28 && player.x < bomb.x + 28)) {
            if(i <= bonusUntilBlock[0]){
                return true
            }
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

    //up, right, down, left = index 0, 1, 2, 3
    bonusUntilBlock = [1, 1, 1, 1]


    for(var i = 1; i <= bonusBombRange+1; i++){
        tilesTop = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE / 2) , bomb.y - (TILE_SIZE * i + (TILE_SIZE / 2) ), TILE_SIZE, TILE_SIZE)
        bonusUntilBlock[0] = i
        if (tilesTop[0].index == 45){
            break
        } else if (tilesTop[0].index == 46) {
            loot(tilesTop)
            break
        }
    }
    for(var i = 1; i <= bonusBombRange+1; i++){
        tilesRight = map.getTilesWithinWorldXY(bomb.x + (TILE_SIZE / 2) + TILE_SIZE * (i-1), bomb.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)
        bonusUntilBlock[1] = i
        if (tilesRight[0].index == 45){
            break
        } else if (tilesRight[0].index == 46) {
            loot(tilesRight)
            break
        }
    }
    for(var i = 1; i <= bonusBombRange+1; i++){
        tilesBot = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE / 2), bomb.y + (TILE_SIZE / 2)  + TILE_SIZE * (i-1), TILE_SIZE, TILE_SIZE)
        bonusUntilBlock[2] = i
        if (tilesBot[0].index == 45){
            break
        } else if (tilesBot[0].index == 46) {
            loot(tilesBot)
            break
        }
    }
    for(var i = 1; i <= bonusBombRange+1; i++){
        tilesLeft = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE * i + (TILE_SIZE / 2)), bomb.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)
        bonusUntilBlock[3] = i
        if (tilesLeft[0].index == 45){
            break
        } else if (tilesLeft[0].index == 46) {
            loot(tilesLeft)
            break
        }
    }


    isDeadP1 = playerIsDead(player1, bomb, bonusUntilBlock, bonusBombRange)
    isDeadP2 = playerIsDead(player2, bomb, bonusUntilBlock, bonusBombRange)
    
    if(playerType == 'player1') {
        p1CompteurBombe -= 1
    } else {
        p2CompteurBombe -= 1
    }

    
    bombs.remove(bomb, true);
}