const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

const HUMAN = "X";
const AI = "O";
let board, gameOver;

function resetGame() {
    board = Array(9).fill(null);
    gameOver = false;
    statusEl.textContent = "Your move.";
    render();
}

function render() {
    boardEl.innerHTML = "";
    board.forEach((val, i) => {
          const cell = document.createElement("div");
          cell.className = "cell";
          cell.textContent = val || "";
          cell.addEventListener("click", () => handleMove(i));
          boardEl.appendChild(cell);
    });
}

function handleMove(i) {
    if (gameOver || board[i]) return;

  board[i] = HUMAN;
    render();

  const winner = checkWinner(board);
    if (winner) return endGame(winner);
    if (isBoardFull(board)) return endGame("tie");

  statusEl.textContent = "AI is thinking...";
    setTimeout(() => {
          const move = bestMove(board);
          board[move] = AI;
          render();

                   const winner2 = checkWinner(board);
          if (winner2) return endGame(winner2);
          if (isBoardFull(board)) return endGame("tie");

                   statusEl.textContent = "Your move.";
    }, 300);
}

function endGame(result) {
    gameOver = true;
    if (result === "tie") {
          statusEl.textContent = "It's a tie.";
    } else {
          statusEl.textContent = result === HUMAN ? "You win! (that shouldn't happen)" : "AI wins.";
    }
}

function isBoardFull(b) {
    return b.every(cell => cell !== null);
}

const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

function checkWinner(b) {
    for (const [a, c, d] of lines) {
          if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
    }
    return null;
}

// Minimax: the AI explores every possible outcome and picks the move
// that guarantees the best result assuming the opponent also plays optimally.
function minimax(b, depth, isMaximizing) {
    const winner = checkWinner(b);
    if (winner === AI) return 10 - depth;
    if (winner === HUMAN) return depth - 10;
    if (isBoardFull(b)) return 0;

  if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
                if (!b[i]) {
                          b[i] = AI;
                          best = Math.max(best, minimax(b, depth + 1, false));
                          b[i] = null;
                }
        }
        return best;
  } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
                if (!b[i]) {
                          b[i] = HUMAN;
                          best = Math.min(best, minimax(b, depth + 1, true));
                          b[i] = null;
                }
        }
        return best;
  }
}

function bestMove(b) {
    let bestScore = -Infinity;
    let move = null;

  for (let i = 0; i < 9; i++) {
        if (!b[i]) {
                b[i] = AI;
                const score = minimax(b, 0, false);
                b[i] = null;
                if (score > bestScore) {
                          bestScore = score;
                          move = i;
                }
        }
  }

  return move;
}

restartBtn.addEventListener("click", resetGame);
resetGame();
