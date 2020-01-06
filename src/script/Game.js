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
    map.setTileIndexCallback([ 196, 197, 198 ], function (sprite, tile) {
        console.log(tile)
        if(tile.index == 196){
            map.removeTile(tile, 20)
        }
        if(tile.index == 197){
            map.removeTile(tile, 20)
        }
        if(tile.index == 198){
            map.removeTile(tile, 20)
        }
    });
    this.physics.add.existing(player);
    this.physics.add.collider(player, layer);
    this.physics.add.collider(player, bombs);
}

function update() {
    movePlayer(player, key)
    placeBomb(this, bombs, player, key, map)
    if(this.physics.collide(player, bombs)) {console.log('collide')}
}