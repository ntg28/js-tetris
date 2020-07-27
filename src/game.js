function Game() {
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  const scoreElement = document.querySelector('#score')
  const row = 23, col = 10, sq = 30, bg = '#111111';
  const board = [...Array(row)].map(i => Array(col).fill(bg));

  let curPiece;
  let score = 0;

  function init() {
    newPiece();
    update();
    setInterval(pieceFall, 400);
  }

  function drawBoard() {
    for (let y = 3; y < row; y++) {
      for (let x = 0; x < col; x++) {
        let curColor = board[y][x];
        drawSquare(x, y - 3, curColor);
      }
    }
  }

  function clearBoard() {
    for (let y = 0; y < row; y++) {
      board[y].fill(bg);
    }
  }

  function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * sq, y * sq, sq, sq);
    if (color === bg) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.strokeRect(x * sq, y * sq, sq, sq);
    } else {
      ctx.strokeStyle = '#cccccc';
      ctx.strokeRect(x * sq, y * sq, sq, sq);
    }
  }

  function newPiece() {
    let rn = Math.floor(Math.random() * 7);
    curPiece = new Piece(pieces[rn], 3, 1);
    update();
  }

  function pieceFall() {
    curPiece.move(0, 1);
    update();
  }

  function removeFilledRows() {
    let rowsFilled = 0;

    for (let y = 3; y < row; y++) {
      if (board[y].every(i => i !== bg)) {
        for (let j = y; j > 0; j--) {
          board[j] = [...board[j - 1]];
        }

        rowsFilled += 1;
      }
    }

    updateScore(rowsFilled);

    drawBoard();
  }

  function updateScore(points) {
    switch (points) {
      case 4:
        score += 16;
        break;
      case 3:
        score += 9;
        break;
      case 2:
        score += 4;
        break;
      case 1:
        score += 1;
        break;
      case -1:
        score = 0;
        break;
    }

    scoreElement.innerHTML = score;
  }

  function pieceDown() {
    for (let y = 0; y < row; y++) {
      if (curPiece.move(0, 1)) {
        break;
      }
    }
  }

  function update() {
    curPiece.draw();
    drawBoard();
  }

  document.addEventListener('keypress', (event) => {
    switch (event.key) {
      case 'a':
        curPiece.move(-1, 0);
        break;
      case 's':
        curPiece.move(0, 1);
        break;
      case 'd':
        curPiece.move(1, 0);
        break;
      case 'i':
        curPiece.rotate(-1);
        break;
      case 'o':
        curPiece.rotate(1);
        break;
      case 'p':
        curPiece = newPiece();
        break;
      case ' ':
        pieceDown();
        break;
    }

    update();
  });

  return {
    bg,
    init,
    board,
    newPiece,
    clearBoard,
    updateScore,
    removeFilledRows,
  }
}

const game = Game();
game.init();
