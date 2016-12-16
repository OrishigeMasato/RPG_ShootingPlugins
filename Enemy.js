//ＵＴＦ－８Ｎ
//=============================================================================
// Enemy.js
//=============================================================================

/*:
 * @plugindesc Enemy
 * @author Masato Orishige
 *
 * @help
 * Plugin Command:
 *
 */

/*:ja
 * @plugindesc 敵を生成する
 * @author Masato　Orishige
 *
 * @help
 * プラグインコマンド:
 */

var oldGameMapInitialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    oldGameMapInitialize.call(this);
    this.shots = [];
    this.enemies = [];
    this.count=0;
};

Game_Map.prototype.update = function(sceneActive) {
    this.refreshIfNeeded();
    if (sceneActive) {
        this.updateInterpreter();
    }
    this.updateScroll();
    this.updateEvents();
    this.updateShots();
    this.updateEnemies();
    this.updateParallax();
    if(this.count<300 && this.count % 60 ===59){
        this.addEnemy(new Game_CommonEnemy(1+2*this.count/60,-1));
    }
    this.count++;
};

Game_Map.prototype.addEnemy = function(enemy){
    this.enemies.push(enemy);
    SceneManager._scene.AddSprite(enemy);
}

Game_Map.prototype.updateShots = function(){
    this.shots.forEach(function(shot){
        shot.update();
    })
}
Game_Map.prototype.updateEnemies = function(){
    this.enemies.forEach(function(enemy){
        enemy.update();
    })
    this.enemies = this.enemies.filter(function(item,index){
        return item.active;
    });
}

//----敵のbaseクラス------------------------------------------------
 function Game_Enemy() {
    this.initialize.apply(this, arguments);
}
Game_Enemy.prototype = Object.create(Game_Event.prototype);
Game_Enemy.prototype.constructor = Game_Enemy;

Game_Enemy.prototype.initialize = function(x,y) {
    Game_Character.prototype.initialize.call(this);
    this.locate(x,y);
    this.active=true;
    this.initParam();

    this.refresh();
};

Game_Enemy.prototype.initParam = function(){
    this.speed=0.1;
    this.angle=0;
    this.range=0;
    this.count=0;
}

Game_Enemy.prototype.update = function() {
    Game_Character.prototype.update.call(this);
    this.move();
    this.setPosition(this._realX+Math.cos(this.angle)*this.speed,this._realY-Math.sin(this.angle)*this.speed);
    if(this._realY < -2){
        this.active=false;
    }
    this.count++;
};

Game_Enemy.prototype.move = function(){

}

Game_Enemy.prototype.refresh = function() {
    this.setupPage();
};

Game_Enemy.prototype.setupPage = function() {
    this.setupPageSettings();
    this.refreshBushDepth();
    this.clearStartingFlag();
    this.checkEventTriggerAuto();
};

Game_Enemy.prototype.setupPageSettings = function() {
    this.setImageData();
    this.setDirectionFix(false);
    this.setDirection(this._originalDirection);

    this.setPattern(this._originalPattern);

    this.setMoveSpeed(0);
    this.setMoveFrequency(3);
    this.setPriorityType(1);
    this.setWalkAnime(true);
    this.setStepAnime(false);
    this.setThrough(false);
    this._moveType = 0;
    this._trigger = 0;
    this._interpreter = null;
};

Game_Enemy.prototype.setImageData = function(){
    this.setImage("!Flame", 5);
    this._originalDirection = 2;//縦軸 2,4,6,8の順で上から1,2,3,4番目の行になる
    this._originalPattern = 2;//横軸 こっちは普通に指定番目の列になる
}

//----通常敵-------------------------------------------------------------
function Game_CommonEnemy() {
    this.initialize.apply(this, arguments);
}
Game_CommonEnemy.prototype = Object.create(Game_Enemy.prototype);
Game_CommonEnemy.prototype.constructor = Game_CommonEnemy;

Game_CommonEnemy.prototype.setImageData = function(){
    this.setImage("Monster", 0);
    this._originalDirection=2;//縦軸 2,4,6,8の順で上から1,2,3,4番目の行になる
    this._originalPattern = 0;//横軸 こっちは普通に指定番目の列になる
}

Game_CommonEnemy.prototype.initParam = function(){
    this.speed=0.1;
    this.angle=0;
    this.range=0;
    this.count=0;
    this.distAngle=-Math.PI/2;
}

Game_CommonEnemy.prototype.move = function(){
    if(this.count<30){
        this.angle=-Math.PI/2;
    }
    if(this.count===30){
        this.speed=0;
        $gameMap.shots.push(new Enemy_Shot(this));
    }
    if(this.count>120){
        this.angle=Math.PI/2;
        this.speed=0.1;
    }
}