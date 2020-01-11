const preloadParticles = (scene) => {
    scene.load.atlas('flares', 'src/assets/particles/flares.png', 'src/assets/particles/flares.json');
}

const creatBombParticles = (scene, bomb, bonus) => {
    var particles = scene.add.particles('flares');
    var bonusTop = bonus
    var bonusRight = bonus
    var bonusBot = bonus
    var bonusLeft = bonus

    for(var i = 1; i <= bonus+1; i++){
        tilesTop = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE / 2) , bomb.y - (TILE_SIZE * i + (TILE_SIZE / 2) ), TILE_SIZE, TILE_SIZE)
        if (tilesTop[0].index == 45){
            bonusTop = i - 2
            break
        }
        if (tilesTop[0].index == 46){
            bonusTop = i - 1
            break
        }
    }
    for(var i = 1; i <= bonus+1; i++){
        tilesRight = map.getTilesWithinWorldXY(bomb.x + (TILE_SIZE / 2) + TILE_SIZE * (i-1), bomb.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)
        if (tilesRight[0].index == 45){
            bonusRight = i - 2
            break
        }
        if (tilesRight[0].index == 46){
            bonusRight = i - 1
            break
        }
    }
    for(var i = 1; i <= bonus+1; i++){
        tilesBot = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE / 2), bomb.y + (TILE_SIZE / 2)  + TILE_SIZE * (i-1), TILE_SIZE, TILE_SIZE)
        if (tilesBot[0].index == 45){
            bonusBot = i - 2
            break
        }
        if (tilesBot[0].index == 46){
            bonusBot = i - 1
            break
        }
    }
    for(var i = 1; i <= bonus+1; i++){
        tilesLeft = map.getTilesWithinWorldXY(bomb.x - (TILE_SIZE * i + (TILE_SIZE / 2)), bomb.y - (TILE_SIZE / 2), TILE_SIZE, TILE_SIZE)
        if (tilesLeft[0].index == 45){
            bonusLeft = i - 2
            break
        }
        if (tilesLeft[0].index == 46){
            bonusLeft = i - 1
            break
        }
    }
        
    // particules right
    particles.createEmitter({
        frame: 'yellow',
        x: bomb.x,
        y: bomb.y,
        lifespan: 46 + (bonusRight * TILE_SIZE),
        speed: { min: 600, max: 1000 },
        angle: 0,
        gravityY: 0,
        scale: { start: 0.25, end: 0.25 },
        quantity: 10 + bonusRight * 10,
        blendMode: 'ADD'
    });

    // particules bot
    particles.createEmitter({
        frame: 'yellow',
        x: bomb.x,
        y: bomb.y,
        lifespan: 46 + (bonusBot * TILE_SIZE),
        speed: { min: 600, max: 1000 },
        angle: 90,
        gravityY: 0,
        scale: { start: 0.25, end: 0.25 },
        quantity: 10 + bonusBot * 10,
        blendMode: 'ADD'
    });

    // particules left
    particles.createEmitter({
        frame: 'yellow',
        x: bomb.x,
        y: bomb.y,
        lifespan: 46 + (bonusLeft * TILE_SIZE),
        speed: { min: 600, max: 1000 },
        angle: 180,
        gravityY: 0,
        scale: { start: 0.25, end: 0.25 },
        quantity: 10 + bonusLeft * 10,
        blendMode: 'ADD'
    });


    // particules top
    particles.createEmitter({
        frame: 'yellow',
        x: bomb.x,
        y: bomb.y,
        lifespan: 46 + (bonusTop * TILE_SIZE),
        speed: { min: 600, max: 1000 },
        angle: 270,
        gravityY: 0,
        scale: { start: 0.25, end: 0.25 },
        quantity: 10 + bonusTop * 10,
        blendMode: 'ADD'
    });
    
    scene.time.delayedCall(300, () => particles.destroy(), null, scene)
}