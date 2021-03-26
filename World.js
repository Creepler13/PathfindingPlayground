class World {
  map = [];
  view = { x: 0, y: 0, width: 500, height: 500 };
  entitys = [];

  constructor(width, height) {
    let temp = new Array(height);
    temp.fill(0, 0);
    this.map = new Array(width);
    this.map.fill(temp, 0);

    this.view.x = 0;
    this.view.y = 0;
   
  }

  getTile(x, y) {
    return this.map[x][y];
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
