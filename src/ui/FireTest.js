import Layout from "../utils/Layout"
import Particle from "../utils/Particle"

import '../vendor/pixi-4.5.1.js';
import BackButton from "./BackButton";

class FireTest extends PIXI.Sprite {

    constructor() {
        super();

        this.particles = [];
        this.canvas = document.createElement("canvas");

        this.canvas.width = Layout.gameWidth;
        this.canvas.height = Layout.gameHeight;

        this.ctx = this.canvas.getContext("2d");

        this.particles_count = 10;
        for (let i = 0; i < this.particles_count; i++) {
            this.particles.push(new Particle());
        }

        this.back = this.addChild(new PIXI.Sprite.from(this.canvas));
        this.back.anchor.set(0.5);

        this.backBtn = this.addChild(new BackButton());
        this.backBtn.scale.set(0.5);
    }

    redraw() {

        this.ctx.globalCompositeOperation = "source-over";
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0, 0, Layout.gameWidth, Layout.gameHeight);
        this.ctx.globalCompositeOperation = "lighter";

        for (let i = 0; i < this.particles.length; i++) {
            let part = this.particles[i];
            this.ctx.beginPath();
            part.opacity = Math.round(part.remaining_lifetime / part.life * 100) / 100;
            let gradient = this.ctx.createRadialGradient(part.position.x, part.position.y, 0, part.position.x, part.position.y, part.radius);
            gradient.addColorStop(0, "rgba(" + part.r + ", " + part.g + ", " + part.b + ", " + part.opacity + ")");
            gradient.addColorStop(0.5, "rgba(" + part.r + ", " + part.g + ", " + part.b + ", " + part.opacity + ")");
            gradient.addColorStop(1, "rgba(" + part.r + ", " + part.g + ", " + part.b + ", 0)");
            this.ctx.fillStyle = gradient;
            this.ctx.arc(part.position.x, part.position.y, part.radius, Math.PI * 2, false);
            this.ctx.fill();

            part.remaining_lifetime--;
            part.radius--;
            part.position.x += part.speed.x;
            part.position.y += part.speed.y;


            if (part.remaining_lifetime < 0 || part.radius < 0) {
                this.particles[i] = new Particle();
            }
        }
        this.back.texture.update();
    }


    onResize() {

        this.canvas.width = Layout.gameWidth;
        this.canvas.height = Layout.gameHeight;
        this.back.position.set(0, 0);

        if (Layout.orientation === Layout.LANDSCAPE) {

        } else {

        }

        this.backBtn.position.set(Layout.gameWidth / 2 - this.backBtn.width / 2 - 30, -Layout.gameHeight / 2 + this.backBtn.height / 2 + 30);
    }

    tick(e) {
        this.redraw();
    }


}

export default FireTest;