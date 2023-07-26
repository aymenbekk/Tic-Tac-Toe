const Player = (name) => {
  const id = name + Math.floor(Math.random() * 100);

  let played = false;
  return { id, name, played };
};
const DisplayController = (() => {
  const buttonMode = document.getElementById("changeMode");
  const slots = document.querySelectorAll(".item");
  const displayX = (slotId) => {
    const slot = document.getElementById(slotId);
    slot.textContent = "X";
  };

  const displayO = (slotId) => {
    const slot = document.getElementById(slotId);
    slot.textContent = "O";
  };

  const restart = () => {
    for (let slot of slots) {
      slot.textContent = "";
    }
  };
  const displayWinCard = (winner) => {
    const winCard = document.querySelector(".win-card");
    const winnerText = document.querySelector("h1");
    winnerText.textContent = winner;
    winCard.classList.add("active");
  };

  const showAiButton = () => {
    buttonMode.textContent = "Against Ai";
  };
  const showPlayerButton = () => {
    buttonMode.textContent = "Against Player";
  };

  return {
    displayX,
    displayO,
    restart,
    displayWinCard,
    showAiButton,
    showPlayerButton,
  };
})();
const GameBoard = (() => {
  //this is a module pattern cuz we dont need to instanciate gameboards we only need one
  const array = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const initiArray = () => {
    for (let i = 0; i < 3; i++) {
      array[i] = [];
      for (let j = 0; j < 3; j++) {
        array[i][j] = "";
      }
    }
  };

  const SlotAvailable = (slotId) => {
    const line = slotId[0];
    const column = slotId[1];
    if (array[line][column] == "") {
      return true;
    } else {
      return false;
    }
  };

  const addPlay = (nbturn, slotId, type) => {
    const line = slotId[0];
    const column = slotId[1];
    if (type == "X") {
      array[line][column] = "X";
      DisplayController.displayX(slotId);
      if (nbturn >= 5) {
        let result = GameController.checkWinning(GameBoard.array);

        if (result != null) {
          DisplayController.displayWinCard(result);
        }
      }
    } else {
      array[line][column] = "O";
      DisplayController.displayO(slotId);
      if (nbturn >= 5) {
        let result = GameController.checkWinning(GameBoard.array);

        if (result != null) {
          DisplayController.displayWinCard(result);
        }
      }
    }
  };

  return { addPlay, array, SlotAvailable, initiArray };
})();
const GameController = (() => {
  //raha module hadi GameController tan sema kayna wahda sema ghi matkhafch reinitialisation a chque fois

  let currentMode = "playerXplayer";
  let numberOfTurnsPlayed = 0;
  const player1 = Player("aymen");
  const player2 = Player("jihad");
  const initaPlayers = () => {
    player1.played = false;
    player2.played = false;
    numberOfTurnsPlayed = 0;
  };
  const slotClicked = (e) => {
    if (GameBoard.SlotAvailable(e.target.id) == true) {
      if (player1.played == false) {
        player1.played = true;
        player2.played = false;
        numberOfTurnsPlayed++;

        GameBoard.addPlay(numberOfTurnsPlayed, e.target.id, "X");
      } else if (player1.played == true && player2.played == false) {
        player2.played = true;
        player1.played = false;
        numberOfTurnsPlayed++;
        GameBoard.addPlay(numberOfTurnsPlayed, e.target.id, "O");

        if (currentMode == "ai") {
          aiPlayer.play();
        }
      }
    } else {
      console.log("slot unAvailable");
    }
  };

  const checkWinning = (board) => {
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          openSpots++;
        }
      }
    }

    if (openSpots >= 5) {
      return null;
    }

    let test = "testRows";
    let testDone = false;
    while (testDone == false) {
      let counter = 1;
      let past;
      if (test != "testDiagonals") {
        for (let i = 0; i < 3; i++) {
          if (test == "testRows") {
            past = board[i][0];
          } else {
            past = board[0][i];
          }
          for (let j = 1; j < 3; j++) {
            if (test == "testRows") {
              if ((past == "X" || past == "O") && past == board[i][j]) {
                counter++;
              } else {
                counter = 1;
                break;
              }
            } else {
              if ((past == "X" || past == "O") && past == board[j][i]) {
                counter++;
              } else {
                counter = 1;
                break;
              }
            }
          }
          if (counter == 3) {
            break;
          }
        }
      } else {
        counter = 1;
        past = board[0][0];
        for (let i = 1; i < 3; i++) {
          if (past == board[i][i]) {
            counter++;
          } else {
            break;
          }
        }
        if (counter !== 3) {
          counter = 1;
          past = board[0][2];

          if (past == "X" || past == "O") {
            if (past == board[1][1] && past == board[2][0]) {
              counter = 3;
            } else {
              testDone = true;
            }
          } else {
            testDone = true;
          }
        }
      }
      if (counter == 3) {
        counter = 1;
        testDone = true;
        if (past == "X") {
          return "X";
        } else {
          return "O";
        }
      } else if (openSpots == 0 && counter != 3) {
        return "Tie";
      }

      if (test == "testRows") {
        test = "testColumns";
      } else if (test == "testColumns") {
        test = "testDiagonals";
      } else {
        return null;
      }
    }
  };

  const initAll = () => {
    GameBoard.initiArray();
    DisplayController.restart();
    GameController.initaPlayers();
  };
  const changeMode = () => {
    console.log("dkhalna fe chnage mode");
    if (currentMode == "playerXplayer") {
      currentMode = "ai";
      console.log(currentMode);
      DisplayController.showPlayerButton();
      initAll();
      aiPlayer.play();
    } else if (currentMode == "ai") {
      currentMode = "playerXplayer";
      DisplayController.showAiButton();
      GameBoard.initiArray();
      DisplayController.restart();
      GameController.initaPlayers();
    }
  };
  return { slotClicked, checkWinning, initaPlayers, changeMode, currentMode };
})();

