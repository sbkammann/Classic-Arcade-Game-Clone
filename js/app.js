/* Classic Arcade Game Clone
*
*Last revision 8/11/2018
*/

//random x coordinate for gems
function ranGX(){
  return (101*(Math.floor(Math.random()*4)))+15;
}
//random y coordinate for gems
function ranGY(){
  return (85*(Math.floor(Math.random()*4)))+83;
}

// variables needed for the timer
let time = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;
let hourText = '00';
let minText = '00';
let secText = '00';
const timeArray = [[hours, hourText], [minutes, minText], [seconds, secText]];
let timerStart = false;

const selector = document.querySelector('.selectorLayer');
let points = 0;
// if set to true activates hard game mode
let insane = false;
// doesn't allow the player to move when a modal window is visible
let modalClosed = false;
const modalBox = document.querySelector('.modalBox');
let l = 253;

// Enemies our player must avoid
class Enemy {
  constructor(img, x, y, speedX) {
    this.sprite = img;
    this.x = x;
    this.hX = this.x + 4;  //hitbox top left corner x coodinate
    this.y = y;
    this.hY = this.y + 75;  //hitbox top left corner Y coodinate
    this.speedX = speedX;
    this.width = 95;
    this.height = 70;
  }
  update(dt) {
         this.x +=  this.speedX * dt;
         this.hX = this.x + 4;
         if (this.x > 600){
           this.x =-100;
           // allows enemies to travel on the grass. This means there is no safe zone.
        if(this.y < 400 && insane)
           this.y = this.y + 83;
           this.hY = this.y + 75;
         }
        if (this.y > 400 && insane){
          this.y = 60;
          this.hY = this.y + 75;
        }
  }
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
      // Hitbox animation for testing
      // ctx.beginPath();
      // ctx.rect(this.hX, this.hY, this.width, this.height);
      // ctx.stroke();
  }
};
// creates enemy instances
const enemy1 = new Enemy('images/enemy-bug.png', 0, 60, 60);
const enemy2 = new Enemy('images/enemy-bug.png', -100, 145, 100);
const enemy3 = new Enemy('images/enemy-bug.png', 100, 230, 80);
var allEnemies = [enemy1, enemy2, enemy3];

// sets up player class
class Player extends Enemy {
  constructor(img, x, y, speedX, speedY) {
    super(img, x, y, speedX);
    this.sprite = img;
    this.x = x;
    this.hX = this.x + 25;    //hitbox top left corner x coodinate
    this.y = y;
    this.hY = this.y + 75;    //hitbox top left corner y coodinate
    this.speedX = speedX;
    this.speedY = speedY;
    this.width = 50;   //hitbox width
    this.height = 50;  //hitbox height

  }
  update(dt) {
    // checks to see if the hitboxes of the player of an enemy overlap
    //if they do resets the game by putting the player back on the starting square
    //and setting points and time to zero
    (function collision() {
    allEnemies.forEach(function(enemy) {
      if (enemy.hX < player.hX + player.width &&
          enemy.hX + enemy.width > player.hX &&
          enemy.hY < player.hY + player.height &&
          enemy.hY + enemy.height > player.hY){
        player.x = 200;
        player.hX = player.x + 25;
        player.y = 400;
        player.hY = player.y + 75;
        timeArray.forEach(function(index, val) {
          timeArray[val][0] = 0;
        });
        points = 0;
        document.getElementById("pointsDisplay").innerHTML = points;
        }
      });
    })();
    //handles gem collections by detecting hitbox overlap of player and gems and adds gem
    //point value to points
    (function collision() {
    allGems.forEach(function(gem) {
      if (gem.hX < player.hX + player.width &&
          gem.hX + gem.width > player.hX &&
          gem.hY < player.hY + player.height &&
          gem.hY + gem.height > player.hY){
          points +=gem.pts;
          document.getElementById("pointsDisplay").innerHTML = points;
           gem.x = ranGX();
           gem.hX = gem.x + 4;
           gem.y = ranGY();
           gem.hY = gem.y + 45;
        }
      });
    })();
// detects when the player is in the water and ends the game by bring up the highscore
//modal window
    if (this.y === -25) {
      document.getElementById("highscore").innerHTML = points;
      modalClosed = false;
      document.querySelector('.winWindow').style.zIndex = '5';
      document.querySelector('.winWindow').style.opacity = '1';
      document.querySelector('.modalBg').style.opacity = '1';
      document.querySelector('.modalBox').style.opacity = '1';
    }
  }
  render() {
    super.render();
  }
  handleInput(e) {
    //controls player and stops player from exiting map
      if (e === 'left' && this.x !== 0){
        this.x -= this.speedX;
        this.hX = this.x + 25;
      }
      if (e === 'right' && this.x !== 400){
        this.x += this.speedX;
        this.hX = this.x + 25;
      }
      if (e === 'up' && this.y !== -25){
        this.y -= this.speedY;
        this.hY = this.y + 75;
      }
      if (e === 'down' && this.y !== 400){
        this.y += this.speedY;
        this.hY = this.y + 75;
      }
  }
};
//character skin pool
const charSelect = ['images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-boy.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
//creates player instance. Default is char-boy
const player = new Player(charSelect[char = 2] , 200, 400, 100, 85);
// sets up gem class
class Gem {
  constructor(img, x, y, pts, spawnT) {
    this.sprite = img;
    this.x = x;
    this.hX = this.x + 4; //hitbox top left corner x coodinate
    this.y = y;
    this.hY = this.y + 45; //hitbox top left corner y coodinate
    this.imgWidth = 101 * 0.65;
    this.imgHeight = 171 * 0.65;
    this.width = 60;
    this.height = 60;
    this.pts = pts; //point value
  }
  update(dt) {

  }
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.imgWidth, this.imgHeight);
      // Hitbox animation for testing
      // ctx.beginPath();
      // ctx.rect(this.hX, this.hY, this.width, this.height);
      // ctx.stroke();
  }
};
// creates gem instances
const sapphire = new Gem('images/gem-blue.png', ranGX(), ranGY(), 300);
const emerald = new Gem('images/gem-green.png', ranGX(), ranGY(), 200);
const citrine = new Gem('images/gem-orange.png', ranGX(), ranGY(), 100);
const allGems = [sapphire, emerald, citrine];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
  document.addEventListener('keyup', function(e) {
    if(modalClosed){
      var allowedKeys = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down'
      };
      player.handleInput(allowedKeys[e.keyCode]);
    }
  });
