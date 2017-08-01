// Enemies our player must avoid

/* A classe Enemy cria um objeto do tipo Inimigo e atribui a ele algumas
 * as seguintes características: uma imagem que representa o inimigo na tela,
 * a localização (x,y) do inimigo, a largura e altura para saber o espaço que o
 * inimigo ocupa na tela e a velocidade com que cada inimigo se movimenta.
 */
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.initial_position = x;
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 70;
};

// Update the enemy's position, required method for game
// Também checa as colisões entre os inimigos e o jogador
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if(this.x > 500){
        this.x = this.initial_position;
    }

    for(var i = 0; i < allEnemies.length; i++){
        if(((player.x >= allEnemies[i].x && player.x <= allEnemies[i].x + allEnemies[i].width) ||
        (player.x + player.width >= allEnemies[i].x && player.x + player.width <= allEnemies[i].x + allEnemies[i].width))
            && ((player.y >= allEnemies[i].y && player.y <= allEnemies[i].y + allEnemies[i].height) ||
            (player.y + player.height >= allEnemies[i].y && player.y + player.height <= allEnemies[i].y + allEnemies[i].height))){
                player.x = 200;
                player.y = 370;
                player.leaves -= 1;
        }
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/* A classe Player cria um objeto do tipo jogador atribuindo a ele as seguintes
 * características: uma imagem que representa o jogador na tela, a localização (x,y)
 * do jogador, a largura e altura para saber o espaço que o jogador ocupa na tela,
 * o número de vidas que o jogador possui inicialmente, e um booleano que verifica se o
 * jogador venceu o jogo ou não.
 */
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.leaves = 3;
    this.venceu = false;
};

// Verifica se o jogador venceu e coloca-o na posição inicial
Player.prototype.update = function() {
    if(this.y < 30){
        this.venceu = true;
        this.x = 200;
        this.y = 370;
    }
};

// Desenha o jogador na tela de acordo com suas coordenadas "x" e "y"
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* Verifica qual movimento o jogador está tentando fazer (pra cima, pra baixo,
 * pro lado esquerdo, pro lado direito) e se for possível fazê-lo, atualiza a
 * coordenada associada ao movimento.
 */
Player.prototype.handleInput = function(key) {
    if(this.x >= 50){
        if(key === 'left'){
            this.x = this.x - 50;
        }
    }
    if(this.x <= 380){
        if(key === 'right'){
            this.x = this.x + 50;
        }
    }
    if(this.y >= 30){
        if(key === 'up'){
            this.y = this.y - 50;
            if(this.y < 30){
                player.update();
            }
        }
    }
    if(this.y <= 400){
        if(key === 'down'){
            this.y = this.y + 50;
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(-280, 70, 300);
var bug2 = new Enemy(-280, 150, 400);
var bug3 = new Enemy(-600, 150, 100);
var bug4 = new Enemy(-280, 230, 200);
var bug5 = new Enemy(-1500, 230, 500);

var allEnemies = [bug1, bug2, bug3, bug4, bug5];

var player = new Player(200, 370);
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

