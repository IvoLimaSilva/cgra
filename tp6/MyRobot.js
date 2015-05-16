/**
 * MyRobot
 * @constructor
 */

var degToRad = Math.PI / 180.0;

function MyRobot(scene, initX, initZ, initAngle) {
    CGFobject.call(this, scene);

    this.initBuffers();

    this.posX = initX;
    this.posZ = initZ;

    this.angle = initAngle;

    // Object constructors
    this.head = new MyLamp(this.scene, 20, 20);
    this.body = new MyCoveredCylinder(this.scene, 10, 20);
    this.wheelL = new MyWheel(this.scene, 10, 5);
    this.wheelR = new MyWheel(this.scene, 10, 5);
    this.base = new MyUnitCubeQuad(this.scene);
    this.armL = new MyCoveredCylinder(this.scene, 10, 20);
    this.armR = new MyCoveredCylinder(this.scene, 10, 20);

    // Appearances
    
    // Head Appearance
    /*
    this.headAppearance = new CGFappearance(this.scene);
    this.headAppearance.setAmbient(0.3, 0.3, 0.3, 1);
    this.headAppearance.setDiffuse(0, 1, 0.7, 1);
    this.headAppearance.setSpecular(0.15, 0.15, 0.15, 1);
    this.headAppearance.setShininess(10);
    this.headAppearance.loadTexture("../resources/images/r2d2.png");
    this.headAppearance.setTextureWrap("REPEAT", "REPEAT");
    */

    // Body Appearances
    // Body Appearance 1
    this.bodyAppearance1 = new CGFappearance(this.scene);
    this.bodyAppearance1.setAmbient(0.3, 0.3, 0.3, 1);
    this.bodyAppearance1.setDiffuse(0, 1, 0.7, 1);
    this.bodyAppearance1.setSpecular(0.15, 0.15, 0.15, 1);
    this.bodyAppearance1.setShininess(10);

    //Body Appearance 2
    this.bodyAppearance2 = new CGFappearance(this.scene);
    this.bodyAppearance2.setAmbient(0.3, 0.3, 0.3, 1);
    this.bodyAppearance2.setDiffuse(0.8, 0.1, 0.2, 1);
    this.bodyAppearance2.setSpecular(0.15, 0.15, 0.15, 1);
    this.bodyAppearance2.setShininess(10);

    // Arm Appearances
    // Arm Appearance 1
    this.armAppearance1 = new CGFappearance(this.scene);
    this.armAppearance1.setAmbient(0.3, 0.3, 0.3, 1);
    this.armAppearance1.setDiffuse(0.1, 0.3, 1, 1);
    this.armAppearance1.setSpecular(0.15, 0.15, 0.15, 1);
    this.armAppearance1.setShininess(10);

    // Arm Appearance 2
    this.armAppearance2 = new CGFappearance(this.scene);
    this.armAppearance2.setAmbient(0.3, 0.3, 0.3, 1);
    this.armAppearance2.setDiffuse(0.8, 0.3, 0.2, 1);
    this.armAppearance2.setSpecular(0.15, 0.15, 0.15, 1);
    this.armAppearance2.setShininess(10);

    // Arm Appearance 3
    this.armAppearance3 = new CGFappearance(this.scene);
    this.armAppearance3.setAmbient(0.4, 0.4, 0.4, 1);
    this.armAppearance3.setDiffuse(0, 0, 0, 1);
    this.armAppearance3.setSpecular(0.15, 0.15, 0.15, 1);
    this.armAppearance3.setShininess(10);

    // Array to choose appearances in GUI
    this.armAppearances = [this.armAppearance1, this.armAppearance2, this.armAppearance3];
    this.armAppearancesList = {
        "Cyan": "0",
        "Orange": "1",
        "Black": "2"
    };

    this.bodyAppearances = [this.bodyAppearance1, this.bodyAppearance2];
    this.bodyAppearancesList = {
        "Blue": "0",
        "Red": "1"
    };
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor = MyRobot;

MyRobot.prototype.incPos = function (increase) {

    this.posX += increase * Math.sin(this.angle);
    this.posZ += increase * Math.cos(this.angle);

}

MyRobot.prototype.incRotate = function (sig) {

    this.angle += sig * 5 * degToRad;

}

MyRobot.prototype.display = function () {
    //For all parts
    this.scene.translate(this.posX, 0, this.posZ);
    this.scene.rotate(this.angle, 0, 1, 0);

    //Head
    this.scene.pushMatrix();
    this.scene.translate(0, 1.8, 0);
    this.scene.rotate(-90 * degToRad, 1, 0, 0);
    this.scene.scale(0.3, 0.3, 0.5);
    // this.scene.materialDefault.apply();
    this.head.display();
    this.scene.popMatrix();

    //Body
    this.scene.pushMatrix();
    this.scene.translate(0, 0.30, 0);
    this.scene.rotate(-90 * degToRad, 1, 0, 0);
    this.scene.scale(0.1, 0.1, 1.5);
    this.bodyAppearances[this.bodyAppearancesList[this.scene.robotBodyAppearance]].apply();
    this.body.display();
    this.scene.popMatrix();

    //Wheel left
    this.scene.pushMatrix();
    this.scene.translate(0.25, 0.25, 0);
    this.scene.rotate(90 * degToRad, 0, 1, 0);
    this.scene.scale(0.25, 0.25, 0.25);
    this.wheelL.display();
    this.scene.popMatrix();

    //Wheel right
    this.scene.pushMatrix();
    this.scene.translate(-0.25, 0.25, 0);
    this.scene.rotate(-90 * degToRad, 0, 1, 0);
    this.scene.scale(0.25, 0.25, 0.25);
    this.wheelR.display();
    this.scene.popMatrix();

    //Base
    this.scene.pushMatrix();
    this.scene.translate(0, 0.25, 0);
    this.scene.scale(0.5, 0.1, 0.3);
    this.scene.materialDefault.apply();
    this.base.display();
    this.scene.popMatrix();

    //Arm left
    this.scene.pushMatrix();
    this.scene.translate(0.15, 1.2, 0);
    this.scene.rotate(90 * degToRad, 1, 0, 0);
    this.scene.scale(0.05, 0.05, 0.5);
    this.armAppearances[this.armAppearancesList[this.scene.robotArmAppearance]].apply();
    this.armL.display();
    this.scene.popMatrix();

    //Arm right
    this.scene.pushMatrix();
    this.scene.translate(-0.15, 1.2, 0);
    this.scene.rotate(90 * degToRad, 1, 0, 0);
    this.scene.scale(0.05, 0.05, 0.5);
    this.armAppearances[this.armAppearancesList[this.scene.robotArmAppearance]].apply();
    this.armR.display();
    this.scene.popMatrix();
}