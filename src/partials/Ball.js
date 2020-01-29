import { SVG_NS } from "../settings";

export default class Ball {
  constructor(radius, boardHeight, boardWidth) {
    this.radius = radius;
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.direction = 1;
    //resest the ball in the middle of the board
    this.reset();
  }
  reset() {
    //code to center ball and for movement
  }

  render(svg) {
    let circle = document.createElementNS(SVG_NS, "circle");

    circle.setAttributeNS(null, "r", this.radius);
    circle.setAttributeNS(null, "cx", this.boardHeight / 2);
    circle.setAttributeNS(null, "cy", this.boardWidth / 2);
    circle.setAttributeNS(null, "fill", "white");
    svg.appendChild(circle);
  }
}
