class Piece {
  constructor(piece, x, y) {
    this.piece = piece[0];
    this.color = piece[1];
    this.pos = {x: x, y: y};
    this.variant = 0;
  }

  move(x, y) {
    let newX = this.pos.x + x;
    let newY = this.pos.y + y;

    if (!this.collision(newX, newY, this.variant)) {
      this.pos.x = newX;
      this.pos.y = newY;
    } else {
      this.draw();
      game.removeFilledRows();
    }
  }

  rotate(variant) {
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
    this.clear();

    for (let i = 0; i < this.piece[newVariant].length; i++) {
      let y = this.piece[newVariant][i][0]+newY;
      let x = this.piece[newVariant][i][1]+newX;

      if (game.board[y][x] !== game.bg) {
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
