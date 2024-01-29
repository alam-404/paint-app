import { getCanvasData, updateCanvasData } from "./database";
// import svg
import eraserIcon from '/eraser.svg';


const tools = {
    "pencil": "✏️",
    "eraser": `${eraserIcon}`
}


// append color box to parent div element
const setTools = (parentElement) => {
    let toolElements = '';
    const toolKeys = Object.keys(tools);
    const storeTool = getCanvasData('tool');
    for (let tool of toolKeys) {
        const   toolBox = `
        <button class='tool ${tool == storeTool ? 'active-btn' : ''}' value='${tool}'>
            ${
                tool == 'eraser' ? 
                `<img src='${tools[tool]}' height='30px' width='30px' alt='${tool}' />`
                : tools[tool]
            }
        </button>`;
        toolElements += toolBox;
    }
    parentElement.innerHTML = toolElements;
    setListener(parentElement);
}

// set eventlistener to tool box
const setListener = (parentElement) => {
    const toolBox = parentElement.querySelectorAll('.tool')
    // console.log(toolBox)
    for (let tool of toolBox) {
        tool.addEventListener('click', (event) => {
            const parentNode = event.target.parentNode;
            // console.log(event);
            const targetValue = event.target.value ? event.target.value : event.target.alt;
            updateCanvasData('tool', targetValue);
            // console.log()
            checkAndRemoveActive(parentElement, tool);
            (event.target.localName == 'img' && targetValue == 'eraser') ? parentNode.classList.toggle('active-btn') : event.target.classList.toggle('active-btn');
        })
    }
}

// check if a button already active then remove the class name
const checkAndRemoveActive = (parentElement, currentElement) => {
    const toolBox = parentElement.querySelectorAll('.tool');
    for (let tool of toolBox) {
        if (!(tool == currentElement)) tool.classList.remove('active-btn');
    }
}


export default setTools;