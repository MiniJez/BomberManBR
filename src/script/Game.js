var config = {
    type: Phaser.AUTO,
    width: 992,
    height: 592,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
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

function preload() {
    this.load.image("map-test", "src/assets/img/sprite.png");
}

function create() {
    createMap(this)
}

function update() {

}