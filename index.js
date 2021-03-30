let world = new World(50, 50, false);

world.addEntity(0, 0, 0, "test");
let pathFinder = new AStar(world.entitys[0], world);
world.entitys[0].pathfinder = pathFinder;

let rend = new BasicRenderer(world);
rend.update();

let px = 20;
let py = 10;
