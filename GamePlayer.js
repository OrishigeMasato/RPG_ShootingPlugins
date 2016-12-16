//ＵＴＦ－８Ｎ
//=============================================================================
// GamePlayer.js
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

//----プレイヤーのショット---------------------------------------------------
function Player_Shot() {
    this.initialize.apply(this, arguments);
}
Player_Shot.prototype = Object.create(Shot.prototype);
Player_Shot.prototype.constructor = Player_Shot;

Player_Shot.prototype.controlBullet = function(b){
    b.speed=0.3;
    b.angle=Math.PI/2;
}
Player_Shot.prototype.collide = function(b){
    if(b.active===true){
        $gameMap.enemies.forEach(function(enemy){
            var dX = enemy._realX-b._realX;
            var dY = enemy._realY-b._realY;
            if(dX*dX + dY*dY < b.range*b.range){
                b.active=false;
            }
        })
    }
}

//----プレイヤー周り-------------------------------------------
var oldInitMember = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    oldInitMember.call(this);
    this._direction=8;
    this.shot = new Player_Shot(this);
};


Game_Player.prototype.update = function(sceneActive) {
    if (sceneActive) {
        this.moveByInput();
        this.generateEvent();
        this.shot.update();
    }
};

//弾を生成する
Game_Player.prototype.generateEvent = function() {
    var ok = Input.isTriggered('ok');
    if(ok){
        this.shot.addBullet(new Game_PlayerBullet(this._realX,this._realY,Math.PI/2,true));
    }
}

Game_Player.prototype.getInputDirection = function() {
    return Input.dir8;
};
Game_Player.prototype.moveByInput = function() {
    var direction = this.getInputDirection();
    if (direction > 0) {
        this.executeMove(direction);
    }
};

Game_Map.prototype.xWithDirection = function(x, d) {
    if(d===4){
        return x+-1/10;
    }
    if(d===1 || d===7){
        return x+-1/14;
    }
    if(d===6){
        return x+1/10;
    }
    if(d===3 || d===9){
        return x+1/14;
    }
    return x;
};

Game_Map.prototype.yWithDirection = function(y, d) {
    if(d===8){
        return y+-1/10;
    }
    if(d===7 || d===9){
        return y+-1/14;
    }
    if(d===2){
        return y+1/10;
    }
    if(d===1 || d===3){
        return y+1/14;
    }
    return y;
};

Game_Player.prototype.canPass = function(x, y, d) {
    var x2 = $gameMap.xWithDirection(x, d);
    var y2 = $gameMap.yWithDirection(y, d);
    if(x2<0.2 || x2>11.8){
        return false;
    }
    if(y2<0.2 || y2>11.8){
        return false;
    }
    return true;
};

Game_Player.prototype.moveStraight = function(d) {
    this._realX = $gameMap.xWithDirection(this._realX, d);
    this._realY = $gameMap.yWithDirection(this._realY, d);
    this._x = this._realX;
    this._y = this._realY;
    this.increaseSteps();
};
/*
Game_Player.prototype.setDirection = function(direction) {
    this._direction=8;
};
*/