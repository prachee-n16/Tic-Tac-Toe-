import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

// Virtual board
var board = ['', '', '', '', '', '', '', '', '']  

function App() {
  // Let true represent Player 1, false represent Player 2.
  const [currentPlayer, setCurrentPlayer] = useState(true)

  // Number of moves played by both players
  const [moves, setMoves] = useState(1);

  // Winning conditions
  const [isGameOver, setGameOver] = useState(false);
  const [playerAWon, setPlayerAWin] = useState(false);
  const [playerBWon, setPlayerBWin] = useState(false);
  
  function handleRestart() {
    setCurrentPlayer(true);
    setMoves(1);

    setGameOver(false);
    setPlayerAWin(false);
    setPlayerBWin(false);

    board = ['', '', '', '', '', '', '', '', '']  

    for (let index = 0; index < 9; index++) {
      document.getElementById("cell"+index).disabled = false;
      document.getElementById("cell"+index).style.backgroundColor = "white";
    }
  }

  function handlePlayerMove(e) {
    // Player has made a move
    setMoves(moves+1);

    // Find which button they clicked
    var cellID = e.target.id;

    // If Player 1
    if(currentPlayer) {
      // Add move to virtual board
      board[cellID.slice(-1)] = 1;
      // Let's set button to be red for player 1
      document.getElementById(cellID).style.backgroundColor = 'red';
      document.getElementById(cellID).disabled = true;
    }

    //If Player 2
    if(!currentPlayer) {
      // Add move to virtual board
      board[cellID.slice(-1)] = -1;
      // Let's set button to be green for player 2
      document.getElementById(cellID).style.backgroundColor = 'green';
      document.getElementById(cellID).disabled = true;
    }

    // No winning situation until at least 4 moves are made
    if (moves > 4) {
      
      // Use virtual board to see if either player has won.
      // We can do this by check if sum of any row, column or diagonal is +3/-3.
      
      // Sum of each row.
      var row1 = board[0] + board[1] + board[2];
      var row2 = board[3] + board[4] + board[5];
      var row3 = board[6] + board[7] + board[8];

      // Sum of each column
      var col1 = board[0] + board[3] + board[6];
      var col2 = board[1] + board[4] + board[7];
      var col3 = board[2] + board[5] + board[8];

      // Sum of both diagonals
      var d1 = board[0] + board[4] + board[8];
      var d2 = board[6] + board[4] + board[2];

      if ( (row1 === 3) || (row2 === 3) || (row3 === 3) || (col1 === 3) || (col2 === 3) || (col3 === 3) || (d1 === 3) || (d2 === 3)){
        // isGameOver = true;
        setGameOver(true);
        setPlayerAWin(true);
      } else if ( (row1 === -3) || (row2 === -3) || (row3 === -3) || (col1 === -3) || (col2 === -3) || (col3 === -3) || (d1 === -3) || (d2 === -3)){
        setGameOver(true);
        setPlayerBWin(true);
      }
    }

    // Game is over if 8 moves are done.
    if (moves === 9) {
      setGameOver(true);
    }

    // If game is over
    if (isGameOver === true) {
      // Disable all cells
      for (let index = 0; index < 9; index++) {
        document.getElementById("cell"+index).disabled = true;
      }
    }
    // Continue game
    else {
      //  Change current player to other player
     setCurrentPlayer(!currentPlayer);
    }

    
  }
  
  return (
    <div className="App">
      <h1 className='mt-5 text-light'>tic-tac-toe.</h1>

{/* Show which player is playing currently.
- Disabled: Not their turn
- Checked, their turn.
*/}
      <div class="player-status">

        {currentPlayer ? <input class="form-check-input red" type="radio" value="" id="player1"/>
        : <input class="form-check-input" type="radio" value="" id="player1" disabled/>}
        <label class="form-check-label mx-2 text-light" for="player1">
          Player 1
        </label>

        {!currentPlayer ? <input class="form-check-input green" type="radio" value="" id="player1"/>
        : <input class="form-check-input" type="radio" value="" id="player1" disabled/>}
        <label class="form-check-label mx-2 text-light" for="player2">
          Player 2
        </label>
      </div>

      {/* Create tic-tac-toe board */}
        <div className='container pt-5'>
          <div className='row flex-column mx-2'>
            <button className='cell' id='cell0' onClick={handlePlayerMove}></button>
            <button className='cell' id='cell1' onClick={handlePlayerMove}></button>
            <button className='cell' id='cell2' onClick={handlePlayerMove}></button>
          </div>
          <div className='row flex-column'>
            <button className='cell' id='cell3' onClick={handlePlayerMove}></button>
            <button className='cell' id='cell4' onClick={handlePlayerMove}></button>
            <button className='cell' id='cell5' onClick={handlePlayerMove}></button>
          </div>
          <div className='row flex-column mx-2'>
            <button className='cell' id='cell6' onClick={handlePlayerMove}></button>
            <button className='cell' id='cell7' onClick={handlePlayerMove}></button>
            <button className='cell' id='cell8' onClick={handlePlayerMove}></button>
          </div>
        </div>

        {/* Make it more explicit here on who is playing*/}
        <p className='lead pt-3 text-light'>
          {
            isGameOver ? (
              playerAWon ? 'Player A has won!' : (playerBWon ? 'Player B has won!' : "It's a Draw")
            )
            :  `Currently playing: ${currentPlayer ? "Player 1" : "Player 2"}`
          }
        </p>

        <form method="get" action="https://github.com/prachee-n16/Tic-Tac-Toe-">
          <button type="submit" class="btn btn-primary mx-3 mt-3">Code</button>
          <button type="button" class="btn btn-danger mx-3 mt-3" onClick={handleRestart}>Restart</button>
        </form>
        
        

    </div>
  );
}

export default App;