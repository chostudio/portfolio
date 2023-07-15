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

    const colorFill = {
        render: {
            fillStyle: '#15F08B'
        }
    };
    // create two boxes and a ground
    // (x pos, y pos, width, height)
    Composite.add(world, [

        Bodies.rectangle(400, 200, 60, 60, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 1
        }),
        Bodies.rectangle(450, 50, 80, 80, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 1
        }),
        Bodies.rectangle(100, 100, 80, 80, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 1
        }),
        Bodies.rectangle(350, 400, 80, 80, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 1
        }),
        Bodies.rectangle(150, -100, 80, 80, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 1
        }),

        // walls
        //Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        //Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true }),

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


