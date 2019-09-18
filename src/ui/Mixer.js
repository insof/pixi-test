import '../vendor/pixi-4.5.1.js';

class Mixer extends PIXI.Sprite {
    constructor(elems) {
        super();
        this.w = 0;
        this.h = 0;

        this.back = this.addChild(new PIXI.Graphics());
        this.items = [];
        for (let obj of elems) {
            let item;
            if (obj.type === "image") {
                item = new PIXI.Sprite.from(obj.data);
            } else {
                item = new PIXI.Text(obj.data, {
                    fontFamily: "Arcade",
                    fill: 0x00ffff,
                    fontSize: 20 + Math.floor(80 * Math.random()),
                    dropShadow: true
                });
                item.anchor.set(0.5);
            }
            item.anchor.set(0, 0.5);
            this.items.push(item);
        }

        for (let i = 0; i < this.items.length; i++) {
            let sp = this.items[i];
            let x = 0;
            let y = 0;
            if (i) x = this.items[i - 1].x + this.items[i - 1].getLocalBounds().width + 5;
            sp.position.set(x, y);

            this.w += sp.getLocalBounds().width;
            this.h = (this.h < sp.getLocalBounds().height) ? sp.getLocalBounds().height : this.h;
            this.addChild(sp);
        }

        this.back.beginFill(0x000000, 0.5);
        this.back.drawRect(0, -this.h / 2, this.w, this.h);
        this.back.endFill();
    }
}

export default Mixer;
