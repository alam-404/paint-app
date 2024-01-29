const colors = [
    'rgb(0, 0, 0)',
    'rgb(255, 255, 255)',
    'rgb(255, 0, 0)',
    'rgb(0, 255, 0)',
    'rgb(0, 0, 255)',
    'rgb(255, 69, 0)',
    'rgb(255, 0, 255)',
    'rgb(255, 0, 127)',
    'rgb(255, 255, 0)'
]


// append color box to parent div element
const setColors = (parentElement) => {
    let colorElements = ''
    for (let color of colors) {
        const colorBox = `
            <button class='color-box' style='background-color: ${color}'></button>
        `;
        colorElements += colorBox;
    }
    parentElement.innerHTML = colorElements;
}




export default setColors;