const aiPlayer = (() => {
  const ai = "X";
  const human = "O"; //kichghol el ai ydir ga3 el possibilities li na9adro nel3bo fihom
  const play = () => {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (GameBoard.array[i][j] == "") {
          GameBoard.array[i][j] = ai;
          let score = minimax(GameBoard.array, 0, false);
          GameBoard.array[i][j] = "";
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i, j };
          }
        }
      }
    }
    document.getElementById(`${bestMove.i}${bestMove.j}`).click();
  };

  let scores = {
    X: 10,
    O: -10,
    Tie: 0,
  };

  const minimax = (board, depth, isMaximizing) => {
    let result = GameController.checkWinning(board);

    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "") {
            board[i][j] = ai;
            let score = minimax(board, depth + 1, false);
            board[i][j] = "";
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "") {
            board[i][j] = human;
            let score = minimax(board, depth + 1, true);
            board[i][j] = "";
            bestScore = Math.min(score, bestScore);
          }
        }
      }

      return bestScore;
    }
  };

  return { play };
})();

const initia = () => {
  const slots = document.querySelectorAll(".item");
  const button1 = document.querySelector(".restart");
  const buttonMode = document.getElementById("changeMode");
  DisplayController.showAiButton();
  for (let slot of slots) {
    slot.addEventListener("click", GameController.slotClicked);
  }

  button1.addEventListener("click", function () {
    console.log(GameController.currentMode);
    GameBoard.initiArray();
    DisplayController.restart();
    GameController.initaPlayers();
    if (GameController.currentMode == "ai") {
      console.log("here");
      aiPlayer.play();
    }
  });

  const winCard = document.querySelector(".win-card");
  winCard.addEventListener("click", function () {
    winCard.classList.remove("active");
    GameBoard.initiArray();
    DisplayController.restart();
    GameController.initaPlayers();
    if (GameController.currentMode == "ai") {
      aiPlayer.play();
    }
  });

  buttonMode.addEventListener("click", function () {
    console.log("buttttt");
    console.log(GameController.currentMode);
    GameController.changeMode();
  });
};
initia();
