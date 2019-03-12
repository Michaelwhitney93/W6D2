class View {
  constructor(game, $el) {
    this.game = game;
    this.el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    // const that = this;
      $('ul').on('click', 'li', (e) => this.makeMove(e.currentTarget));
  }

  makeMove($square) {
    let $li = $($square);
    let mark = this.game.currentPlayer;
    this.game.playMove($li.data("pos"));
    $li.addClass(`${mark}`);
    $li.text(`${mark}`);
    if (this.game.winner()) {
      $('body').append(`<h2>You Win ${this.game.winner().toUpperCase()}!</h2>`);
      const $li = $(`li`);
      const $li_winners = $(`li.${mark}`);
      $li.toggleClass(`${mark} game-over`);
      $li_winners.toggleClass(`game-over winner`);
      // debugger
      $('ul').off('click', 'li');
      return;
    }
    if (this.game.isOver()) {
      $('body').append(`<h2>No one wins!</h2>`);
    }

  }

  setupBoard() {
    this.el.append("<ul>");
    let x = 0;
    let y = 0;
    for (let i=0; i < 9; i++) {
      let $li = $('<li>');
      $li.data("pos", [x,y]);
      $("ul").append($li);
      y++;
      if (y === 3) {
        y = 0;
        x++;
      }
    }
  }
}

module.exports = View;
