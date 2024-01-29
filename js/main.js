import runCanvas from './canvas';
import setColors from './colors';
import { preloadData } from './database';
import '/style/style.css';
import setTools from './tools';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>🎨 Paint</h1>
    <div class='container'>
      <div>
        <canvas id='myCanvas'></canvas>
      </div>
      <div class='flex-column tools-bar'>
        <h5>Colors</h5>
        <div id='color-container'>
        </div>
        <div class='tools-container'>
          <h5>Tools</h5>
          <div class='tools'>
          </div>
        <div>
      </div>
    </div>
  </div>
`
// get the elements
const canvas = document.querySelector('#myCanvas');
const colorContainer = document.querySelector('#color-container');
const toolsContainer = document.querySelector('.tools');

// set some predefine colors
setColors(colorContainer);
setTools(toolsContainer);

// default canvas data -> canvas color, pen color and used tool
preloadData("canvas", {
  "color": "rgb(0,0,0)",
  "background": "rgb(255,255,255)",
  "tool": "pencil"
})

runCanvas(canvas);