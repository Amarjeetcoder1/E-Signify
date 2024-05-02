const colorpicker = document.getElementById("colorpicker");
const canvarColor = document.getElementById("canvarColor");
const fontsize = document.getElementById("fontsize");
const canvas = document.getElementById("mycanvas");
const clearButton = document.getElementById("clearButton");
const saveButton = document.getElementById("saveButton");
const retrieveButton = document.getElementById("retrieveButton");
const ctx = canvas.getContext("2d");

colorpicker.addEventListener('change', (event) => {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
 
});

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if(isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        lastX = event.offsetX;
        lastY = event.offsetY;
    }
});

canvas.addEventListener('mouseup', (event) => {
    isDrawing = false;
})


canvarColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0,0,800,500);
 
});

fontsize.addEventListener('change', (event) => {
    ctx.lineWidth = event.target.value;
 
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0,0,800,500);


});

saveButton.addEventListener('click', () => {
    localStorage.setItem('canvaContents', canvas.toDataURL());

    let link = document.createElement('a');

    link.download = 'my-sing.png';

    link.href = canvas.toDataURL();

    link.click();
});
retrieveButton.addEventListener('click', () => {
    let img = new Image();

    img.src = localStorage.getItem('canvaContents');

    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
    
})
