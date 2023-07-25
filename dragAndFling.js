```javascript
let dragging = false;

function dragShape(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    for (let i = 0; i < shapesArray.length; i++) {
        let shape = shapesArray[i];
        let distance = Math.hypot(shape.x - mouseX, shape.y - mouseY);

        if (distance < shape.radius) {
            dragging = true;
            draggingShapeIndex = i;
            break;
        }
    }
}

function flingShape(event) {
    if (dragging) {
        let shape = shapesArray[draggingShapeIndex];
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        let dx = mouseX - shape.x;
        let dy = mouseY - shape.y;

        shape.vx = dx * 0.1;
        shape.vy = dy * 0.1;

        dragging = false;
        draggingShapeIndex = -1;
    }
}

canvas.addEventListener('mousedown', dragShape);
canvas.addEventListener('mouseup', flingShape);
canvas.addEventListener('mousemove', function(event) {
    if (dragging) {
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        let shape = shapesArray[draggingShapeIndex];
        shape.x = mouseX;
        shape.y = mouseY;
    }
});
```