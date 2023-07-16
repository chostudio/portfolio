// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create(),
    world = engine.world;

function init() {
    // create a renderer
    var render = Render.create({
        element: document.getElementById("areaToRender"),
        engine: engine,
        options: {
            width: 800,
            height: 600,
            pixelRatio: 2,
            //background
            background: '#171616',
            //solid color fill false or just wireframe outline true boolean
            wireframes: false // <-- important
        }
    });

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    // (x pos, y pos, width, height)
    Composite.add(world, [

        Bodies.rectangle(400, 200, 60, 60, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 0.7,
            chamfer: 20,
            density: 0.01,
            angle: 30

        }),
        Bodies.rectangle(450, 50, 80, 80, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 0.7,
            chamfer: 20,
            density: 0.01,
            angle: 300
        }),

        Bodies.rectangle(100, 100, 80, 80, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 0.7,
            chamfer: 20,
            density: 0.01,
            angle: 70
        }),
        Bodies.rectangle(350, 400, 80, 80, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 0.7,
            chamfer: 20,
            density: 0.01,
            angle: 330,
            density: 0.1
        }),

        // walls
        Bodies.rectangle(400, 0, 800, 100, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 100, { isStatic: true }),
        Bodies.rectangle(850, 500, 200, 1000, { isStatic: true }),
        Bodies.rectangle(-50, 500, 200, 1000, { isStatic: true }),

        //ground
        Bodies.rectangle(400, 610, 810, 25, { isStatic: true })
    ]);
    //gravity = 1 is normal
    engine.gravity.y = 0.5;

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
}


