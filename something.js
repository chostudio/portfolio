// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();


function init() {
    // create a renderer
    var render = Render.create({
        element: document.getElementById("areaToRender"),
        engine: engine,
        options: {
            width: 800,
            height: 600,
            pixelRatio: 1,
            background: '#fafafa',
            wireframes: false // <-- important
        }
    });

    // create two boxes and a ground
    // (x pos, y pos, width, height)

    var boxA = Bodies.rectangle(400, 200, 60, 60);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var boxC = Bodies.rectangle(100, 100, 80, 80);
    var boxD = Bodies.rectangle(350, 400, 80, 80);
    var boxE = Bodies.rectangle(150, -100, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 20, { isStatic: true });

    // add all of the bodies to the world
    Composite.add(engine.world, [boxA, boxB, boxC, boxD, boxE, ground]);

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);
}


