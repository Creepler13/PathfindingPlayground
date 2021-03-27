class AStar extends Pathfinder {
  constructor(entity, world) {
    super(entity, world);
  }

  goal = { x: 0, y: 0 };

  data = {};

  pathTo(x, y) {
    this.goal = this.world.cordBound(x, y);

    let curX = this.entity.x;
    let curY = this.entity.y;

    this.data[curX + "," + curY] = {
      x: curX,
      y: curY,
      flagged: true,
      value: this.dist(curX, curY, x, y),
      parentCount: 0,
    };

    this.expandTile(this.data[curX + "," + curY]);

    let np = this.getNextPoint();
    while (true) {
      this.expandTile(np);
      np = this.getNextPoint();
      if (np.x == x && np.y == y) break;
    }
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
    return p;
  }

  dist(x1, y1, x2, y2) {
    return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
  }

  draw(ctx) {}
}
