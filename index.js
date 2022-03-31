let world = new World(50, 50, true);

world.addEntity(0, 0, 0, "test");
let pathFinder = new AStar(world.entitys[0], world);
world.entitys[0].pathfinder = pathFinder;

let rend = new BasicRenderer(world);



let modify = true;

let px = 20;
let py = 10;
pathFinder.pathTo(px, py, true);

setInterval(()=>{console.log("next");pathFinder.next(); rend.update();},50)
