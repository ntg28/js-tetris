class Piece {
  constructor(piece, x, y) {
    this.piece = piece[0];
    this.color = piece[1];
    this.pos = {x: x, y: y};
    this.variant = 0;
  }

  move(x, y) {
    this.clear();

    let newX = this.pos.x + x;
    let newY = this.pos.y + y;

    if (!this.collision(newX, newY, this.variant)) {
      this.pos.x = newX;
      this.pos.y = newY;
    } else {
      return true;
    }
  }

  rotate(variant) {
    this.clear();

    let newVariant = this.variant + variant;

    if (newVariant === 4) {
      newVariant = 0;
    } else if (newVariant === -1) {
      newVariant = 3;
    }

    if (!this.collision(this.pos.x, this.pos.y, newVariant)) {
      this.variant = newVariant;
    }
  }

  collision(newX, newY, newVariant) {
    for (let i = 0; i < this.piece[newVariant].length; i++) {
      let y = this.piece[newVariant][i][0]+newY;
      let x = this.piece[newVariant][i][1]+newX;

      if (y === 23 || game.board[y][x] !== game.bg) {
        if (newY !== this.pos.y) {
          this.draw();
          game.removeFilledRows();
          game.newPiece();

          if (this.pos.y <= 3) {
            //console.log('lose');
            game.updateScore(-1);
            game.clearBoard();
          }
        }
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
