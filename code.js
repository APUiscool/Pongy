var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["c7438fdb-25d4-4e93-8b80-794313029a4f","6d835de7-21db-4125-9e22-851b497e32d8","1167f523-439d-4f44-98f9-babfec8bed86"],"propsByKey":{"c7438fdb-25d4-4e93-8b80-794313029a4f":{"name":"volleyball","sourceUrl":"assets/api/v1/animation-library/gamelab/JTd581LwNfOIZ0FzKo.ais_jFYPyV4_G/category_sports/volleyball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"JTd581LwNfOIZ0FzKo.ais_jFYPyV4_G","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/JTd581LwNfOIZ0FzKo.ais_jFYPyV4_G/category_sports/volleyball.png"},"6d835de7-21db-4125-9e22-851b497e32d8":{"name":"board","sourceUrl":"assets/api/v1/animation-library/gamelab/pJCxbSzoKbyMLi_XnMeuWMyJUwopCrpW/category_video_games/spring_in_out.png","frameSize":{"x":147,"y":112},"frameCount":3,"looping":true,"frameDelay":3,"version":"pJCxbSzoKbyMLi_XnMeuWMyJUwopCrpW","categories":["video_games"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":441,"y":112},"rootRelativePath":"assets/api/v1/animation-library/gamelab/pJCxbSzoKbyMLi_XnMeuWMyJUwopCrpW/category_video_games/spring_in_out.png"},"1167f523-439d-4f44-98f9-babfec8bed86":{"name":"board2","sourceUrl":null,"frameSize":{"x":147,"y":112},"frameCount":3,"looping":true,"frameDelay":3,"version":"NUF3AudnS_3bdcatXFmgfEgix6Jj_NV0","categories":["video_games"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":294,"y":224},"rootRelativePath":"assets/1167f523-439d-4f44-98f9-babfec8bed86.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//create the ball, Player1 and Player2 as sprite objects
var ball = createSprite(200,200,10,10);
ball.setAnimation("volleyball");
ball.scale=0.1;
var Player1 = createSprite(200,390,70,10);
Player1.setAnimation("board");
Player1.scale=0.5;
var Player2 = createSprite(200,10,70,10);
Player2.setAnimation("board2");
Player2.scale=0.5;

//variable to store different state of game
var gameState = "serve";

function draw() {
  background("#00ffb3");
  
  //place info text in the center
  if (gameState === "serve") {
    text("Click to Serve",165,180);
  }
 
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(i,200,i+10,200);
  }
  
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  createEdgeSprites();
  ball.bounceOff(rightEdge);
  ball.bounceOff(leftEdge);
  ball.bounceOff(Player1);
  ball.bounceOff(Player2);
  
  //serve the ball when space is pressed
  if (mouseWentDown("leftButton") && gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.y > 400 || ball.y <0) {
    gameState= "serve";
    reset();
  }
  
  if(World.mouseY < 200) {
    Player2.x = World.mouseX;
  }
  if(World.mouseY > 200) {
    Player1.x = World.mouseX;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = randomNumber(-5, -7),randomNumber(5, 7);
  ball.velocityY = randomNumber(5, 7),randomNumber(-5, -7);
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
  Player1.Y=200;
  Player2.Y=200;
}
// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
