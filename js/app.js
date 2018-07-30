// Enemies our player must avoid
class Enemy {
  constructor(img, x, y, speedX) {
    this.sprite = img; //'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.width = 50;
    this.height = 40;

  }
  update(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      // is this the window object?
          this.x +=  this.speedX * dt;
          if (this.x > 600){
            this.x =-100;
          }

  }
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};
const enemy1 = new Enemy('images/enemy-bug.png', 0, 60, 60);
const enemy2 = new Enemy('images/enemy-bug.png', -100, 145, 100);
const enemy3 = new Enemy('images/enemy-bug.png', 100, 230, 80);

var allEnemies = [enemy1, enemy2, enemy3];

class Player extends Enemy {
  constructor(img, x, y, speedX, speedY) {
    super(img, x, y, speedX);
    this.sprite = img;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.width = 7; 
    this.height = 8;

  }
  update(dt) {
    (function collision() {
    allEnemies.forEach(function(enemy) {
      if (enemy.x < player.x + player.width &&
          enemy.x + enemy.width > player.x &&
          enemy.y < player.y + player.height &&
          enemy.y + enemy.height > player.y){
        player.x = 200;
        player.y = 400;
        console.log('collision');
        }
      });
    })();
  }
  render() {
    super.render();
  }
  handleInput(e) {
    if (e === 'left' && this.x !== 0){
      this.x -= this.speedX;
    }
    if (e === 'right' && this.x !== 400){
      this.x += this.speedX;
    }
    if (e === 'up' && this.y !== -25){
      this.y -= this.speedY;
    }
    if (e === 'down' && this.y !== 400){
      this.y += this.speedY;
    }
  }
}

const player = new Player('images/char-boy.png', 200, 400, 100, 85);
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
