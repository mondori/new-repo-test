```javascript
// physics.js

// Import shared dependencies
import { canvas, context, shapesArray } from './main.js';

// Function to update the physics of the game
function updatePhysics() {
    for (let i = 0; i < shapesArray.length; i++) {
        let shape = shapesArray[i];

        // Update position based on velocity
        shape.x += shape.vx;
        shape.y += shape.vy;

        // Apply gravity
        shape.vy += 0.5;

        // Check for collision with canvas edges and bounce
        if (shape.x + shape.radius > canvas.width || shape.x - shape.radius < 0) {
            shape.vx *= -1;
        }
        if (shape.y + shape.radius > canvas.height || shape.y - shape.radius < 0) {
            shape.vy *= -1;
        }
    }
}

// Function to detect collisions between shapes
function detectCollision() {
    for (let i = 0; i < shapesArray.length; i++) {
        for (let j = i + 1; j < shapesArray.length; j++) {
            let shape1 = shapesArray[i];
            let shape2 = shapesArray[j];

            let dx = shape1.x - shape2.x;
            let dy = shape1.y - shape2.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < shape1.radius + shape2.radius) {
                // Collision detected, calculate new velocities
                let angle = Math.atan2(dy, dx);
                let sin = Math.sin(angle);
                let cos = Math.cos(angle);

                // Rotate shape1's position
                let pos0 = {x: 0, y: 0};

                // Rotate shape2's position
                let pos1 = rotate(dx, dy, sin, cos, true);

                // Rotate shape1's velocity
                let vel0 = rotate(shape1.vx, shape1.vy, sin, cos, true);

                // Rotate shape2's velocity
                let vel1 = rotate(shape2.vx, shape2.vy, sin, cos, true);

                // Collision reaction
                let vxTotal = vel0.x - vel1.x;
                vel0.x = ((shape1.radius - shape2.radius) * vel0.x + 2 * shape2.radius * vel1.x) / (shape1.radius + shape2.radius);
                vel1.x = vxTotal + vel0.x;

                // Update positions
                pos0.x += vel0.x;
                pos1.x += vel1.x;

                // Rotate positions back
                let pos0F = rotate(pos0.x, pos0.y, sin, cos, false);
                let pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

                // Adjust positions to actual screen positions
                shape2.x = shape1.x + pos1F.x;
                shape2.y = shape1.y + pos1F.y;
                shape1.x = shape1.x + pos0F.x;
                shape1.y = shape1.y + pos0F.y;

                // Rotate velocities back
                let vel0F = rotate(vel0.x, vel0.y, sin, cos, false);
                let vel1F = rotate(vel1.x, vel1.y, sin, cos, false);

                shape1.vx = vel0F.x;
                shape1.vy = vel0F.y;
                shape2.vx = vel1F.x;
                shape2.vy = vel1F.y;
            }
        }
    }
}

// Helper function to rotate position
function rotate(x, y, sin, cos, reverse) {
    return {
        x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
        y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
}

export { updatePhysics, detectCollision };
```