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
        this.load.audio('pop', 'assets/audio/pop.mp3');
    }

    create() {
        this.score = 0; 
        // Create background
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        // Add player basket
        this.basket = this.physics.add.image(this.scale.width / 2, 630, 'basket');
        this.basket.body.setAllowGravity(false).setCollideWorldBounds(true);
        this.basketGlow = this.basket.postFX.addGlow(0xffffff, 3, 0)

        //input
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        
        this.candyFrames = this.textures.get("candy").getFrameNames();
        this.candyGroup = this.physics.add.group([])
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.spawnRandomCandy,
            callbackScope: this,
        });

    // collision detection
    this.physics.add.overlap(this.basket, this.candyGroup, this.handleBasketCandyCollision, null, this);

    //ui
    const scorePrefix = this.add.text(10, 10, 'Score: ', {
        fontSize: '40px',
        color: '#043D8C',
        stroke: '#ffffff',
        strokeThickness: 6
    });
    this.scoreText = this.add.text(scorePrefix.x + scorePrefix.width, 10, '0', {
        fontSize: '40px',
        color: '#043D8C',
        stroke: '#ffffff',
        strokeThickness: 6
    });

    this.timerText = this.add.text(this.scale.width - 80, 10, '30', {
        fontSize: '60px',
        color: '#043D8C',
        stroke: '#ffffff',
        strokeThickness: 6
    });

    // trigger game over
    this.gameIsOver = false;
    this.timedEvent = this.time.delayedCall(10 * 1000, this.handleGameOver, [], this);

    // fade in camera


    }



    update(){
        if (this.gameIsOver) {
            this.basket.setVelocityX(0);
            return;
        }
        this.timerText.setText(Math.round(this.timedEvent.getRemainingSeconds()).toString(10))

        if(this.cursorKeys.left.isDown) {
            this.basket.setVelocityX(-350)
        } else if (this.cursorKeys.right.isDown){
            this.basket.setVelocityX(350)
        } else {
            this.basket.setVelocityX(0)
        }

        this.candyGroup.getChildren().forEach((child) => {
            if (!child.active){
                return;
            }
            if (child.y > this.scale.height + 10) {
                child.setActive(false).setVisible(false)
            }
        })
    }

    spawnRandomCandy(){
        
        const candy = this.candyGroup.getFirstDead(true, Phaser.Math.RND.between(50, this.scale.width - 50), -20, 'candy')
        candy
        .setScale(0.5)
        .setActive(true)
        .setVisible(true)
        .setVelocity(0)
        .setFrame(Phaser.Utils.Array.GetRandom(this.candyFrames))
        .enableBody();
        // this.physics.add.image(Phaser.Math.RND.between(50, this.scale.width - 50), -20, 'candy', Phaser.Utils.Array.GetRandom(this.candyFrames)).setScale(0.5)
    }

    handleBasketCandyCollision(basket, candy){
        candy.disableBody(true, true);
        if (this.gameIsOver) {
            return;
        }
        this.score += 10;
        this.scoreText.setText(this.score.toString(10))
        console.log(this.score)
        this.sound.play('pop', {
            volume: 0.5
        })
    }

    handleGameOver(){
        this.gameIsOver = true;
        this.scene.start('GameOverScene', {
            score: this.score,
        });
    }

}
