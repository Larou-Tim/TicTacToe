 // var config = {
 //    apiKey: "AIzaSyBCOx7LKB6MvDLnwJsz-ZNrnT-MyFTEUgI",
 //    authDomain: "spark-tictac.firebaseapp.com",
 //    databaseURL: "https://spark-tictac.firebaseio.com",
 //    storageBucket: "spark-tictac.appspot.com",
 //    messagingSenderId: "247801094701"
 //  };
 //  firebase.initializeApp(config);
    

 //    var database = database.firebase();

    
    var xY;
    // var gameBoard = [0,1,2,3,4,5,6,7,8,9];
    var allSpots = ["Top-L", "Top-C", "Top-R", "Mid-L", "Mid-C", "Mid-R", "Bot-L", "Bot-C", "Bot-R"]
    var player;
    var emptySpot = true;

    var curPlayer = "X"

var gameBoard= {
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

    $(".well").on("click",function() {

      // checkSpot($(this).attr("id"));
      
       if ($(this).text() == "") {
// main loop to assign piece and check winner
   
          $(this).text(curPlayer);
          gameBoard[$(this).attr("id")] = curPlayer;
          console.log(gameBoard);
          winCheck(curPlayer);

          if (curPlayer == "X") {
            curPlayer = "O";
          }
          else {
            curPlayer = "X";
          }
        }
    });


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
  // document.getElementById('alert-place').innerHTML = '<div class="alert alert-dismissible alert-warning fade in"> <button type="button" class="close" data-dismiss="alert">&times;</button> <strong>Well done!</strong> Player ' + player +' Wins! <a href="#" class="alert-link" onclick="resetBoard()">Reset?</a>'
  console.log( "winner winner");
//' <strong>Well done!</strong> Player ' + player +' Wins! <a href="#" class="alert-link" onclick="resetBoard()">Reset?</a>'
  var alertHolder = $("<div>");
  alertHolder.attr("class", "alert lert-dismissible alert-warning");
  alertHolder.text("<strong> Well done! </strong> Player " + player + " Wins!");
  var alertButton = $("<button>");
  alertButton.attr("class", "close");
  alertButton.attr("type","button");
  alertButton.attr("data-dismiss","alert");
  alertHolder.append(alertButton);

  var alertReset = $("<a>");
  alertReset.attr("class", "alert-link");
  alertReset.attr("onclick","resetBoard()");
  alertReset.text("Reset?");
  alertHolder.append(alertReset);


}

function resetBoard() {
  turn = 2;
  gameBoard = [0,1,2,3,4,5,6,7,8,9];
  emptySpot = true;

    for (var i = 0; i < allSpots.length; i++){
      document.getElementById(allSpots[i]).innerHTML = "";
    }
    
    document.getElementById('alert-place').innerHTML = "";
}