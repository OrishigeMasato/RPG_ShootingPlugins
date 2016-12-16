//ＵＴＦ－８Ｎ
//=============================================================================
// EnemyShot.js
//=============================================================================

/*:
 * @plugindesc Enemy Shot
 * @author Masato Orishige
 *
 * @help
 * Plugin Command:
 *
 */

/*:ja
 * @plugindesc 敵の攻撃のデータ
 * @author Masato　Orishige
 *
 * @help
 * プラグインコマンド:
 */

function Enemy_Shot() {
    this.initialize.apply(this, arguments);
}
Enemy_Shot.prototype = Object.create(Shot.prototype);
Enemy_Shot.prototype.constructor = Player_Shot;

Enemy_Shot.prototype.controlBullet = function(b){
    b.speed=0.05;
}
Enemy_Shot.prototype.generate = function(){
    if(this.count===10){
        for(var i=0;i<10;i++){
            this.addBullet(new Game_FlameBullet(this.x,this.y,Math.PI/5*i,false));
        }
    }
}
Enemy_Shot.prototype.collide = function(b){
    if(b.active===true){
        var dX = $gamePlayer._realX-b._realX;
        var dY = $gamePlayer._realY-b._realY;
        var range = b.range;
        if(dX<range || dY < range){//まずdXとdYでふるいにかける
            if(dX*dX + dY*dY < b.range*b.range){
                b.active=false;
            }
        }
    }
}