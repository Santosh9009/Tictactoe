const gamecell = document.querySelectorAll(".cell");
const num1 = document.querySelector(".num1");
const num2 = document.querySelector(".num2");
const resetbtn = document.querySelector(".reset");

let currentPlayer = "X";
let nextplayer = "O";
let playerturn = currentPlayer;

num1.textContent = currentPlayer;
num2.textContent = nextplayer;

const startgame = () => {
  gamecell.forEach((cell) => {
    cell.addEventListener("click", handleclick);
  });
};

const handleclick = (e) => {
  if (e.target.textContent === "") {
    e.target.textContent = playerturn;
    if (checkwin()) {
      alert(`${playerturn} won the game`);
      disabled();
    } else if (tie()) {
      console.log("its a tie");
      disabled();
    } else {
      changeturn();
    }
  }
};

const changeturn = () => {
  playerturn = playerturn === currentPlayer ? nextplayer : currentPlayer;
};
const checkwin = () => {
  const conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (i = 0; i < conditions.length; i++) {
    const [pos1, pos2, pos3] = conditions[i];
    if (
      gamecell[pos1].textContent !== "" &&
      gamecell[pos1].textContent === gamecell[pos2].textContent &&
      gamecell[pos2].textContent === gamecell[pos3].textContent
    ) {
      return true;
    }
  }
  return false;
};
const tie = () => {
  let emptycount = 0;
  gamecell.forEach((cell) => {
    if (cell.textContent === "") {
      emptycount++;
    }
  });
  if (emptycount === 0 && !checkwin()) {
    return true;
  }
  return false;
};

const disabled = () => {
  gamecell.forEach((cell) => {
    cell.removeEventListener("click", handleclick);
    cell.classList.add("disabled");
  });
};

const restart = () => {
  gamecell.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disabled");
  });
  startgame();
};
resetbtn.addEventListener("click", restart);

startgame();
