// "Every great game begins with a single scene. Let's make this one unforgettable!"
export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init() {
        // Initialize scene
    }

    preload() {
        // Load assets
        this.load.image('background', 'assets/images/background.jpg');
        this.load.image('basket', 'assets/images/basket.png');
    }

    create() {
        // Create game objects
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.basket = this.physics.add.image(this.scale.width / 2, 630, 'basket');
        this.basket.body.setAllowGravity(false)
        this.basketGlow = this.basket.postFX.addGlow(0xffffff, 3, 0)
    }

}
