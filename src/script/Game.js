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
var bonusMS_player1 = 0
var bonusMS_player2 = 0
var bonusAddBomb_player1 = 0
var bonusAddBomb_player2 = 0
var bonusBombRange_player1 = 0
var bonusBombRange_player2 = 0

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
    this.physics.add.collider(player1, layer);
    this.physics.add.collider(player2, layer);
    this.physics.add.collider(player1, bombs);
    this.physics.add.collider(player2, bombs);
    map.setTileIndexCallback([ 196, 197, 198 ], function (sprite, tile) {
        if(tile.index == 196){
            // Bonus add bomb
            if (sprite == player1) bonusAddBomb_player1 += 1
            if (sprite == player2) bonusAddBomb_player2 += 1
            map.removeTile(tile, 20)
        }
        if(tile.index == 197){
            // Bonus bomb range
            if (sprite == player1) bonusBombRange_player1 += 1
            if (sprite == player2) bonusBombRange_player2 += 1
            map.removeTile(tile, 20)
        }
        if(tile.index == 198){
            // Bonus MoveSpeed
            if (sprite == player1 && bonusMS_player1 < 150) bonusMS_player1 += 25
            if (sprite == player2 && bonusMS_player2 < 150) bonusMS_player2 += 25
            map.removeTile(tile, 20)
        }
    });

    this.anims.create({
        key: 'bomb_explose',
        frames: this.anims.generateFrameNumbers('bombs', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
}

function update() {
    movePlayer(player1, player2, key, bonusMS_player1, bonusMS_player2)
    placeBomb(this, bombs, player1, player2, key, map)

    if(isDeadP1) {
        player1.setVisible(false)
        document.getElementById('endGame').innerHTML = "Player 2 Gagne !"
    }
    
    if(isDeadP2) {
        player2.setVisible(false)
        document.getElementById('endGame').innerHTML = "Player 1 Gagne !"
    }
}