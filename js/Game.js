class Game{
    constructor(){
        this.header = createElement('h1');
        this.rank1 = createElement('h2');
        this.rank2 = createElement('h2');
        this.win = createElement('h1');
    }
    getState(){
      var gameStateRef = database.ref('gameState');
      gameStateRef.on("value",function(data){
        gameState = data.val();
      })
    }
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }

    
   
    async start(){
        if(gameState === 0){
          player = new Player();
          var playerCountRef = await database.ref('playerCount').once("value");
          if(playerCountRef.exists()){
            playerCount = playerCountRef.val();
            player.getCount();
          }
          form = new Form()
          form.display();
        }

        player1 = createSprite(500,600,50,100);
        player1.addImage(blueRunnerImg);
        player1.scale = 0.5;
        player2 = createSprite(875,600,50,100);
        player2.addImage(redRunnerImg);
        player2.scale = 0.5;
        players = [player1,player2];
    }

    
      play(){
        form.hide();
        background("black");


        Player.getPlayerInfo();
        player.getCarsAtEnd();
       
        if(allPlayers !== undefined){
          image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
          var index = 0;
          var y;
          var x = 200;
          for(var plr in allPlayers){
            index = index + 1 ;
    
            x += 350;
            players[index-1].x = x;

            y = displayHeight - allPlayers[plr].distance;
            players[index-1].y = y - 150;
            
            if(index === player.index){
              camera.position.x = displayWidth/2;
              camera.position.y = players[index-1].y;
              stroke(10);
              //fill("red");
              noFill();
              ellipse(x,y - 150,200,200);
            }
          }
        }
        //console.log(player.index);
       
        

        if(keyIsDown(UP_ARROW) && player.distance < 4400 && player.index !== null){
          player.distance +=10
          //console.log(player1.y);
          player.update();
        }

        if(mouseIsPressed){
          console.log(mouseX,mouseY);
          console.log(player.name,player.rank);
        }

        if(player.distance === 4390){
          player.rank += 1;
          Player.updateCarsAtEnd(player.rank);
        }

        if(player.distance === 4400){
          gameState = 2;
        }

        drawSprites();
      }
      end(){
        console.log("The Game is Over");
        background(podiumImg);

      }
      display(){
        this.header.html("The Game is Over!");
        this.header.position(600,50);
        
        this.rank1.html("Your Rank: " + player.rank);
        //this.rank2.html("Opponent's Rank: ") + enemyRank;
        if(player.rank === 1){
          this.rank2.html("Opponent's Rank: 2");
          this.win.html("YOU WON!");
        }else if(player.rank === 2){
          this.rank2.html("Opponent's Rank: 1");
          this.win.html("YOU LOST!");
        }

          this.win.position(600,650);

        if(player.rank === 1){
          this.rank1.position(600,150);
          this.rank2.position(200,300);
        }else if(player.rank === 2){
          this.rank1.position(200,300);
          this.rank2.position(600,150);
        }
      }
}