// moves selector image to move with arrow keys in the character select  modal window
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        39: 'right',
    };
          if (allowedKeys[e.keyCode] === 'left' && l !== 47){
            l -= 103;
          }
          if (allowedKeys[e.keyCode] === 'right' && l !== 459){
              l += 103;
          }
  selector.style.left = l.toString() + 'px';
});


const accept = document.querySelector('.accept');

accept.addEventListener('click', function() {
  //closes modal
  document.querySelector('.modalBox').style.opacity = '0';
  document.querySelector('.modalBg').style.opacity = '0';
  modalClosed = true;
  char = Math.round(((l/50)-1)/2);
  // sets character image based on selection
  player.sprite = charSelect[char];
  // starts timer
  timerStart = true;
 });

const next = document.querySelector('.next');
next.addEventListener('click', function() {
  // checks which difficulty was selected
  if(document.forms[0][0].checked || document.forms[0][1].checked) {
    document.querySelector('.welcomeWindow').style.zIndex = '-1';
    document.querySelector('.welcomeWindow').style.opacity = '0';
    if(document.forms[0][1].checked) {
      insane = true;
    }
    if(insane) {
      // creates more enemy instances
      const enemy4 = new Enemy('images/enemy-bug.png', -100, 300, 110);
      const enemy5 = new Enemy('images/enemy-bug.png', 100, 400, 90);
      const enemy6 = new Enemy('images/enemy-bug.png', -100, 400, 200);
      const enemy7 = new Enemy('images/enemy-bug.png', 100, 145, 60);
      allEnemies.push(enemy4, enemy5, enemy6, enemy7);
    }
  }
  else {
  // prompts the user to select one of the radio buttons
  document.querySelector('.alert').style.opacity = '1';
  }
  });
//timer
setInterval(function() {
  if (timerStart){
  timeArray[2][0]++;
  if (timeArray[2][0] === 60){
    timeArray[1][0]++;
    timeArray[2][0] = 0;
  }
  if (timeArray[1][0] === 60){
    timeArray[0][0]++;
    timeArray[1][0] =0;
  }
  for (let i = 0; i < timeArray.length; i++){
    if (timeArray[i][0].toString().length < 2){
      timeArray[i][1] = '0' + timeArray[i][0].toString();
    }
    else {
      timeArray[i][1] = timeArray[i][0].toString();
    }
   }
  time = `${timeArray[0][1]}:${timeArray[1][1]}:${timeArray[2][1]}`;
  document.getElementById("timeDisplay").innerHTML = time;
}
}, 1000);

const restart = document.querySelector('.restart');
restart.addEventListener('click', function() {
    document.querySelector('.winWindow').style.zIndex = '-1';
    document.querySelector('.winWindow').style.opacity = '0';
    modalClosed = true;
    // resets game so the player can play again
    player.x = 200;
    player.hX = player.x + 25;
    player.y = 400;
    player.hY = player.y + 75;
    points = 0;
    document.getElementById("pointsDisplay").innerHTML = points;
    timeArray.forEach(function(index, val) {
      timeArray[val][0] = 0;
    });
  });
