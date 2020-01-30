import { SVG_NS } from "../settings";

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.direction = 1;
    //resets the ball in the middle of the board
    this.reset();
  }
  reset() {
    //code to center ball and for movement
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;
    //generate random number between -5 and 5
    //makes sure number doesn not equal 0
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    this.vx = this.direction * (6 - Math.abs(this.vy));
  }
  paddleCollision(player1, player2) {
    //if vx is greater than 0, detect paddle2 or player2
    if (this.vx > 0) {

      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        (this.x + this.radius >= leftX)
        && (this.x + this.radius <= rightX)
        && (this.y >= topY && this.y <= bottomY)
      ) {
        console.log("paddle")
        this.vx = -this.vx;
      }
    }
    //else detect paddle1
    else {
      let paddle = player1.coordinates(
        player1.x,
        player1.y,
        player1.width,
        player1.height
      )
      let [leftX, rightX, topY, bottomY] = paddle;
      if (
        (this.x - this.radius <= rightX)
        && (this.x - this.radius >= leftX)
        && (this.y >= topY && this.y <= bottomY)
      )
        this.vx = -this.vx;
    }
  }


  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    } else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
    //if ball hits left or right
    //reverse vx directon
    //this.vx = - this.vx
    //else if ball hits top or bottom
    //reverse vy direction
    //determine when the ball's edge has hit a wall
    //this.vy = - 1
    //make ball vx flip to -vx when it hits a side wall
    //make ball vy flip to -vy when it hits a top or bottom wall
  }

  goal(player) {
    player.score++

    this.reset()
  }


  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();

    this.paddleCollision(player1, player2);

    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "cx", this.x);
    circle.setAttributeNS(null, "cy", this.y);
    circle.setAttributeNS(null, "fill", "white");
    svg.appendChild(circle);

    const rightGoal = this.x + this.radius >= this.boardWidth
    const leftGoal = this.x - this.radius <= 0

    if (rightGoal) {
      this.goal(player1);
      this.direction = 1;
      console.log('player 1 scored')

    }
    else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
      console.log('player 2 scored')
    }
  }
}
