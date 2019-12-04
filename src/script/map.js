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
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function corner(i, k) {
    var corner = [[1, 1], [1, 29], [16, 1], [16, 29]]
    var corner2 = [[1, 2], [1, 28], [16, 2], [16, 28]]
    var corner3 = [[2, 1], [2, 29], [15, 1], [15, 29]]
    for (let j = 0; j < corner.length; j++) {
        if (corner[j][0] == i && corner[j][1] == k) {
            return true
        }
        if (corner2[j][0] == i && corner2[j][1] == k) {
            return true
        }
        if (corner3[j][0] == i && corner3[j][1] == k) {
            return true
        }
    }
}

const BLOCK = 45;
const GRASS = 20;
const BRICK = 46;

function createMap(scene) {
    scene.cameras.main.backgroundColor.setTo(154, 208, 58);
    var level = [];
    for (let i = 0; i < 18; i++) {
        let wall = [];
        for (let k = 0; k < 31; k++) {
            if (k == 0 || k == 30 || i == 0 || i == 17) {
                wall.push(BLOCK)
            } else if (corner(i, k)) {
                wall.push(GRASS)
            } else {
                var rand = random(0, 100)
                if (rand < 55) {
                    wall.push(BRICK)
                } else if (rand < 60 && rand > 55) {
                    wall.push(BLOCK)
                } else {
                    wall.push(GRASS)
                }
            }
        }
        level.push(wall)
    }
    const map = scene.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
    const tiles = map.addTilesetImage("map-test");

    const layer = map.createStaticLayer(0, tiles, 0, 0).setScale(2);


}