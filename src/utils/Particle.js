import Layout from "./Layout"

class Particle {
    constructor() {
        this.speed = {x: -3.5 + Math.random() * 5, y: -20 + Math.random() * 10};
        this.position = {x: Layout.gameWidth/2, y: Layout.gameHeight / 2};
        this.radius = 30 + Math.random() * 5;
        this.life = 5 + Math.random() * 5;
        this.remaining_lifetime = this.life;
        this.r = Math.round(Math.random() * 255);
        this.b = Math.round(Math.random() * 255);
        this.g = 0;
    }
}

export default Particle;
