const Player = (name) => {
  const id = name + Math.floor(Math.random() * 100);
  let played = false;
  return { id, name, played };
};
const DisplayController = (() => {
  const displayX = (slotId) => {
    const slot = document.getElementById(slotId);
    slot.textContent = "X";
  };

  const displayO = (slotId) => {
    const slot = document.getElementById(slotId);
    slot.textContent = "O";
  };

  return { displayX, displayO };
})();
const GameBoard = (() => {
  //this is a module pattern cuz we dont need to instanciate gameboards we only need one
  const array = [];

  for (let i = 0; i < 3; i++) {
    array[i] = [];
    for (let j = 0; j < 3; j++) {
      array[i][j] = "";
    }
  }

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
        GameController.checkWinning();
      }
    } else {
      array[line][column] = "O";
      DisplayController.displayO(slotId);
      if (nbturn >= 5) {
        GameController.checkWinning();
      }
    }
  };

  return { addPlay, array, SlotAvailable };
})();
const GameController = (() => {
  //raha module hadi GameController tan sema kayna wahda sema ghi matkhafch reinitialisation a chque fois
  let numberOfTurnsPlayed = 0;
  const player1 = Player("aymen");
  const player2 = Player("jihad");
  const slotClicked = (e) => {
    if (GameBoard.SlotAvailable(e.target.id) == true) {
      if (player1.played == false) {
        player1.played = true;
        player2.played = false;
        numberOfTurnsPlayed++;
        GameBoard.addPlay(numberOfTurnsPlayed, e.target.id, "X");
        console.log(player1, player2);
      } else if (player1.played == true && player2.played == false) {
        player2.played = true;
        player1.played = false;
        numberOfTurnsPlayed++;
        GameBoard.addPlay(numberOfTurnsPlayed, e.target.id, "O");
        console.log(player1, player2);
      }
    } else {
      console.log("slot unAvailable");
    }
  };

  const checkWinning = () => {
    console.log(numberOfTurnsPlayed);
    let test = "testRows";
    let testDone = false;
    while (testDone == false) {
      let counter = 1;
      let past;
      if (test != "testDiagonals") {
        for (let i = 0; i < 3; i++) {
          if (test == "testRows") {
            past = GameBoard.array[i][0];
            console.log("this is i", i);
          } else {
            past = GameBoard.array[0][i];
            console.log("i ine test columns", i);
          }
          for (let j = 1; j < 3; j++) {
            console.log(i, j);
            if (test == "testRows") {
              if (
                (past == "X" || past == "O") &&
                past == GameBoard.array[i][j]
              ) {
                console.log("dkhalna");

                counter++;
              } else {
                counter = 1;
                break;
              }
            } else {
              console.log("dkhalna test columns");
              if (
                (past == "X" || past == "O") &&
                past == GameBoard.array[j][i]
              ) {
                counter++;
                console.log("dkhalna");
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
        past = GameBoard.array[0][0];
        for (let i = 1; i < 3; i++) {
          if (past == GameBoard.array[i][i]) {
            counter++;
          } else {
            break;
          }
        }
        if (counter !== 3) {
          counter = 1;
          past = GameBoard.array[0][2];

          if (past == "X" || past == "O") {
            console.log("dkhalna");
            if (
              past == GameBoard.array[1][1] &&
              past == GameBoard.array[2][0]
            ) {
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
        testDone = true;
        console.log(past);
        if (past == "X") {
          console.log("winner is X");
        } else {
          console.log("winner is O");
        }
        console.log("there is a winner");
      } else {
        if (test == "testRows") {
          test = "testColumns";
        } else {
          test = "testDiagonals";
        }
      }
    }
  };
  return { slotClicked, checkWinning };
})();

const initia = () => {
  const slots = document.querySelectorAll(".item");
  for (let slot of slots) {
    slot.addEventListener("click", GameController.slotClicked);
  }
};
initia();
