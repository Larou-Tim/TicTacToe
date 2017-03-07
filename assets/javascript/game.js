var config = {
  apiKey: "AIzaSyBCOx7LKB6MvDLnwJsz-ZNrnT-MyFTEUgI",
  authDomain: "spark-tictac.firebaseapp.com",
  databaseURL: "https://spark-tictac.firebaseio.com",
  storageBucket: "spark-tictac.appspot.com",
  messagingSenderId: "247801094701"
};

firebase.initializeApp(config);
    
var database = firebase.database();
var allSpots = ["topL", "topC", "topR", "midL", "midC", "midR", "botL", "botC", "botR"]
var curPlayer = "X"
var gameBoard = {
  "topL" : "", "topC" : "", "topR" : "", 
  "midL" : "", "midC" : "", "midR" : "", 
  "botL" : "", "botC" : "", "botR" : ""
}

database.ref().on("value", function(snapshot) {
      gameBoard = snapshot.val().board;
      curPlayer = snapshot.val().player;
      drawBoard();
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });


$(".well").on("click",function() {
      
  if ($(this).text() == "") {
    gameBoard[$(this).attr("id")] = curPlayer;
    drawBoard();
    winCheck(curPlayer);

    if (curPlayer == "X") {
      curPlayer = "O";
    }
    else {
      curPlayer = "X";
    }
  }

  database.ref().set({
        board: gameBoard,
        player: curPlayer,
  });

});

function drawBoard() {
  for (var i = 0; i < allSpots.length; i++){
      $("#" + allSpots[i]).text(gameBoard[allSpots[i]]);
    }
}

function winCheck(piece) {
 
  if (gameBoard.topL == piece && gameBoard.topC == piece && gameBoard.topR == piece) {
    createAlert();
  }
  else if (gameBoard.midL == piece && gameBoard.midC == piece && gameBoard.midR == piece) { 
      createAlert();
  }
   else if (gameBoard.botL == piece && gameBoard.botC == piece && gameBoard.botR == piece) { 
      createAlert();
  }
  else if (gameBoard.topL == piece && gameBoard.midL == piece && gameBoard.botL == piece) { 
    createAlert();
  }
  else if (gameBoard.topC == piece && gameBoard.midC == piece && gameBoard.botC == piece) { 
    createAlert();
  }
  else if (gameBoard.topR == piece && gameBoard.midR == piece && gameBoard.botR == piece) { 
    createAlert();
  }
  else if (gameBoard.topL == piece && gameBoard.midC == piece && gameBoard.botR == piece) { 
    createAlert();
  }
  else if (gameBoard.topR == piece && gameBoard.midC == piece && gameBoard.botL == piece) { 
    createAlert();
  }
}

    
function createAlert() {

  var alertHolder = $("<div>");
  alertHolder.attr("class", "alert lert-dismissible alert-warning");
  alertHolder.text("Well done! Player " + curPlayer + " Wins! ");
  var alertButton = $("<button>");
  alertButton.attr("class", "close");
  alertButton.attr("type","button");
  alertButton.attr("data-dismiss","alert");
  alertHolder.append(alertButton);

  var alertReset = $("<a>");
  alertReset.attr("class", "alert-link");
  alertReset.attr("onclick","resetBoard()");
  alertReset.text("Reset board?");
  alertHolder.append(alertReset);
  $("#alert-place").append(alertHolder);

}

function resetBoard() {
  curPlayer = 'X';
  gameBoard = {
    "topL" : "",
    "topC" : "",
    "topR" : "", 
    "midL" : "", 
    "midC" : "", 
    "midR" : "", 
    "botL" : "", 
    "botC" : "", 
    "botR" : ""

  }
  drawBoard();  
   $('#alert-place').empty();

  database.ref().set({
    board: gameBoard,
    player: curPlayer,
  });
}