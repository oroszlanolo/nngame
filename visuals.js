class Visuals {
    constructor() {
        this.deltaBG = -WATER_W * 2 - WATER_H / 4 * 3;
        this.deltaFG = -WATER_W * 2 - WATER_H / 2;
        this.valamiFG = PI;
        this.valamiBG = 0;
    }
    update() {
        this.updateWater();
    }
    updateWater() {
        this.valamiFG += deltaTime / 150;
        if (this.valamiFG > 2 * PI) {
            this.valamiFG -= 2 * PI;
        }
        this.deltaFG += 2 * sin(this.valamiFG);
        this.valamiBG += deltaTime / 80;
        if (this.valamiBG > PI * 2 * 3) {
            this.valamiBG -= PI * 2 * 3;
        }
        this.deltaBG += 3 * sin(this.valamiBG / 3);
    }
    drawBGWater() {
        let curr = this.deltaBG;
        while (curr < windowWidth) {
            image(waterBackImg, curr, windowHeight - WATER_H / 4 - 5, WATER_W, WATER_H);
            curr += WATER_W;
        }
    }
    drawFGWater() {
        let curr = this.deltaFG;
        while (curr < windowWidth) {
            image(waterFrontImg, curr, windowHeight - WATER_H / 4, WATER_W, WATER_H);
            curr += WATER_W;
        }
    }
}