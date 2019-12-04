function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function createMap(scene) {
    scene.cameras.main.backgroundColor.setTo(154, 208, 58);
    var level = [];
    var isShuffle = false;
    for (let i = 0; i < 37; i++) {
        let wall = [];
        for (let k = 0; k < 62; k++) {
            if (k == 0 || k == 61 || i == 0 || i == 36) {
                wall.push(45)
            } else {
                var rand = random(0,100)
                if (rand < 55){
                    wall.push(46)
                } else if (rand < 65 && rand > 55) {
                    wall.push(45)
                } else {
                    wall.push(20)
                }

            }

        }
        level.push(wall)
    }
    console.log(level)
    const map = scene.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
    const tiles = map.addTilesetImage("map-test");
    const layer = map.createStaticLayer(0, tiles, 0, 0);
}