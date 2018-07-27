// Enemies our player must avoid
class Enemy = function() {
  constructor(img) {
    this.sprite = img; //'images/enemy-bug.png';
    this.location =
    this.speed =
  }
  update(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
  }
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

class Player extends Enemy {
  constructor(img) {
    this.sprite = img; //'images/enemy-bug.png';
    this.location =
    this.speed =
  }
  update() {
    super.update(dt);
  }
  render() {
    super.render();
  }
  handleInput() {

  }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
