export class AbstractPoint {
    x: number;
    y: number;
    z: number;
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class AbstractBox {
    insert: AbstractPoint;
    w: number;
    h: number;
    d: number;
    constructor(insert = new AbstractPoint(), w: number = 1, h: number = 1, d: number = 1) {
        this.insert = insert;
        this.w = w;
        this.h = h;
        this.d = d;
    }
    box() {
        return { w: this.w, h: this.h, d: this.d };
    }
    center() {
        return { zx: (this.insert.x + (this.w / 2)), zy: (this.insert.y + (this.d / 2)) };
    }
}

export class AbstractNodes {
    box: AbstractBox;
    nx: number;
    nz: number;
    constructor(box = new AbstractBox(), nx: number = 2, nz: number = 2) {
        this.box = box;
        this.nx = nx;
        this.nz = nz;
    }
    create(dec: number = 1) {
        let x = (this.box.insert.x - (this.box.w / 2));
        let y = this.box.insert.y;
        let z = (this.box.insert.z - (this.box.d / 2));

        let depth = this.box.d;
        let width = this.box.w;

        let i, j;
        let x1 = x;
        let z1 = z;

        let pm = 0;
        let all = 0;
        var offset = 1;
        let grid = [];


        for (j = offset; j < (this.nz); j++) {

            for (i = offset; i < (this.nx); i++) {

                pm = ((width / this.nx) * i);
                x1 = (x + pm);
                z1 = (z + ((depth / this.nz) * j));

                grid[all] = { x: x1.toFixed(dec), y: y.toFixed(dec), z: z1.toFixed(dec) };
                all++;

            }

        }

        return grid;
    }
}
