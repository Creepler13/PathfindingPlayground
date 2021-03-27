class Renderer {
  screen = document.getElementById("screen");
  world;

  constructor(world) {
    while (this.screen.firstChild) {
      this.screen.removeChild(this.screen.firstChild);
    }

    this.world = world;
  }

  update() {}
}
