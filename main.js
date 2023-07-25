```javascript
// Importing dependencies
import { createShape, drawShape } from './shapes.js';
import { updatePhysics, detectCollision } from './physics.js';
import { dragShape, flingShape } from './dragAndFling.js';

let canvas = document.getElementById('gameCanvas');
let context = canvas.getContext('2d');
let shapesArray = [];
let draggingShapeIndex = null;

function init() {
    // Create initial shapes
    for (let i = 0; i < 5; i++) {
        let newShape = createShape();
        shapesArray.push(newShape);
    }

    // Add mouse event listeners
    canvas.addEventListener('mousedown', (event) => {
        draggingShapeIndex = dragShape(event, shapesArray);
    });

    canvas.addEventListener('mousemove', (event) => {
        if (draggingShapeIndex !== null) {
            shapesArray[draggingShapeIndex] = dragShape(event, shapesArray[draggingShapeIndex]);
        }
    });

    canvas.addEventListener('mouseup', (event) => {
        if (draggingShapeIndex !== null) {
            shapesArray[draggingShapeIndex] = flingShape(event, shapesArray[draggingShapeIndex]);
            draggingShapeIndex = null;
        }
    });

    // Start the game loop
    gameLoop();
}

function gameLoop() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update physics and detect collisions
    shapesArray = updatePhysics(shapesArray);
    shapesArray = detectCollision(shapesArray);

    // Draw all shapes
    for (let i = 0; i < shapesArray.length; i++) {
        drawShape(context, shapesArray[i]);
    }

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Initialize the game
init();
```