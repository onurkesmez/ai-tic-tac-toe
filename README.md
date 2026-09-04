# AI Tic Tac Toe

A Tic Tac Toe game where you play against an AI that never loses. Best case for you is a tie.

Play it here: https://onurkesmez.github.io/ai-tic-tac-toe/

#### How to play
Open index.html in a browser (or use the live link above). You are X, the AI is O. Click any empty square to make your move, then the AI responds.

#### How the AI works
The AI uses the minimax algorithm. Before every move, it simulates the entire rest of the game for each possible move, assuming both players always play their best possible move from that point on. It then picks the move that leads to the best guaranteed outcome for itself. Because Tic Tac Toe is a small, fully solvable game, this means the AI plays perfectly: it wins if you make a mistake, and ties otherwise.

#### Roadmap
• Add a difficulty setting that makes the AI occasionally play a random, suboptimal move
• Add a scoreboard across multiple rounds
• Highlight the winning line when the game ends

#### Tech
Plain HTML, CSS, and JavaScript. No dependencies, no build step.
