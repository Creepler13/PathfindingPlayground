let world = new World(50, 50);

world.setTile(0,10,1)
world.setTile(1,10,1)
world.setTile(2,10,1)
world.setTile(3,10,1)
world.setTile(4,10,1)
world.setTile(5,10,1)
world.setTile(6,10,1)
world.setTile(7,10,1)
world.setTile(8,10,1)
world.setTile(9,10,1)
world.setTile(10,10,1)
world.setTile(11,10,1)
world.setTile(12,10,1)
world.setTile(13,10,1)
world.setTile(13,9,1)
world.setTile(13,8,1)
world.setTile(13,7,1)



world.addEntity(0, 0, 0, "test");
let pathFinder = new AStar(world.entitys[0], world);
pathFinder.pathTo(30, 30);

world.entitys[0].pathfinder = pathFinder;

let rend = new BasicRenderer(world);
rend.update();
