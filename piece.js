class Piece {
  constructor(piece, x, y) {
    this.piece = piece[0];
    this.color = piece[1];
    this.pos = {x: x, y: y};
    this.variant = 0;
  }

  move(x, y) {
    if (!this.movimentCollision(x, y)) {
      this.pos.x += x;
      this.pos.y += y;
    } else {
      this.draw();
      game.removeFilledRows();
    }
  }

  rotate(variant) {
    if (this.variant + variant === 4) {
      variant = 0;
    } else if (this.variant + variant === -1) {
      variant = 3;
    } else {
      variant = this.variant + variant;
    }

    if (!this.rotateCollision(variant)) {
      this.variant = variant;
    }
  }

  movimentCollision(newX, newY) {
    this.clear();

    for (let i = 0; i < this.piece[this.variant].length; i ++) {
      let y = this.piece[this.variant][i][0]+this.pos.y+newY;
      let x = this.piece[this.variant][i][1]+this.pos.x+newX;

      if (y === 20 || game.board[y][x] !== game.bg) {
        if (newX === 0) {
          curPiece = newPiece();
        }

        return true;
      }
    }

    return false;
  }

  rotateCollision(variant) {
    this.clear();

    for (let i = 0; i < this.piece[this.variant].length; i++) {
      let y = this.piece[variant][i][0]+this.pos.y;
      let x = this.piece[variant][i][1]+this.pos.x;

      if (y === 20 || game.board[y][x] !== game.bg) {
        return true;
      }

    }

    return false;
  }

  draw() {
    for (let i = 0; i < this.piece[this.variant].length; i++) {
      let y = this.piece[this.variant][i][0]+this.pos.y;
      let x = this.piece[this.variant][i][1]+this.pos.x;

      game.board[y][x] = this.color;
    }
  }

  clear() {
    for (let i = 0; i < this.piece[this.variant].length; i++) {
      let y = this.piece[this.variant][i][0]+this.pos.y;
      let x = this.piece[this.variant][i][1]+this.pos.x;

      game.board[y][x] = game.bg;
    }
  }
}
