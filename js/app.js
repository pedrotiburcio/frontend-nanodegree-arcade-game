"use strict";
// Enemies our player must avoid

//Configura a posição inicial (x,y) do jogador e o tamanho do movimento que o jogador faz na tela (50px)
var appConfig = {
    playerInitialPosX: 200,
    playerInitialPosY: 370,
    movingStepX: 50,
    movingStepY: 50
};

/* A classe Entity representa uma entidade genérica, podendo ser jogador(Player) ou inimigo(Enemy).
 * Contém os parâmetros "x" e "y" referentes as coordenadas de cada entidade no jogo.
 */
var Entity = function(x, y){
    this.x = x;
    this.y = y;
}

//Este método é responsável por desenhar qualquer entidade no jogo.
Entity.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
    Entity.call(this, x, y);
    this.speed = speed;
    this.initial_position = x;
    this.width = 80;
    this.height = 70;
};

// Enemy herda todos os métodos de Entity
Enemy.prototype = Object.create(Entity.prototype);

// Setando o construtor para Enemy, já que ao herdar todos os métodos de Entity,
// o .constructor atribuído a Enemy seria o de Entity
Enemy.prototype.constructor = Enemy;

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

    allEnemies.forEach(function(enemy){
        if(((player.x >= enemy.x && player.x <= enemy.x + enemy.width) ||
        (player.x + player.width >= enemy.x && player.x + player.width <= enemy.x + enemy.width))
            && ((player.y >= enemy.y && player.y <= enemy.y + enemy.height) ||
            (player.y + player.height >= enemy.y && player.y + player.height <= enemy.y + enemy.height))){
                player.x = appConfig.playerInitialPosX;
                player.y = appConfig.playerInitialPosY;
                player.lifes -= 1;
        }
    });
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
    Entity.call(this, x, y);
    this.width = 50;
    this.height = 50;
    this.lifes = 3;
    this.venceu = false;
};

// Player herda todos os métodos de Entity.
Player.prototype = Object.create(Entity.prototype);

// Setando o construtor para Player, já que ao herdar todos os métodos de Entity,
// o .constructor atribuído a Player seria o de Entity
Player.prototype.constructor = Player;

// Verifica se o jogador venceu e coloca-o na posição inicial
Player.prototype.update = function() {
    if(this.y < 30){
        this.venceu = true;
        player.x = appConfig.playerInitialPosX;
        player.y = appConfig.playerInitialPosY;
    }
};

/* Verifica qual movimento o jogador está tentando fazer (pra cima, pra baixo,
 * pro lado esquerdo, pro lado direito) e se for possível fazê-lo, atualiza a
 * coordenada associada ao movimento.
 */
Player.prototype.handleInput = function(key) {
    if(this.x >= 50){
        if(key === 'left'){
            this.x = this.x - appConfig.movingStepX;
        }
    }
    if(this.x <= 380){
        if(key === 'right'){
            this.x = this.x + appConfig.movingStepX;
        }
    }
    if(this.y >= 30){
        if(key === 'up'){
            this.y = this.y - appConfig.movingStepY;
            if(this.y < 30){
                player.update();
            }
        }
    }
    if(this.y <= 400){
        if(key === 'down'){
            this.y = this.y + appConfig.movingStepY;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy;
var enemyPosY = 70;

for(var i = 0; i < 6; i++){
    // Atualizando a posição em 80px para baixo da tela, de 2 em 2 inimigos
    if(i > 1 && i % 2 === 0){
        enemyPosY += 80;
    }

    // Definindo aleatoriamente a posição e a velocidade de cada inimigo
    enemy = new Enemy(-300 + Math.random() * -1500, enemyPosY, 100 + Math.random() * 400);

    allEnemies.push(enemy);
}

var player = new Player(appConfig.playerInitialPosX, appConfig.playerInitialPosY);

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

