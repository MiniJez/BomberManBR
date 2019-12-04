var config = {
    type: Phaser.AUTO,
    width: 992,
    height: 592,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    parent: 'bomberMan'
};

var game = new Phaser.Game(config);
var player
var key = {
    z: null,
    q: null,
    s: null,
    d: null,
    up: null,
    left: null,
    down: null,
    right: null,
    space: null
}
var bombs
var isSpaceKeyAlreadyDown = false

function preload() {
    preloadPlayer(this)
    preloadBombs(this)
    preloadParticles(this)
    this.load.image("map-test", "src/assets/img/sprite.png");
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();
    key = initKey(this, key)
    player = createPlayer(this, player, bombs)
    bombs = createBombs(this, bombs)
    
    this.physics.add.collider(player, bombs);
    createMap(this)
}

function update() {
    movePlayer(player, key)
    placeBomb(this, bombs, player, key)
    if(this.physics.collide(player, bombs)) {console.log('collide')}
}