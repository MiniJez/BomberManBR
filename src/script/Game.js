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
var player1, player2
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
var isDeadP1, isDeadP2 = false

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
    var [p1, p2] = createPlayer(this)
    player1 = p1
    player2 = p2
    bombs = createBombs(this)

    map.setCollision([ 45, 46 ]);
    this.physics.add.existing(player1);
    //this.physics.add.existing(player2);
    this.physics.add.collider(player1, layer);
    this.physics.add.collider(player2, layer);
    this.physics.add.collider(player1, bombs);
    this.physics.add.collider(player2, bombs);
    //this.physics.add.collider(player1, player2);
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
}

function update() {
    movePlayer(player1, player2, key)
    placeBomb(this, bombs, player1, player2, key, map)

    if(isDeadP1) {
        player1.setVisible(false)
    }
    
    if(isDeadP2) {
        player2.setVisible(false)
    }
}