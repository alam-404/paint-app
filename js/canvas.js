import { getCanvasData } from "./database";

const runCanvas = (canvas) => {
    drawOnCanvas(canvas);
    readyCanvas(canvas);
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
const drawOnCanvas = (canvas) => {
    const ctx = canvas.getContext('2d');
    let drawKeyPressed = 0, eraseKeyPressed = 0;
    document.addEventListener('mousemove', (event) => {
        // set universal parameter
        canvas.canvas = canvas;
        canvas.ctx = ctx;
        // get selected tool from storage
        const tool = getCanvasData('tool');
        // console.log(tool)
        switch (tool) {
            case 'pencil':
                drawKeyPressed = !drawKeyPressed;
                canvas.removeEventListener('mousemove', eraseOnMouseMove, false);
                canvas.addEventListener('mousemove', drawOnMouseMove, false);
                break;
            case 'eraser':
                canvas.removeEventListener('mousemove', drawOnMouseMove, false);
                canvas.addEventListener('mousemove', eraseOnMouseMove, false);

        }
        // check cases
        // switch (event.key) {
        //     // 'd' -> toggle draw and release
        //     case 'd':
        //         // console.log('dr', drawKeyPressed);
        //         // eraseKeyPressed = !eraseKeyPressed ? eraseKeyPressed: eraseKeyPressed;
        //         if (eraseKeyPressed) eraseKeyPressed = !eraseKeyPressed;
        //         console.log(drawKeyPressed, eraseKeyPressed)
        //         if (!drawKeyPressed) {
        //             drawKeyPressed = !drawKeyPressed;
        //             canvas.addEventListener('mousemove', drawOnMouseMove, false);
        //         } else {
        //             drawKeyPressed = !drawKeyPressed;
        //             canvas.removeEventListener('mousemove', drawOnMouseMove, false);
        //         }
        //         break;

        //     // 'e' -> toggle erase
        //     case 'e':
        //         // console.log("er", eraseKeyPressed)
        //         if (drawKeyPressed) drawKeyPressed = !drawKeyPressed;
        //         console.log(drawKeyPressed, eraseKeyPressed)
        //         if (!eraseKeyPressed) {
        //             eraseKeyPressed = !eraseKeyPressed;
        //             // console.log('ed',drawKeyPressed);
        //             canvas.addEventListener('mousemove', eraseOnMouseMove, false);
        //         } else {
        //             eraseKeyPressed = !eraseKeyPressed;
        //             canvas.removeEventListener('mousemove', eraseOnMouseMove, false);
        //         }
        //         break;

        //     case 'f':
        //         console.log('F pressed')
        //         break;
        // }

    })
}


// draw on mousemove
const drawOnMouseMove = (event) => {
    // fetch parameter
    const canvas = event.currentTarget.canvas;
    const ctx = event.currentTarget.ctx;
    // get the mouse position and draw
    const { x, y } = getMousePosition(canvas, event)
    drawRect(ctx, x, y)
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