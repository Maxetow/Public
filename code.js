import { Turtle } from "./turtle.js";

// Create a main draw turtle for the track
const track = new Turtle("drawCanvas", "turtleCanvas");
track.speed(0);
track.penUp();
track.goto(-140, 140);

// Draw racing track
(async () => {
  for (let step = 0; step < 15; step++) {
    track.penColor("black");

    // Draw number above the starting point of the line
    track.drawtext(step, track.x, track.y); // 10px above

    track.penDown();
    track.right(90);

    for (let num = 0; num < 8; num++) {
        track.penUp();
        await track.forward(10);
        track.penDown();
        await track.forward(10);
    }

    track.penUp();
    await track.backward(160);
    track.left(90);
    await track.backward(20);
}


  // Create turtles (players)
  const player_1 = new Turtle("drawCanvas", "turtleCanvas");
  player_1.penUp();
  player_1.goto = (x, y) => { player_1.x = x; player_1.y = y; player_1._renderHead(); }; 
  player_1.goto(-160, 100);
  player_1.penDown();
  player_1.penColor("red");

  const player_2 = new Turtle("drawCanvas", "turtleCanvas");
  player_2.penUp();
  player_2.goto(-160, 70);
  player_2.penDown();
  player_2.penColor("blue");

  const player_3 = new Turtle("drawCanvas", "turtleCanvas");
  player_3.penUp();
  player_3.goto(-160, 40);
  player_3.penDown();
  player_3.penColor("green");

  const player_4 = new Turtle("drawCanvas", "turtleCanvas");
  player_4.penUp();
  player_4.goto(-160, 10);
  player_4.penDown();
  player_4.penColor("orange");

  // Optional: spin turtles at start
  for (let i = 0; i < 10; i++) player_1.right(36);
  for (let i = 0; i < 72; i++) player_2.left(5);
  for (let i = 0; i < 60; i++) player_3.right(6);
  for (let i = 0; i < 30; i++) player_4.left(12);

  // Run race
  for (let i = 0; i < 100; i++) {
    await player_1.backward(Math.random() * 5 + 1);
    await player_2.backward(Math.random() * 5 + 1);
    await player_3.backward(Math.random() * 5 + 1);
    await player_4.backward(Math.random() * 5 + 1);
  }
})();
