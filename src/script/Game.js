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
var cursors

function preload() {
    preloadPlayer(this)
}

function create() {
    cursors = this.input.keyboard.createCursorKeys();

    player = createPlayer(this, player)
}

function update() {
    movePlayer(player, cursors)
}