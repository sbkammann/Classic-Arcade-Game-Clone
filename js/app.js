//random x coordinate for gems
function ranGX(){
  return (101*(Math.floor(Math.random()*4)))+15;
}
//random y coordinate for gems
function ranGY(){
  return (85*(Math.floor(Math.random()*4)))+83;
}

const modalBox = document.querySelector('.modalBox');
let l = 253;
//  modalBox.addEventListener('click', function select(event){
//  console.log(event.target.getAttribute('value'));
// });

const selector = document.querySelector('.selectorLayer');
let points = 0;


// Enemies our player must avoid
class Enemy {
  constructor(img, x, y, speedX) {
    this.sprite = img; //'images/enemy-bug.png';
    this.x = x;
    this.hX = this.x + 4;  //hitbox top left corner x coodinate
    this.y = y;
    this.hY = this.y + 75;  //hitbox top left corner Y coodinate
    this.speedX = speedX;
    this.width = 95;
    this.height = 70;

  }
  update(dt) {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      // is this the window object?
         this.x +=  this.speedX * dt;
         this.hX = this.x + 4;
         if (this.x > 600){
           this.x =-100;
         }

  }
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
      ctx.beginPath();
      ctx.rect(this.hX, this.hY, this.width, this.height);
      ctx.stroke();
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
    this.hX = this.x + 25;    //hitbox top left corner x coodinate
    this.y = y;
    this.hY = this.y + 75;    //hitbox top left corner y coodinate
    this.speedX = speedX;
    this.speedY = speedY;
    this.width = 50;   //hitbox width
    this.height = 50;  //hitbox height

  }
  update(dt) {
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
        console.log('collision');
        }
      });
    })();

    (function collision() {
    allGems.forEach(function(gem) {
      if (gem.hX < player.hX + player.width &&
          gem.hX + gem.width > player.hX &&
          gem.hY < player.hY + player.height &&
          gem.hY + gem.height > player.hY){
          gem.x = ranGX();
          gem.hX = gem.x + 4;
          gem.y = ranGY();
          gem.hY = gem.y + 45;
          console.log('collision');
          points +=100;
          document.getElementById("pointsDisplay").innerHTML = points;
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
const charSelect = ['images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-boy.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];

const player = new Player(charSelect[char = 2] , 200, 400, 100, 85);
 //
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
class Gem {
  constructor(img, x, y) {
    this.sprite = img;
    this.x = x;
    this.hX = this.x + 4; //hitbox top left corner x coodinate
    this.y = y;
    this.hY = this.y + 45; //hitbox top left corner y coodinate
    this.imgWidth = 101 * 0.65;
    this.imgHeight = 171 * 0.65;
    this.width = 60;
    this.height = 60;
  }
  update(dt) {

  }
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.imgWidth, this.imgHeight);
      ctx.beginPath();
      ctx.rect(this.hX, this.hY, this.width, this.height);
      ctx.stroke();

  }
};
  //when collision with player increase score when collision with bug disapper
  //randomly appear on field
const sapphire = new Gem('images/gem-blue.png', ranGX(), ranGY());
const emerald = new Gem('images/gem-green.png', ranGX(), ranGY());
const citrine = new Gem('images/gem-orange.png', ranGX(), ranGY());
const allGems = [sapphire, emerald, citrine];
// let gem1, gem2, gem3, gem4, gem5, gem6, gem7;
// let allGems = [];
// let index = 0;
// for (let i=0; i <5; i++){
//   for(let j=0; j <5; j++){
//   index++;
//   allGems[index] = 'gem' + index+1;
//   allGems[index] = new Gem('images/gem-blue.png', (101*i)+15, (85*j)+83);
//   }
// }



let modalClosed = false;
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
  //if modal is closed
      player.handleInput(allowedKeys[e.keyCode]);
    }
  });

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
  // console.log(l);
  selector.style.left = l.toString() + 'px';
});

let timerStart = false;
const accept = document.querySelector('.accept');

accept.addEventListener('click', function() {
  document.querySelector('.modalBox').style.opacity = '0';
  document.querySelector('.modalBg').style.opacity = '0';
  modalClosed = true;
  char = Math.round(((l/50)-1)/2);
  player.sprite = charSelect[char];
  timerStart = true;
 });
const next = document.querySelector('.next');
next.addEventListener('click', function() {
    document.querySelector('.welcomeWindow').style.zIndex = '-1';
    document.querySelector('.welcomeWindow').style.opacity = '0';

});

let hours = 0;
let minutes = 0;
let seconds = 0;
let hourText = '00';
let minText = '00';
let secText = '00';
const timeArray = [[hours, hourText], [minutes, minText], [seconds, secText]];

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
  let time = `${timeArray[0][1]}:${timeArray[1][1]}:${timeArray[2][1]}`;
  document.getElementById("timeDisplay").innerHTML = time;
  // sessionStorage.setItem('time', time);
}
}, 1000);
