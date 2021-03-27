class World {
  map = [];
  view = { x: 0, y: 0, width: 500, height: 500 };
  entitys = [];

  constructor(width, height) {
    for (let x = 0; x < width; x++) {
      let temp = [];
      for (let y = 0; y < height; y++) {
        temp.push(0);
      }
      this.map.push(temp);
    }

    this.view.x = 0;
    this.view.y = 0;
  }

  getTile(x, y) {
    return this.map[x] ? this.map[x][y] : undefined;
  }

  cordBound(x, y) {
    return {
      x: x < 0 ? 0 : (x = x > this.getWidth() - 1 ? this.getWidth() - 1 : x),
      y: y < 0 ? 0 : (y = y > this.getHeight() - 1 ? this.getHeight() - 1 : y),
    };
  }

  getWidth() {
    return this.map.length;
  }

  getHeight() {
    return this.map[0].length;
  }

  setTile(x, y, type) {
    this.map[x][y] = type;
  }

  addEntity(x, y, maxTileType, name) {
    this.entitys.push(new Entity(x, y, maxTileType, name, this));
  }

  //WIP
  increaseSize(width, height) {
    if (height > 0) {
      for (let index = 0; index < this.map.length; index++) {
        for (let i = 0; i < height; i++) {
          this.map[index].push(0);
        }
      }
    } else {
      for (let index = 0; index < this.map.length; index++) {
        for (let i = 0; i < -height; i++) {
          this.map[index].unshift(0);
        }
      }
      this.view.y = this.view.y - height;
    }

    this.height = this.height + height;

    let temp = new Array(this.width);
    temp.fill(0, 0);
    if (width > 0) {
      for (let index = 0; index < width; index++) {
        this.map.push(temp);
      }
    } else {
      for (let index = 0; index < -width; index++) {
        this.map.unshift(temp);
      }
      this.view.y = this.view.y - height;
    }

    this.width = this.width + width;
  }
}
