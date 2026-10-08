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


    //one box per letter of the domain, laid out left to right so the row
    //reads ChrisHo.dev once everything settles
    const letters = "ChrisHo.dev".split("");
    const slot = matterContainer.clientWidth / letters.length;
    //leave a gap in each slot so neighbours don't shove each other out of order
    const boxSize = Math.max(26, Math.min(120, slot * 0.74));

    //canvas silently falls back to a system font if the webfont isn't ready yet,
    //so ask for it up front and let the render loop pick it up when it lands
    if (document.fonts && document.fonts.load) {
        document.fonts.load("700 " + Math.round(boxSize) + "px 'Open Sans'");
    }

    //jitter, so the row is clearly in order without looking mechanical
    function jitter(amount) {
        return (Math.random() * 2 - 1) * amount;
    }

    for (let i = 0; i < letters.length; i++) {
        let size = boxSize * (1 + jitter(0.06));
        let rect = Bodies.rectangle(
            slot * (i + 0.5) + jitter(slot * 0.12),
            //below the static top wall, or they jam against it instead of falling
            size / 2 + 20 + Math.random() * 90,
            size,
            size,
            {
                render: {
                    fillStyle: '#15F08B'
                },
                restitution: 0.25,
                //rounded corners, scaled so small mobile boxes round the same amount
                chamfer: Math.round(size * 0.42),
                angle: jitter(0.25),
                density: 0.1,
                frictionAir: 0.015
            }
        );
        //heavy rotational inertia: boxes tilt a little but never flip onto their
        //side, so the letters stay readable even when packed tight on mobile
        Matter.Body.setInertia(rect, rect.inertia * 25);

        //picked up by the afterRender hook below
        rect.letter = letters[i];
        rect.letterSize = size;

        //drop them in reading order
        setTimeout(function () {
            Composite.add(world, [rect]);
        }, i * 110 + Math.random() * 60);
    }

    //draw each box's letter on top of it, turning with the box
    Matter.Events.on(render, 'afterRender', function () {
        const ctx = render.context;
        const bodies = Composite.allBodies(world);

        ctx.save();
        ctx.fillStyle = '#171616';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < bodies.length; i++) {
            let body = bodies[i];
            if (!body.letter) {
                continue;
            }
            ctx.save();
            ctx.translate(body.position.x, body.position.y);
            ctx.rotate(body.angle);
            //same family and weight as the splash title
            ctx.font = '700 ' + Math.round(body.letterSize * 0.52) + "px 'Open Sans', sans-serif";
            ctx.fillText(body.letter, 0, 0);
            ctx.restore();
        }

        ctx.restore();
    });

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


