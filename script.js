    const character = document.getElementById('character');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    let gameInterval;
    const gameContainer = document.getElementById('game-container');

    function moveCharacter(event) {
      if (event.key === 'ArrowLeft') {
        const characterLeft = parseInt(getComputedStyle(character).left);
        if (characterLeft > 0) {
          character.style.left = (characterLeft - 30) + 'px';
        }
      } else if (event.key === 'ArrowRight') {
        const characterLeft = parseInt(getComputedStyle(character).left);
        if (characterLeft < (gameContainer.clientWidth - character.clientWidth)) {
          character.style.left = (characterLeft + 30) + 'px';
        }
      }
    }

    function createFallingObject() {
      const fallingObject = document.createElement('div');
      fallingObject.classList.add('falling-object');
      fallingObject.style.left = Math.random() * (gameContainer.clientWidth - 20) + 'px';
      let num = Math.floor(Math.random() *7)+1;
      fallingObject.innerHTML =`<img src="./images/${num}.png" alt=""></img>`;
      gameContainer.appendChild(fallingObject);


      const fallInterval = setInterval(() => {
        const topPosition = parseInt(getComputedStyle(fallingObject).top);
        fallingObject.style.top = (topPosition + 5) + 'px';

        if (topPosition > (gameContainer.clientHeight - fallingObject.clientHeight)) {
          clearInterval(fallInterval);
          gameContainer.removeChild(fallingObject);
        }

        const characterLeft = parseInt(getComputedStyle(character).left);
        const characterRight = characterLeft + character.clientWidth;
        const objectLeft = parseInt(getComputedStyle(fallingObject).left);
        const objectRight = objectLeft + fallingObject.clientWidth;

        if (topPosition >= (gameContainer.clientHeight - fallingObject.clientHeight - character.clientHeight) &&
            characterLeft <= objectRight && characterRight >= objectLeft) {
          gameContainer.removeChild(fallingObject);
          score+=10;
          scoreDisplay.textContent = 'Score: ' + score;
        }
      }, 20);
    }

    function startGame() {
      score = 0;
      scoreDisplay.textContent = 'Score: 0';
      character.style.left = '50%';
      gameInterval = setInterval(createFallingObject, 1000);
      window.addEventListener('keydown', moveCharacter);
    }

    function endGame() {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', moveCharacter);
      
    }
    startGame();
    runTimer();
    {/*  Game duration: 30 seconds */}
    timer = 30;
    function runTimer(){
        var timerInterval = setInterval(function(){
            if(timer>0){
                timer--;
                document.querySelector("#timerVal").textContent = `Timer: ${timer}`;
            }
            else{
                clearInterval(timerInterval);
                document.body.innerHTML=`<div class = "game-over"><h1> Game Over!<br>Your Score: ${score}</h1></div> <a href="index.html"><button class="button2">Exit</button></button></a> `;
            }
            
        },1000);
    }