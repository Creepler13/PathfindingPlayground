class AStar extends Pathfinder {
  constructor(entity, world) {
    super(entity, world);
  }

  goal = { x: 0, y: 0 };

  data = {};

  pathTo(x, y, step) {
    this.goal = this.world.cordBound(x, y);

    let curX = this.entity.x;
    let curY = this.entity.y;

    this.data[curX + "," + curY] = {
      x: curX,
      y: curY,
      id: curX + "," + curY,
      flagged: true,
      value: this.dist(curX, curY, this.goal.y, this.goal.y),
      parentCount: 0,
    };

    this.expandTile(this.data[curX + "," + curY]);

    if (!step) {
      while (!this.finished) {
        if (this.finished) return;
        let np = this.getNextPoint();
        if ((np.x == this.goal.x && np.y == this.goal.y) || !np) {
          this.finished = true;
          return;
        }
        this.expandTile(np);
      }
    }
  }

  finished = false;

  next() {
    if (this.finished) return;
    let np = this.getNextPoint();
    if ((np.x == this.goal.x && np.y == this.goal.y) || !np) {
      this.finished = true;
      return;
    }

    this.expandTile(np);
  }

  expandTile(point) {
    let curX = point.x;
    let curY = point.y;

    for (let ix = -1; ix < 2; ix++) {
      for (let iy = -1; iy < 2; iy++) {
        if (
          (ix == 0 && iy == 0) ||
          (curX + ix == this.entity.x && curY + iy == this.entity.y)
        )
          continue;
        let tile = this.world.getTile(curX + ix, curY + iy);
        if (tile != undefined) {
          if (tile > this.entity.maxTileType) {
            continue;
          }
          let dist = this.dist(curX + ix, curY + iy, this.goal.x, this.goal.y);
          let value = dist + point.parentCount + 1;
          if (this.data[curX + ix + "," + (curY + iy)]) {
            if (value > this.data[curX + ix + "," + (curY + iy)].value)
              continue;
          }
          this.data[curX + ix + "," + (curY + iy)] = {
            id: curX + ix + "," + (curY + iy),
            x: curX + ix,
            y: curY + iy,
            parentCount: point.parentCount + 1,
            value: value,
            parent: { id: point.x + "," + point.y, x: point.x, y: point.y },
          };
        }
      }
    }
    if (point.id) this.data[point.id].flagged = true;
  }

  getNextPoint() {
    let p = { value: 999999999 };
    for (const key in this.data) {
      if (this.data[key].value < p.value && !this.data[key].flagged) {
        p = this.data[key];
      }
    }
    if (p == { value: 999999999 }) {
      return false;
    }
    return p;
  }

  dist(x1, y1, x2, y2) {
    return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
  }

  reset() {
    this.data = {};
    this.finished = false;
  }

  draw(ctx, w, h) {
    if (this.data != {}) {
      ctx.fillStyle = "blue";
      ctx.fillRect(
        this.goal.x * w + w / 4,
        this.goal.y * h + h / 4,
        w / 2,
        h / 2
      );

      ctx.beginPath();

      let point = this.getNextPoint();
      ctx.moveTo(point.x * w + w / 2, point.y * h + h / 2);
      while (point.parent) {
        ctx.lineTo(point.parent.x * w + w / 2, point.parent.y * h + h / 2);
        point = this.data[point.parent.id];
      }

      ctx.stroke();
      ctx.closePath();
    }
  }
}
