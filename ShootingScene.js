//ＵＴＦ－８Ｎ
//=============================================================================
// ShootingScene.js
//=============================================================================

/*:
 * @plugindesc Shooting Scene
 * @author Masato Orishige
 *
 * @help
 * Plugin Command:
 *
 */

/*:ja
 * @plugindesc シューティングゲーム用シーン
 * @author Masato　Orishige
 *
 * @help
 * プラグインコマンド:
 */

//タイトルでニューゲームを選んだ時の処理
//Scene_MapではなくSceneShootingを呼ぶようにする
Scene_Title.prototype.commandNewGame = function() {
    DataManager.setupNewGame();
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_Shooting);
};

//----Shooting Scene-------------------------------------------------------------

function Scene_Shooting() {
    this.initialize.apply(this, arguments);
}
Scene_Shooting.prototype = Object.create(Scene_Map.prototype);
Scene_Shooting.prototype.constructor = Scene_Shooting;

Scene_Shooting.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    if (this._transfer) {
        this.fadeInForTransfer();
        $gameMap.autoplay();
    } else if (this.needsFadeIn()) {
        this.startFadeIn(this.fadeSpeed(), false);
    }
    this.menuCalling = false;
};

 Scene_Shooting.prototype.update = function() {
    this.updateMainMultiply();
    if (this.isSceneChangeOk()) {
        this.updateScene();
    }
    Scene_Base.prototype.update.call(this);

    //描画対象の更新
    this.updateSpriteset();
};

Scene_Shooting.prototype.updateSpriteset = function(){
    //表示している弾が消えてたら表示しないようにする
    this._spriteset._tilemap.children = this._spriteset._tilemap.children.filter(function(item,index){
        if(item._character!=null){
            if(item._character.active!=null){
                if(item._character.active===false) return false;
            }
        }
        return true;
    })
}
Scene_Shooting.prototype.AddSprite = function(character){
    this._spriteset._tilemap.addChild(new Sprite_Character(character));
}

Scene_Shooting.prototype.updateScene = function() {
    this.checkGameover();
    if (!SceneManager.isSceneChanging()) {
        this.updateTransferPlayer();
    }
    if (!SceneManager.isSceneChanging()) {
        this.updateCallDebug();
    }
};

Scene_Shooting.prototype.createDisplayObjects = function() {
    this.createSpriteset();
    this._sideWindow = new Window_SideMenu(620,0);
    this.addChild(this._sideWindow);
};

//----横にあるウインドウ------------------------------------------------------------

function Window_SideMenu() {
    this.initialize.apply(this, arguments);
}
Window_SideMenu.prototype = Object.create(Window_Selectable.prototype);
Window_SideMenu.prototype.constructor = Window_SideMenu;

Window_SideMenu.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y,width,height);
    this._message = new Array();
    this.loadImages();
    this.refresh();
    this.activate();
};

Window_SideMenu.prototype.windowWidth = function() {
    return Graphics.boxWidth-620;
};

Window_SideMenu.prototype.windowHeight = function() {
    return Graphics.boxHeight;
};

Window_SideMenu.prototype.loadImages = function() {
};

Window_SideMenu.prototype.refresh = function() {
    this.contents.clear();
	this.drawText("test",0,0,Graphics.boxWidth);
};

