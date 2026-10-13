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
        this.load.atlas('candy', 'assets/spritesheets/candy_spritesheet.png', 'assets/spritesheets/candy_spritesheet.json')
    }

    create() {
        // Create game objects
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.basket = this.physics.add.image(this.scale.width / 2, 630, 'basket');
        this.basket.body.setAllowGravity(false).setCollideWorldBounds(true);
        this.basketGlow = this.basket.postFX.addGlow(0xffffff, 3, 0)

        //input
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        
        this.candyFrames = this.textures.get("candy").getFrameNames();
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.spawnRandomCandy,
            callbackScope: this,
        })
    }

    update(){
        if(this.cursorKeys.left.isDown) {
            this.basket.setVelocityX(-350)
        } else if (this.cursorKeys.right.isDown){
            this.basket.setVelocityX(350)
        } else {
            this.basket.setVelocityX(0)
        }
    }

    spawnRandomCandy(){
        this.physics.add.image(Phaser.Math.RND.between(50, this.scale.width - 50), -20, 'candy', Phaser.Utils.Array.GetRandom(this.candyFrames)).setScale(0.5)
    }

}
