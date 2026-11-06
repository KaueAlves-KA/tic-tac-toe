/* 
 * Made by KA.Dev
 * > A simple Tic Tac Toe game to demonstrate some knowledge of HTML, CSS, and JavaScript
 *
 * Copyright (c) 2026 KA.Dev
 * Licensed under the MIT License
 * https://github.com/KaueAlves-KA
*/

/* 
  ---------- We will declare the variables we need 
*/
let currentPlayer  = 'X'; // Starts with X
let isActive = true; // Check whether the game is still running or has already ended
let boardState = ['','','','','','','','','']; // Array with 9 empty slots

/* 
  ---------- Selecting HTML elements 
*/
const cells = document.querySelectorAll('.cell');
const turnStatus = document.getElementById('turn-status');
const restartButton = document.getElementById('restart-button');

/* 
  ---------- Function that handles clicks on cells 
*/
function handleClicks(event) {
  // Gets the index (0 to 8) of the cell that was clicked using the data-index attribute from the HTML
  const index = parseInt(event.target.getAttribute('data-index'));

  // First rule: If the cell already has text or the game is over, do nothing
  if(boardState[index] !== "" || !isActive) {
    return;
  }

  // Second rule: Update the state and the screen
  boardState[index] = currentPlayer; // Saves in the array
  event.target.innerText = currentPlayer; // Displays on the screen
  if(currentPlayer === 'X') {
    event.target.classList.add("red");
  } else {
    event.target.classList.add("blue");
  }

  // Third rule: Check if a player has won
  checkForVictory();
}

/* 
  ---------- Function to change the player 
*/
function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // If it's X, change it to O; If it's O change it to X
  turnStatus.innerText = `It's Player ${currentPlayer}'s turn now`;
}

/* 
  ---------- Function that checks for a win 
*/
function checkForVictory() {
  // All eight winning combinations (rows, columns, and diagonals)
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  let victory = false;

  // Loop through all winning combinations
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i]; // Get the three indexes of the current combination

    // Check if the three cells have the same value and are all filled
    if(boardState[a] && boardState [a] === boardState[b] && boardState[a] === boardState[c]) {
      victory = true;
      break; // If it finds a win, it stops the loop
    }
  }

  // If a win happens, show an alert and finish the game
  if(victory) {
    turnStatus.innerText = `Player ${currentPlayer} won! 🥳`;
    if(currentPlayer === 'X'){
      document.body.style = "background-color: #7a232d";
    } else {
      document.body.style = "background-color: #054489";
    }
    isActive = false;
    return;
  }

  // If there is no win and it's not a draw, change the player
  changePlayer();
}

/* 
  ---------- Function to restart the game 
*/
function restartGame() {
  document.body.style = "background-color: #2c2c2c";
  currentPlayer = 'X';
  isActive = true;
  for (let i = 0; i < boardState.length; i++){
    boardState[i] = '';
  }
  
  turnStatus.innerText = "It's Player X's turn now";

  // Go through all cells and clear their text
  cells.forEach(cel => {
    cel.innerText = "";
    cel.classList = "cell";
  });
}

/* 
  ---------- Adding event listeners 
*/
// For each cell, add a click event listener that calls the function handleClicks
cells.forEach(cel => {
  cel.addEventListener('click', handleClicks);
});

// Add the click event listener to the restart button
restartButton.addEventListener('click', restartGame);