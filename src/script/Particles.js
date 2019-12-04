const preloadParticles = (scene) => {
    scene.load.atlas('flares', 'src/assets/particles/flares.png', 'src/assets/particles/flares.json');
}

const creatBombParticles = (scene, bomb) => {
    var particles = scene.add.particles('flares');

    particles.createEmitter({
        frame: 'yellow',
        x: bomb.x,
        y: bomb.y,
        lifespan: 500,
        speed: { min: 200, max: 400 },
        angle: 0,
        gravityY: 0,
        scale: { start: 0.2, end: 0 },
        quantity: 1,
        blendMode: 'ADD'
    });

    particles.createEmitter({
        frame: 'yellow',
        x: bomb.x,
        y: bomb.y,
        lifespan: 500,
        speed: { min: 200, max: 400 },
        angle: 90,
        gravityY: 0,
        scale: { start: 0.2, end: 0 },
        quantity: 1,
        blendMode: 'ADD'
    });

    particles.createEmitter({
        frame: 'yellow',
        x: bomb.x,
        y: bomb.y,
        lifespan: 500,
        speed: { min: 200, max: 400 },
        angle: 180,
        gravityY: 0,
        scale: { start: 0.2, end: 0 },
        quantity: 1,
        blendMode: 'ADD'
    });

    particles.createEmitter({
        frame: 'yellow',
        x: bomb.x,
        y: bomb.y,
        lifespan: 500,
        speed: { min: 200, max: 400 },
        angle: 270,
        gravityY: 0,
        scale: { start: 0.2, end: 0 },
        quantity: 1,
        blendMode: 'ADD'
    });
    
    scene.time.delayedCall(300, () => particles.destroy(), null, scene)
}