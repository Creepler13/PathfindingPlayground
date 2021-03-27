class Entity {
  maxTileType = 0;
  x = 0;
  y = 0;
  name = "";
  pathfinder;
  path;

  constructor(x, y, maxTileType, name, world, pathfinder) {
    this.maxTileType = maxTileType;
    this.name = name;
    this.x = x;
    this.y = y;
    this.world = world;
    this.pathfinder = pathfinder;
  }

  move(x, y) {
    let cords = this.world.cordBound(x, y);

    if (this.world.getTile(cords.x, cords.y) <= this.maxTileType) {
      this.x = cords.x;
      this.y = cords.y;
    }
  }

  update() {
    let path = this.pathfinder.findPath();
    if (path) {
    } else {
    }
  }
}
