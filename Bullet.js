//ＵＴＦ－８Ｎ
//=============================================================================
// Bullet.js
//=============================================================================

/*:
 * @plugindesc Shoot Bullet
 * @author Masato Orishige
 *
 * @help
 * Plugin Command:
 *
 */

/*:ja
 * @plugindesc 弾を撃つ機能
 * @author Masato　Orishige
 *
 * @help
 * プラグインコマンド:
 */

Sprite_Character.prototype.updateOther = function() {
    this.opacity = this._character.opacity();
    this.blendMode = this._character.blendMode();
    this._bushDepth = this._character.bushDepth();

    if(typeof(this._character.distAngle!="undefined")){
        this.rotation=this._character.distAngle+Math.PI/2;
    }
};

//----弾のbasicクラス-----------------------------------------------
function Game_Bullet() {
    this.initialize.apply(this, arguments);
}
Game_Bullet.prototype = Object.create(Game_CharacterBase.prototype);
Game_Bullet.prototype.constructor = Game_Bullet;

Game_Bullet.prototype.initialize = function(x,y,angle,player) {
    Game_CharacterBase.prototype.initialize.call(this);
    this.locate(x,y);
    this.player=player;
    this.active=true;

    this.speed=0;
    this.angle=angle;
    this.setParams();
    this.count=0;

    this.refresh();
};
Game_Bullet.prototype.setParams = function(){
    this.range=1;
}

Game_Bullet.prototype.update = function() {
    this.setPosition(this._realX+Math.cos(this.angle)*this.speed,this._realY-Math.sin(this.angle)*this.speed);
    if(this._realY < -2){
        this.active=false;
    }
    this.count++;
};

Game_Bullet.prototype.refresh = function() {
    this.setImageData();
    this.setDirectionFix(false);
    this.setDirection(this._originalDirection);

    this.setPattern(this._originalPattern);

    this.setMoveSpeed(0);
    this.setMoveFrequency(3);

    this.refreshBushDepth();
};

Game_Bullet.prototype.setImageData = function(){
    this.setImage("!Frame", 6);
    this._originalDirection=2;//縦軸 2,4,6,8の順で上から1,2,3,4番目の行になる
    this._originalPattern = 2;//横軸 こっちは普通に指定番目の列になる
}

//----通常弾-------------------------------------------------------------
function Game_PlayerBullet() {
    this.initialize.apply(this, arguments);
}
Game_PlayerBullet.prototype = Object.create(Game_Bullet.prototype);
Game_PlayerBullet.prototype.constructor = Game_PlayerBullet;

Game_PlayerBullet.prototype.setImageData = function(){
    this.setImage("!Flame", 6);
    this._originalDirection=2;//縦軸 2,4,6,8の順で上から1,2,3,4番目の行になる
    this._originalPattern = 0;//横軸 こっちは普通に指定番目の列になる
}
Game_PlayerBullet.prototype.setParams = function(){
    this.range=0.3;
}
//----炎弾---------------------------------------------------------------
function Game_FlameBullet() {
    this.initialize.apply(this, arguments);
}
Game_FlameBullet.prototype = Object.create(Game_Bullet.prototype);
Game_FlameBullet.prototype.constructor = Game_FlameBullet;

Game_FlameBullet.prototype.setImageData = function(){
    this.setImage("!Flame", 4);
    this._originalDirection=2;//縦軸 2,4,6,8の順で上から1,2,3,4番目の行になる
    this._originalPattern = 0;//横軸 こっちは普通に指定番目の列になる
}
Game_FlameBullet.prototype.setParams = function(){
    this.range=0.3;
}




