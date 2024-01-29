import setColors from './colors';
import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>🎨 Paint</h1>
    <div class='container'>
      <canvas id='myCanvas'></canvas>
      <div class='flex-column tools-bar'>
        <h5>Colors</h5>
        <div id='color-container'>
        </div>
        <div class='tools-container'>
          <h5>Tools</h5>
          <div class='tools'>
            <button class='tool'>✏️</button>
          </div>
        <div>
      </div>
    </div>
  </div>
`
// get the elements
const canvas = document.querySelector('#myCanvas');
const colorContainer = document.querySelector('#color-container');

// set some predefine colors
setColors(colorContainer);

const colorBox = document.querySelectorAll('.color-box');

for(let color of colorBox){
  color.addEventListener('click', (e) => {
    // console.log(e.target.style.backgroundColor)
    const color = e?.target?.style.backgroundColor;
  })
}