// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

const matterContainer = document.querySelector("#splashContainer");

// create an engine
var engine = Engine.create(),
    world = engine.world;

function init() {
    // create a renderer
    var render = Render.create({
        element: matterContainer,
        engine: engine,
        options: {
            width: matterContainer.clientWidth,
            height: matterContainer.clientHeight,
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

    function handleResize(matterContainer) {
        //sets canvas size to new value
        render.canvas.width = matterContainer.clientWidth;
        render.canvas.height = matterContainer.clientHeight;


        //resize ground and top
        Matter.Body.setPosition(
            ground,
            Matter.Vector.create(
                matterContainer.clientWidth / 2,
                matterContainer.clientHeight + 40,
                10000
            )
        );

        Matter.Body.setPosition(
            top,
            Matter.Vector.create(
                matterContainer.clientWidth / 2,
                -50,
                10000
            )
        );

        //also reposition right wall
        Matter.Body.setPosition(
            rightWall,
            Matter.Vector.create(
                matterContainer.clientWidth + 100,
                matterContainer.clientHeight / 2
            )
        );

    }
    window.addEventListener("resize", () => handleResize(matterContainer));

    // (x pos, y pos, width, height)
    /*
    Composite.add(world, [

        Bodies.rectangle(400, 200, 60, 60, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 0.7,
            chamfer: 25,
            angle: 30,
            density: 0.1,
            frictionAir: 0.01

        }),
        Bodies.rectangle(450, matterContainer.clientHeight / 2, 80, 80, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 0.7,
            chamfer: 25,
            angle: 300,
            density: 0.1,
            frictionAir: 0.01
        }),

        Bodies.rectangle(100, 100, 80, 80, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 0.7,
            chamfer: 25,
            angle: 70,
            density: 0.1,
            frictionAir: 0.01
        }),
        Bodies.rectangle(350, 400, 80, 80, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 0.7,
            chamfer: 25,
            angle: 330,
            density: 0.1,
            frictionAir: 0.01
        }),
    ]);

    */
    //top and bottom walls
    let top = Bodies.rectangle(matterContainer.clientWidth / 2, -50, matterContainer.clientWidth, 100, {
        render: {
            fillStyle: '#171616'
        },
        isStatic: true,

    });
    let ground = Bodies.rectangle(matterContainer.clientWidth / 2, matterContainer.clientHeight + 40, 4000, 100, {
        render: {
            fillStyle: '#171616'
        },
        isStatic: true
    });


    //side walls
    let rightWall = Bodies.rectangle(matterContainer.clientWidth + 100, 500, 200, 1000, {
        render: {
            fillStyle: '#171616'
        },
        isStatic: true
    });

    let leftWall = Bodies.rectangle(-100, 500, 200, 1000, {
        render: {
            fillStyle: '#171616'
        },
        isStatic: true
    });

    Composite.add(world, [leftWall, rightWall, top, ground]);


    for (let i = 0; i < 12; i++) {
        let rect = Bodies.rectangle(matterContainer.clientWidth / 2, 100, 100 + matterContainer.clientWidth / 40 - i * 5, 100 + matterContainer.clientWidth / 40 - i * 5, {
            render: {
                fillStyle: '#15F08B'
            },
            restitution: 0.7,
            chamfer: 90,
            angle: 70 * i,
            density: 0.1,
            frictionAir: 0.01
        });
        Composite.add(world, [rect]);
    }
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
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    //allows mobile scrolling
    mouseConstraint.mouse.element.removeEventListener('touchstart', mouseConstraint.mouse.mousedown);
    mouseConstraint.mouse.element.removeEventListener('touchmove', mouseConstraint.mouse.mousemove);
    mouseConstraint.mouse.element.removeEventListener('touchend', mouseConstraint.mouse.mouseup);

    mouseConstraint.mouse.element.addEventListener('touchstart', mouseConstraint.mouse.mousedown, { passive: true });
    mouseConstraint.mouse.element.addEventListener('touchmove', (e) => {
        if (mouseConstraint.body) {
            mouseConstraint.mouse.mousemove(e);
        }
    });
    mouseConstraint.mouse.element.addEventListener('touchend', (e) => {
        if (mouseConstraint.body) {
            mouseConstraint.mouse.mouseup(e);
        }
    });
    // keep the mouse in sync with rendering
    render.mouse = mouse;
}


