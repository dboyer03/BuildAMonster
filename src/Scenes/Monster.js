class Monster extends Phaser.Scene {
    constructor() {

        super("monsterScene");
        // Create an object to hold sprite bindings
        this.my = {sprite: {}};  

        //Polling input: peace hand
        this.aKey = null;
        this.dKey = null;

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        // Define the locations of the smile and hands relative to the
        // main body location. This way, if we change the main body
        // location, the other values update too.
        
        // mouth
        this.smileX = this.bodyX;
        this.smileY = this.bodyY + 20;

        // arms
        this.leftArmX = this.bodyX - 105;
        this.leftArmY = this.bodyY + 60;

        this.rightArmX = this.bodyX + 105;
        this.rightArmY = this.bodyY + 60;

        // legs
        this.leftLegX = this.bodyX - 70;
        this.leftLegY = this.bodyY + 150;

        this.rightLegX = this.bodyX + 70;
        this.rightLegY = this.bodyY + 150;

        // eyes
        this.leftEyeX = this.bodyX - 40;
        this.leftEyeY = this.bodyY - 40;

        this.rightEyeX = this.bodyX + 40;
        this.rightEyeY = this.bodyY - 40;

        // ears
        this.leftEarX = this.bodyX - 15;
        this.leftEarY = this.bodyY + 60;

        this.rightEarX = this.bodyX + 15;
        this.rightEarY = this.bodyY + 60; 
        
        this.counter = 0;
        this.smileType = 'Smile';
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");

        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {

        let my = this.my;   // create an alias to this.my for readability

        
        // create the main body sprite
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_darkF.png");

        // mouth sprites
        my.sprite.smile = this.add.sprite(this.smileX, this.smileY, "monsterParts", "mouthA.png");
        my.sprite.fangs = this.add.sprite(this.smileX, this.smileY, "monsterParts", "mouthB.png");
        // Since sprites are visible when created and we only want one smile to be shown
        // at a time, make the "fangs" smile not visible to start.
        my.sprite.fangs.visible = false;
        
        // arm sprites
        my.sprite.leftArm = this.add.sprite(this.leftArmX, this.leftArmY, "monsterParts", "arm_greenE.png");
        my.sprite.leftArm.flipX = true;   // flip sprite to have thumb on correct side
        my.sprite.rightArm = this.add.sprite(this.rightArmX, this.rightArmY, "monsterParts", "arm_greenE.png");
        my.sprite.rightArm.angle -= 30;
        my.sprite.leftArm.angle += 30;


        // leg sprites
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_greenC.png");
        my.sprite.leftLeg.flipX = true;   // flip sprite to have thumb on correct side
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_greenC.png");

        // ear sprites
        my.sprite.leftEar = this.add.sprite(this.leftEarX, this.leftEarY, "monsterParts", "detail_green_ear.png");
        my.sprite.leftEar.flipX = true;   // flip sprite to have thumb on correct side
        my.sprite.rightEar = this.add.sprite(this.rightEarX, this.rightEarY, "monsterParts", "detail_green_ear.png");

        // eye sprites
        my.sprite.leftEye = this.add.sprite(this.leftEyeX, this.leftEyeY, "monsterParts", "eye_yellow.png");
        my.sprite.leftEye.flipX = true;   // flip sprite to have thumb on correct side
        my.sprite.rightEye = this.add.sprite(this.rightEyeX, this.rightEyeY, "monsterParts", "eye_yellow.png");

        

        //Polling input: peace hand
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //Event input: fangs
        let fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
	    fKey.on('down', (key, event) => {
            my.sprite.smile.visible = false;
            my.sprite.fangs.visible = true; 
	    });

        //Event input: smile
        let sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	    sKey.on('down', (key, event) => {
            my.sprite.smile.visible = true;
            my.sprite.fangs.visible = false; 
	    });
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        // Polling input: a key 
        if (this.aKey.isDown) {
		    for (let part in my.sprite){
                my.sprite[part].x -= 5;
            }
	    } 

        // Polling input: d key 
        if (this.dKey.isDown) {
            for (let part in my.sprite){
                my.sprite[part].x += 5;
            }
        }
    }

}