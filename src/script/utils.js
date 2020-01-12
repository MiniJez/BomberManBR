const initKey = (scene, key) => {
    key.z = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    key.q = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    key.s = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    key.d = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    key.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    key.left = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    key.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    key.right = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    key.space = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    key.five = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE);
    key.p = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    
    return key
}

const snapToGrid = ({ x, y }) => {
    let gridCubeWidth = 32, gridCubeHeight = 32;

    let posx = Math.round((x-16) / gridCubeWidth) * gridCubeWidth + 16;
    let posy = Math.round((y-16) / gridCubeHeight) * gridCubeHeight + 16;

    return {x: posx, y: posy}
}