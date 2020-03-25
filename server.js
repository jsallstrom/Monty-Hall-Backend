const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json()); // adding a piece of middle ware to open up features
app.use(bodyParser.json());

const PORT = 3001; //  the port which you will use

// REMOVE ALL COMMENTS!!!

app.listen(PORT, () => {
     console.log(`Example app listening on localhost:${PORT}`);
});

app.get("/", (req, res) => {
     res.send("You have successfully been connected to the backend!");
});

app.post("/", (req, res) => {
     const numOfGames = req.body.numOfGames;
     const changeDoor = req.body.changeDoor;

     const result = simulateGames(numOfGames, changeDoor);

     res.status(200).json(result);
});

// Might have to install cors here so the React app can access it, else we get an
// security error

// make it more about, game won if, return result and make this code clearer for you
// so you can explain it better, change name of function names also
function playGame(changeDoor) {
     const allDoors = [0, 1, 2];

     let prizeDoor = Math.floor(Math.random() * 3);

     let playerSelectedDoor = Math.floor(Math.random() * 3);

     let openGoatDoor = allDoors.find((door) => door !== prizeDoor && door !== playerSelectedDoor);

     if (changeDoor) {
          return prizeDoor === allDoors.find((door) => door !== playerSelectedDoor && door !== openGoatDoor);
     } else {
          return prizeDoor === playerSelectedDoor;
     }
}

function simulateGames(numOfGames, changeDoor) {
     let numOfGamesWon = 0;
     for (let i = 0; i < numOfGames; i++) {
          numOfGamesWon += playGame(changeDoor);
     }

     return numOfGamesWon;
}
