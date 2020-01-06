var config = {
    type: Phaser.AUTO,
    width: 992,
    height: 574,
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
var map
var layer
var isDead = false

function preload() {
    preloadPlayer(this)
    preloadBombs(this)
    preloadParticles(this)
    this.load.image("map-test", "src/assets/img/sprite.png");
}

function create() {
    [map, layer] = createMap(this)
    cursors = this.input.keyboard.createCursorKeys();
    key = initKey(this, key)
    player = createPlayer(this, player, bombs)
    bombs = createBombs(this, bombs)
    
    map.setCollision([ 45, 46 ]);
    this.physics.add.existing(player);
    this.physics.add.collider(player, layer);
    this.physics.add.collider(player, bombs);
}

function update() {
    if(!isDead) {
        movePlayer(player, key)
        placeBomb(this, bombs, player, key, map)
    } else {
        player.destroy()
    }
}