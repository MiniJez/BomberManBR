var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight - 4,
    backgroundColor: "#45c85f",
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
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();
    key = initKey(this, key)
    player = createPlayer(this, player, bombs)
    bombs = createBombs(this, bombs)
    
    this.physics.add.collider(player, bombs);
}

function update() {
    movePlayer(player, key)
    placeBomb(this, bombs, player, key)
    if(this.physics.collide(player, bombs)) {console.log('collide')}
}