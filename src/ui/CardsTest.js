import Layout from "../utils/Layout"
import BackButton from "./BackButton"
import '../vendor/pixi-4.5.1.js';
import {Tween, Easing, autoPlay} from 'es6-tween'

let FLY_TIMEOUT = 2000;

class CardsTest extends PIXI.Sprite {

    constructor() {
        super();
        this.cardsLeft = [];
        this.cardsRight = [];
        this.timeout = FLY_TIMEOUT;
        autoPlay(true);

        this.back = this.addChild(new PIXI.Sprite.from("back"));
        this.back.anchor.set(0.5);

        this.backBtn = this.addChild(new BackButton());
        this.backBtn.scale.set(0.5);


        this.showCards();
    }

    showCards() {


        this.cardsCont = this.addChild(new PIXI.Sprite());
        this.cardsCont.anchor.set(0.5);


        for (let i = 0; i < 144; i++) {
            let card = this.cardsCont.addChild(new PIXI.Sprite.from("blank-card-md"));
            card.anchor.set(0.5);
            card.scale.set(0.3);
            card.zIndex = i + 1;
            let text = card.addChild(new PIXI.Text(i + 1, {
                fontFamily: "Arcade",
                fill: 0x000000,
                fontSize: 100,
                fontWeight: 800,
                dropShadow: true
            }));
            text.anchor.set(0.5);
            text.y += 20;

            card.position.set(-430 + (i * 5), -280 + (i * 5));
            this.cardsLeft.push(card);
        }

    }

    cardFly() {
        let card = this.cardsLeft.pop();
        let endX, endY;
        if (this.cardsRight.length) {
            endX = this.cardsRight[this.cardsRight.length - 1].x + 5;
            endY = this.cardsRight[this.cardsRight.length - 1].y + 5;
        } else {
            endX = -230;
            endY = -280;
        }
        card.tween = new Tween(card.position).to({x: endX, y: endY}, 2000);
        card.tween.easing(Easing.Elastic.InOut);
        card.tween.start();
        card.zIndex += this.cardsRight.length * 2;
        this.updatezOrder();
        this.cardsRight.push(card);
    }

    updatezOrder() {
        this.cardsCont.children.sort(function (a, b) {
            a.zIndex = a.zIndex || 0;
            b.zIndex = b.zIndex || 0;
            return (a.zIndex - b.zIndex);
        });
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
    }

    tick(delta) {
        if (this.timeout > 0) {
            this.timeout -= delta
        } else {
            this.timeout += FLY_TIMEOUT;
            this.cardFly();
        }
    }

}

export default CardsTest;