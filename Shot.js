//ＵＴＦ－８Ｎ
//=============================================================================
// Shot.js
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

//----弾幕クラス----------------------------------------
function Shot(){
    this.initialize.apply(this,arguments);
}
Shot.prototype.initialize = function(parent) {
    this.initMembers(parent);
};
Shot.prototype.initMembers = function(parent){
    this.parent=parent;
    this.x=parent.x;
    this.y=parent.y;
    this.bullet = new Array();
    this.count = 0;
}

Shot.prototype.addBullet = function(b){
    var index = this.bullet.length;
    this.bullet[index] = b;
    SceneManager._scene.AddSprite(b);
}
Shot.prototype.generate = function(){}
//Player_ShotとEnemy_Shotでオーバーライドする
Shot.prototype.collide = function(b){

}
Shot.prototype.update = function(){
    this.generate();
    this.bullet.forEach(function(b){
        this.controlBullet(b);
        b.update();
        this.collide(b);
    }.bind(this));
    this.bullet = this.bullet.filter(function(item,index){
        return item.active;
    });
    this.count++;
}

//弾を操作する関数 ここで弾幕を実装する 引数は弾クラス
Shot.prototype.controlBullet = function(b){
    b.speed=0;
    b.angle=0;
}
