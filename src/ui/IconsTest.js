import Layout from "../utils/Layout"

import '../vendor/pixi-4.5.1.js';
import BackButton from "./BackButton";
import Mixer from "./Mixer";
import {Tween, autoPlay} from 'es6-tween'

let INACTIVITY_TIMEOUT = 2000;

class IconsTest extends PIXI.Sprite {

    constructor() {
        super();

        this.itemsConfig = [{type: "text", data: "Bench"}, {type: "text", data: "Bicycle"}, {
            type: "text",
            data: "Building"
        }, {type: "text", data: "Car"}, {type: "text", data: "Cart"}, {type: "text", data: "Coffee"}, {
            type: "text",
            data: "Headphones"
        }, {type: "text", data: "House"}, {type: "text", data: "Map"}, {type: "text", data: "Spray"}, {
            type: "image",
            data: "UrbanStories/Bench"
        }, {type: "image", data: "UrbanStories/Bicycle"}, {type: "image", data: "UrbanStories/Building"}, {
            type: "image",
            data: "UrbanStories/Car"
        }, {type: "image", data: "UrbanStories/Cart"}, {type: "image", data: "UrbanStories/Coffee"}, {
            type: "image",
            data: "UrbanStories/Headphones"
        }, {type: "image", data: "UrbanStories/House"}, {type: "image", data: "UrbanStories/Map"}, {
            type: "image",
            data: "UrbanStories/Spray"
        }];

        autoPlay(true);
        this.items = [];
        this.back = this.addChild(new PIXI.Sprite.from("milky-way"));
        this.back.anchor.set(0.5);
        this.back.interactive = true;
        this.back.buttonMode = true;

        this.text = this.addChild(new PIXI.Text("Click to spawn more!", {
            fontFamily: "Arcade",
            fill: 0xffffff,
            fontSize: 80,
            fontWeight: 800,
            dropShadow: true
        }));
        this.text.anchor.set(0.5);

        this.timeout = INACTIVITY_TIMEOUT;

        this.backBtn = this.addChild(new BackButton());
        this.backBtn.scale.set(0.5);

        this.back.on("pointerdown", this.operateClick, this);
    };

    createMixerItem(e) {
        let itemArray = [];
        for (let i = 0; i < 3; i++) {
            itemArray.push(this.itemsConfig[this.randomInteger(0, this.itemsConfig.length - 1)]);
        }

        let item = this.addChild(new Mixer(itemArray));
        let pos = this.toLocal(new PIXI.Point(e.data.global.x, e.data.global.y));
        item.position.set(pos.x - item.w/2, pos.y);
        this.items.push(item);
        item.tweenAlpha = new Tween(item).to({alpha: 0}, 2000).start();
        item.tweenPos = new Tween(item.position).to({
            x: item.position.x + this.randomInteger(-100, 100),
            y: item.position.y + this.randomInteger(-100, 100)
        }, 2000);
        item.tweenAlpha.on('complete', (e) => {
            this.removeChild(e);
            this.items.splice(this.items.indexOf(e), 1);
        });
        item.tweenPos.start();

    };

    operateClick(e) {
        this.timeout = INACTIVITY_TIMEOUT;
        this.createMixerItem(e);
    };

    randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    };

    onResize() {
        if (Layout.orientation === Layout.LANDSCAPE) {
            this.back.width = Layout.gameWidth;
            this.back.height = Layout.gameHeight;
        } else {
            this.back.height = Layout.gameHeight;
            this.back.scale.x = this.back.scale.y;
        }

        this.backBtn.position.set(Layout.gameWidth / 2 - this.backBtn.width / 2 - 30, -Layout.gameHeight / 2 + this.backBtn.height / 2 + 30);
        this.text.position.set(0, Layout.gameHeight/2-this.text.getLocalBounds().height/2);
    };

    tick(delta) {
        if (this.timeout > 0) {
            this.timeout -= delta;
        } else {
            this.timeout += INACTIVITY_TIMEOUT;
            this.createMixerItem({data: {global: {x: Layout.gameWidth / 2, y: Layout.gameHeight / 2}}});
        }
    };

}

export default IconsTest;