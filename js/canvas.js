import { getCanvasData } from "./database";

const runCanvas = (canvas) => {
    readyCanvas(canvas);
    mainCanvas(canvas);
}

// ready canvas to draw
const readyCanvas = (canvas) => {
    const canvasWidth = 600;
    const canvasHeight = 600;
    canvas.style.background = getCanvasData('background');
    canvas.style.height = canvasHeight + "px";
    canvas.style.width = canvasWidth + "px";
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
}

// draw on canvas
const mainCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    canvas.addEventListener('mouseenter', () => {
        // set universal parameter
        canvas.canvas = canvas;
        canvas.ctx = ctx;

        // get selected tool from storage
        const tool = getCanvasData('tool');

        // check tools
        switch (tool) {
            // draw
            case 'pencil':
                drawOnKeyPressed(canvas);
                break;

            // erase
            case 'eraser':
                eraseOnKeyPressed(canvas);
                break;
        }
    })
}


// draw on mousemove
const drawOnMouseMove = (ParentEvent) => {
    // fetch parameter
    const canvas = ParentEvent.currentTarget.canvas;
    const ctx = ParentEvent.currentTarget.ctx;
    const { x, y } = getMousePosition(canvas, ParentEvent);
    drawRect(ctx, x, y)
}

// draw on shift key pressed
const drawOnKeyPressed = (canvas) => {

    document.addEventListener('keydown', (event) => {
        if (event.key == "Shift") {
            // get the mouse position and draw
            canvas.removeEventListener('mousemove', eraseOnMouseMove, false);
            canvas.addEventListener('mousemove', drawOnMouseMove, false);
        }
    });
    document.addEventListener('keyup', (event) => {
        if (event.key == "Shift") {
            // get the mouse position and draw
            canvas.removeEventListener('mousemove', eraseOnMouseMove, false);
            canvas.removeEventListener('mousemove', drawOnMouseMove, false);
        }
    });
}

// erase on mousemove
const eraseOnMouseMove = (event) => {
    // fetch parameter
    const canvas = event.currentTarget.canvas;
    const ctx = event.currentTarget.ctx;
    // get the mouse pinter and erase
    const { x, y } = getMousePosition(canvas, event)
    eraseRect(ctx, x, y)
}

// erase on shift key pressed
const eraseOnKeyPressed = (canvas) => {
    document.addEventListener('keydown', (event) => {
        if (event.key == "Shift") {
            // get the mouse position and draw
            canvas.removeEventListener('mousemove', drawOnMouseMove, false);
            canvas.addEventListener('mousemove', eraseOnMouseMove, false);
        }
    });
    document.addEventListener('keyup', (event) => {
        if (event.key == "Shift") {
            // get the mouse position and draw
            canvas.removeEventListener('mousemove', eraseOnMouseMove, false);
            canvas.removeEventListener('mousemove', drawOnMouseMove, false);
        }
    });
}

// draw rectangle on canvas
const drawRect = (ctx, x, y) => {
    const penColor = getCanvasData('color');
    ctx.fillStyle = penColor;
    ctx.fillRect(x, y, 5, 5);
}
// erase rectangle on canvas
const eraseRect = (ctx, x, y) => {
    ctx.clearRect(x, y, 10, 10);
}

// get mouse position in the canvas
const getMousePosition = (canvas, event) => {
    const bounding = canvas.getBoundingClientRect();
    const scaleX = canvas.width / bounding.width;
    const scaleY = canvas.height / bounding.height;

    return {
        x: (event.clientX - bounding.left) * scaleX,
        y: (event.clientY - bounding.top) * scaleY
    }
}

export default runCanvas;