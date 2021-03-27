class BasicRenderer extends Renderer {
  constructor(world) {
    super(world);
    this.canvas = document.createElement("canvas");
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.ctx = this.canvas.getContext("2d");
    this.screen.appendChild(this.canvas);
  }

  


  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let h = this.canvas.height / this.world.getHeight();
    let w = this.canvas.width / this.world.getWidth();

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
      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(
        entity.pathfinder.goal.x * w + w / 4,
        entity.pathfinder.goal.y * h + h / 4,
        w / 2,
        h / 2
      );

      this.ctx.beginPath();

      let point = entity.pathfinder.getNextPoint();
      this.ctx.moveTo(point.x * w + w / 2, point.y * h + h / 2);
      while (point.parent) {
        this.ctx.lineTo(point.parent.x * w + w / 2, point.parent.y * h + h / 2);
        point = entity.pathfinder.data[point.parent.id];
      }

      this.ctx.stroke();
      this.ctx.closePath();
    });
  }
}
