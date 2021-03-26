class Entity {
  maxTileType = 0;
  x = 0;
  y = 0;
  name = "";
  speed = 1;

  constructor(x, y, speed, maxTileType, name, world) {
    this.maxTileType = maxTileType;
    this.speed = speed;
    this.name = name;
    this.x = x;
    this.y = y;
    this.world = world;
  }

  move(x, y) {
    x = x < 0 ? 0 : (x = x > this.world.getWidth() ? this.world.getWidth() : x);
    y =
      y < 0 ? 0 : (y = y > this.world.getHeight() ? this.world.getHeight() : y);

    if (this.world.getTile(x, y) <= this.maxTileType) {
      this.x = x;
      this.y = y;
    }
  }

  followPath() {


    
  }
}
