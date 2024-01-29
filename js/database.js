// get data from localstorage
const getData = (key) => {
    const data = sessionStorage.getItem(key);
    return JSON.parse(data);
}

// set data to localstorage
const setData = (key, value) => {
    const data = JSON.stringify(value);
    sessionStorage.setItem(key, data);
}

// preload data to localstorage
const preloadData = (key, value) => {
    const oldData = getData(key);
    if (!oldData) setData(key, value);
}

// this function is to get canvas data
const getCanvasData = (key) => {
    const data = getData('canvas');
    const dataKeys = Object.keys(data);
    if (dataKeys){
        const hasData = dataKeys.includes(key);
        if (hasData) return data[key];
    }
}
// this function is to update canvas data
const updateCanvasData = (key, value) => {
    const data = getData('canvas');
    if (!Object.keys(data).includes(key)) appendCanvasData(key, value);
    data[key] = value;
    setData('canvas', data);
}
// this function is to append data in canvas
const appendCanvasData = (key, value) => {
    const oldData = getData('canvas');
    Object.assign({key: value}, oldData);
    setData('canvas', oldData);
}


export {
    setData,
    getData,
    preloadData,
    getCanvasData,
    updateCanvasData,
    appendCanvasData
};