function Game() {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const row = 20, col = 10, sq = 30;
  const bg = '#111111';
  const board = [...Array(20)].map(i => Array(10).fill(bg));

  function drawBoard() {
    for (let y = 0; y < row; y++) {
      for (let x = 0; x < col; x++) {
        let currentColor = board[y][x];
        drawSquare(x, y, currentColor);
      }
    }
  }

  function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * sq, y * sq, sq, sq);
    if (color == bg) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.strokeRect(x * sq, y * sq, sq, sq);
    }
  }

  function removeRows() {
    let row;

    for (let i = 0; i < board.length; i++) {
      if(board[i].every((e) => e !== bg)) {
        row = i;
      }

      if (row) {
        console.log(`${row}: is complete`);
        board[row].fill(bg);
      }
    }
  }

  return {
    bg,
    row, col, sq,
    board,
    drawBoard,
    drawSquare,
    removeRows,
  };
}

// Pieces

class Piece {
  constructor(piece, variant, x, y) {
    this.piece = piece[0];
    this.variant = variant;
    this.x = x;
    this.y = y;
    this.color = piece[1];
  }

  move(direction) {
    this.clear();
    if (direction === 'left') {
      let newX = this.x - 1;
      if (!this.collision(newX, this.y)) {
        this.x = newX;
      }
    } else if (direction === 'right') {
      let newX = this.x + 1;
      if (!this.collision(newX, this.y)) {
        this.x = newX;
      } 
    } else if (direction === 'down') {
      let newY = this.y + 1;
      if (!this.collision(this.x, newY)) {
        this.y = newY;
      }
    }
    this.draw();
  }

  draw() {
    for (let i in this.piece[this.variant]) {
      game.board[this.piece[this.variant][i][0]+this.y][this.piece[this.variant][i][1]+this.x] = this.color;
    }

    game.drawBoard();
  }

  clear() {
    for (let i in this.piece[this.variant]) {
      game.board[this.piece[this.variant][i][0]+this.y][this.piece[this.variant][i][1]+this.x] = game.bg;
    }

    game.drawBoard();
  }

  rotate(side) {
    if (side === 'right') {
      this.clear();
    if (!this.collision(this.x, this.y, this.variant+1, 'rotation')) {
      this.variant += 1;
      if (this.variant === 4) {
        this.variant = 0;
      }
    }
    this.draw();
    } else if (side === 'left') {
      this.clear();
      if (!this.collision(this.x, this.y, this.variant+1, 'rotation')) {
        this.variant -= 1;
        if (this.variant === -1) {
          this.variant = 3;
        }
      }
    this.draw();
    }
  }

  collision(newX, newY, newVariant=0, type='moviment') {
    let square;

    if (type === 'moviment') {
      for (let i in this.piece[this.variant]) {
        if (newX != this.x) {
          // if moviment is left or right
          square = game.board[this.piece[this.variant][i][0]+this.y][this.piece[this.variant][i][1]+newX];
        } else if (newY != this.y) {
        // if moviment is down
          try {
            square = game.board[this.piece[this.variant][i][0]+newY][this.piece[this.variant][i][1]+this.x];
          } catch (erro) {
            this.clear();
            this.draw();
            newPiece();
            game.removeRows();
            return true;
          }
        }

        if (this.piece[this.variant][i][0] === 10) {
          return true;
        }

        if (square != game.bg) {
          if (newY != this.y) {
            this.clear();
            this.draw();
            newPiece();
            game.removeRows();
          }

          return true;
        }
      }
    } else if (type === 'rotation') {
      // rotation
      if (newVariant === 4) {
        newVariant = 0;
      } else if (newVariant === -1) {
        newVariant = 3;
      }

      for (let i in this.piece[this.variant]) {
        square = game.board[this.piece[newVariant][i][0]+newY][this.piece[newVariant][i][1]+this.x]

        if (square != game.bg) {
          return true;
        }
      }
    }

    return false;
  }
}

function newPiece() {
let n0 = Math.floor(Math.random() * 7);
currentPiece = new Piece(pieces[n0], 0, 4, 0);
currentPiece.draw();
}

// Logical

const game = Game();
var currentPiece;

newPiece();

game.drawBoard();

document.addEventListener('keypress', (event) => {
  if (event.key === 'a') {
    currentPiece.move('left');
  } else if (event.key === 's') {
    currentPiece.move('down');
  } else if (event.key === 'd') {
    currentPiece.move('right');
  } else if (event.key === 'o') {
    currentPiece.rotate('right');
  } else if (event.key === 'i') {
    currentPiece.rotate('left');
  } else if (event.key === 'p') {
    newPiece();
  }
});

