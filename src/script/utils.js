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

    return key
}