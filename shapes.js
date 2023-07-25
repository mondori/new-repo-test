```javascript
// shapes.js

let shapesArray = [];

class Shape {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
}

function createShape(x, y, radius, color, velocity) {
  let shape = new Shape(x, y, radius, color, velocity);
  shapesArray.push(shape);
  document.dispatchEvent(new CustomEvent('shapeCreated', { detail: shape }));
}

function drawShape(context, shape) {
  context.beginPath();
  context.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2, false);
  context.fillStyle = shape.color;
  context.fill();
  context.closePath();
}

export { shapesArray, createShape, drawShape };
```