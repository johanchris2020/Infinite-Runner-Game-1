var gameState = 1;
var score = 0;
var player, player_animation;
var ground;
var background_image;
var obstacle, obstacleGroup, obstacle_img;
var enemy, enemy_animation;
var ground_img;

function preload() {
    player_animation = loadAnimation("Run1.png", "Run3.png", "Run4.png", "Run5.png", "Run6.png", "Run7.png", "Run8.png");
    enemy_animation = loadAnimation("Walk1.png", "Walk2.png", "Walk3.png", "Walk4.png", "Walk5.png", "Walk6.png", "Walk7.png", "Walk8.png", "Walk9.png", "Walk10.png")
    background_image = loadImage("JUNGLE.jpg")
    obstacle_img = loadImage("stone.png");
    ground_img = loadImage("Ground.jpg");
}

function setup() {
    createCanvas(684, 500);

    player = createSprite(250, 200, 20, 20);
    player.addAnimation("running", player_animation);
    player.scale = 0.2;
    player.setCollider("rectangle", player.x - 150, player.y - 200, 250, 450, 0);

    enemy = createSprite(100, 200, 20, 20);
    enemy.addAnimation("ENEMY", enemy_animation);
    enemy.scale = 0.2;

    ground = createSprite(310, 600, 700, 91);
    ground.visible = true;
    ground.addAnimation("Ground", ground_img);

    obstacleGroup = new Group();
}

function draw() {
    background(background_image);
    ground.velocityX = -12;
    if (ground.x < 300){
        ground.x = ground.width/2;
        ground.x = ground.width/2;
      }
    if (gameState === 1) {
        stroke("black");
        fill("black");
        text("Score: " + score, 100, 200);
        enemy.visible = true;
        player.visible = true;

        if (keyDown("space") && player.y ===356) {
            player.velocityY = -14;
        }
camera.position.y = player.y
        if (player.isTouching(obstacleGroup)) {
            obstacleGroup.destroyEach();
            player.visible = false;
            enemy.visible = false;
            gameState = 0;
        }

        if (enemy.isTouching(obstacleGroup)) {
            enemy.velocityY = -14;
            score = score + 1;
        }


        obstacles();
    }

    if (gameState === 0) {
        stroke("black");
        fill("black");
        text("Game Over press r to play again", 200, 250);
        if (keyDown("r")) {
            gameState = 1;
            score = 0;
        }
    }

    player.velocityY = player.velocityY + 0.8
    player.collide(ground);

    enemy.velocityY = enemy.velocityY + 0.8
    enemy.collide(ground);

    drawSprites();
}

function obstacles() {
    if (frameCount % 120 === 0) {
        obstacle = createSprite(600, 400, 10, 40);
        obstacle.addImage("obstacle_image", obstacle_img);
        obstacle.scale = 0.1;
        obstacle.velocityX = -6;
        obstacle.lifetime = 300;
        obstacleGroup.add(obstacle);
    }
}