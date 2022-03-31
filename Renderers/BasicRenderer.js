class BasicRenderer extends Renderer {
  constructor(world) {
    super(world);
    this.canvas = document.createElement("canvas");
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext("2d");
    this.screen.appendChild(this.canvas);

    this.h = this.canvas.height / this.world.getHeight();
    this.w = this.canvas.width / this.world.getWidth();

    this.canvas.onclick = (e) => {
      if (modify) {
        let x = Math.floor((e.pageX - this.canvas.offsetLeft) / this.w);
        let y = Math.floor((e.pageY - this.canvas.offsetTop) / this.h);

        world.setTile(x, y, world.getTile(x, y) == 0 ? 1 : 0);

        pathFinder.reset();
        pathFinder.pathTo(px, py, false);
      } else {
        pathFinder.next();
      }
      rend.update();
    };
  }

  update() {
    let w = this.w;
    let h = this.h;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let x = 0; x < this.world.getWidth(); x++) {
      for (let y = 0; y < this.world.getHeight(); y++) {
        this.ctx.fillStyle = this.world.getTile(x, y) == 0 ? "white" : "black";
        this.ctx.fillRect(w * x, h * y, w, h);
      }
    }

    this.ctx.fillStyle = "green";
    this.world.entitys.forEach((entity) => {
      this.ctx.fillRect(
        entity.x * w + w / 4,
        entity.y * h + h / 4,
        w / 2,
        h / 2
      );

      if (entity.pathfinder) {
        entity.pathfinder.draw(this.ctx, w, h, false);
      }
    });
  }
}
