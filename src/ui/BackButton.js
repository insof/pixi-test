import Game from "../Game"
import Menu from "./Menu"
import '../vendor/pixi-4.5.1.js';

class BackButton extends PIXI.Sprite {

    constructor() {
        super();
        this.texture = new PIXI.Texture.from("back_button");
        this.clicked = false;
        this.interactive = true;
        this.buttonMode = true;
        this.anchor.set(0.5);
        this.on("pointerdown", this.operateClick, this);
    }

    operateClick() {
        if(this.clicked) return;
        this.clicked = true;
        Game.i.showWindow(new Menu());
    }
}

export default BackButton;