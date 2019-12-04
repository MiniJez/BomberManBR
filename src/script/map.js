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


const BLOCK = 45;  
function createMap(scene) {
    scene.cameras.main.backgroundColor.setTo(154, 208, 58);
    var level = [];
    var isShuffle = false;
    for (let i = 0; i < 18; i++) {
        let wall = [];
        for (let k = 0; k < 31; k++) {
            if (k == 0 || k == 30 || i == 0 || i == 17) {
                wall.push(BLOCK)
            } else {
                var rand = random(0,100)
                if (rand < 55){
                    wall.push(46)
                } else if (rand < 60 && rand > 55) {
                    wall.push(BLOCK)
                } else {
                    wall.push(20)
                }

            }

        }
        level.push(wall)
    }
    const map = scene.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
    const tiles = map.addTilesetImage("map-test");

    const layer = map.createStaticLayer(0, tiles, 0, 0).setScale(2);


}