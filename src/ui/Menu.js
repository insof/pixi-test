import Game from "../Game"
import Layout from "../utils/Layout"
import CardsTest from "./CardsTest"
import FireTest from "./FireTest"
import IconsTest from "./IconsTest"

import '../vendor/pixi-4.5.1.js';

class Menu extends PIXI.Sprite {

    constructor() {
        super();

        this.buttonsConfig = [{name: "Cards", exec: "showCardsTest"}, {name: "Icons", exec: "showIconsTest"}, {name: "Fire", exec: "showFireTest"}];
        this.buttons = [];
        this.clicked = false;
        this.back = this.addChild(new PIXI.Sprite.from("unicorn-back"));
        this.back.anchor.set(0.5);
        this.showButtons();
    }

    showButtons() {
        for (let i = 0; i < this.buttonsConfig.length; i++) {
            let button = this.addChild(new PIXI.Sprite.from("button"));
            button.anchor.set(0.5);
            button.interactive = true;
            button.buttonMode = true;
            button.exec = this.buttonsConfig[i].exec;
            let text = button.addChild(new PIXI.Text(this.buttonsConfig[i].name, {
                fontFamily: "Arcade",
                fill: 0xffffff,
                fontSize: 100,
                fontWeight: 800,
                dropShadow: true
            }));
            text.anchor.set(0.5);
            text.y+=20;

            button.position.set(0, -300 + (300 * i));
            button.on("pointerdown", this.operateClick, this);
        }


    }

    showCardsTest() {
        Game.i.showWindow(new CardsTest());
    }

    showIconsTest() {
        Game.i.showWindow(new IconsTest());
    }

    showFireTest() {
        Game.i.showWindow(new FireTest());
    }

    operateClick(e) {
        if(this.clicked) return;
        this.clicked = true;
        this[e.target.exec]();
    }

    onResize() {
        if (Layout.orientation === Layout.LANDSCAPE) {
            this.back.width = Layout.gameWidth;
            this.back.height = Layout.gameHeight;
        } else {
            this.back.height = Layout.gameHeight;
            this.back.scale.x = this.back.scale.y;
        }
    }

}

export default Menu;