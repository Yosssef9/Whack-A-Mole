allcells = {
  1: {
    left: 60,
    top: 70,
  },
  2: {
    left: 230,
    top: 70,
  },
  3: {
    left: 390,
    top: 70,
  },
  4: {
    left: 60,
    top: 220,
  },
  5: {
    left: 230,
    top: 220,
  },
  6: {
    left: 390,
    top: 220,
  },
  7: {
    left: 60,
    top: 380,
  },
  8: {
    left: 230,
    top: 380,
  },
  9: {
    left: 390,
    top: 380,
  },
};

let mole = document.querySelector(".mole");
let start = document.querySelector(".start");
let highScoreScreen = document.querySelector(".highScore");
let end = document.querySelector(".end");
let timeLeftScreen = document.querySelector(".timeLeft");
let timeLeft = 60;
let highScore = 0;
localStorage.setItem("High Score", JSON.stringify(highScore));

function handelStart() {
  start.style.display = "none";
  mole.addEventListener("click", handleClick);

  let moleMovementInterval = setInterval(() => {
    let number = getRandomNumber();
    console.log(number);
    moveToCell(number);
  }, 300);

  let time = setInterval(() => {
    if (timeLeft <= 0) {
      if (score < 10) {
        document.getElementById("falied1").play();
      } else if (score > 10 && score < 20) {
        document.getElementById("falied2").play();
      } else if (score >= 20) {
        document.getElementById("success").play();
      }

      clearInterval(time);
      clearInterval(moleMovementInterval);
      start.removeEventListener("click", handelStart);
      timeLeftScreen.textContent = "Time's up!";
      end.style.display = "block";
      end.textContent = `Your Score is ${score}`;
      localStorage.getItem("highScore");
      if (score > highScore) {
        highScore = score;
        highScoreScreen.textContent = `High Score = ${highScore}`;
        localStorage.setItem("High Score", JSON.stringify(highScore));
      }
    } else {
      timeLeft--;
      timeLeftScreen.textContent = `Time Left : ${timeLeft}s`;
    }
  }, 1000);
}

let previousNumber = null;

start.addEventListener("click", handelStart);

function getRandomNumber() {
  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * 9) + 1;
  } while (randomNumber === previousNumber);

  previousNumber = randomNumber;
  return randomNumber;
}

function moveToCell(location) {
  mole.style.left = ` ${allcells[location].left}px `;
  mole.style.top = ` ${allcells[location].top}px `;
}

let scoreScreen = document.querySelector(".score");
let score = 0;
// Define the event handler function separately
function handleClick() {
  if (timeLeft <= 0) {
    mole.removeEventListener("click", handleClick); // Remove the event listener
  } else {
    document.getElementById("hit").play();
    mole.style.backgroundColor = "#6b0dff";

    setTimeout(() => {
      mole.style.backgroundColor = "blue";
    }, 400);
    score++;
    scoreScreen.textContent = `Score = ${score}`;
  }
}
