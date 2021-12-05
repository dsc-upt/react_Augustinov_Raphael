function Square(props) {
  return /*#__PURE__*/(
    React.createElement("button", {
      className: "square " + (props.isWinning ? "winner" : null),
      onClick: props.onClick },

    props.value));


}

class Board extends React.Component {
  renderSquare(i) {
    return /*#__PURE__*/(
      React.createElement(Square, {
        isWinning: this.props.winningSquares.includes(i),
        key: "square " + i,
        value: this.props.squares[i],
        onClick: () => this.props.onClick(i) }));


  }

  renderSquares(n) {
    let squares = [];
    for (let i = n; i < n + 3; i++) {
      squares.push(this.renderSquare(i));
    }
    return squares;
  }

  renderRows(i) {
    return /*#__PURE__*/React.createElement("div", { className: "board-row" }, this.renderSquares(i));
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null,
      this.renderRows(0),
      this.renderRows(3),
      this.renderRows(6)));


  }}


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
      {
        squares: Array(9).fill(null) }],


      stepNumber: 0,
      xIsNext: true,
      isDescending: true };

  }

  handleClick(i) {
    const locations = [
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3]];

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
      {
        squares: squares,
        location: locations[i] }]),


      stepNumber: history.length,
      xIsNext: !this.state.xIsNext });

  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0 });

  }

  sortHistory() {
    this.setState({
      isDescending: !this.state.isDescending });

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const bold = move === this.state.stepNumber;
      const desc = move ?
      "Go to move nr." + move + " [" + history[move].location + "]" :
      "Go to game start";
      const boldDesc = bold ? /*#__PURE__*/React.createElement("b", null, desc) : desc;
      return /*#__PURE__*/(
        React.createElement("li", { value: move + 1, key: move }, /*#__PURE__*/
        React.createElement("button", { onClick: () => this.jumpTo(move) }, boldDesc)));


    });
    let draw = true;
    for (var k = 0; k < current.squares.length; k++) {
      if (current.squares[k] === null || winner) {
        draw = false;
      }
    }

    let status;
    if (winner) status = "Winner: " + winner.player;else
    if (draw) status = "Draw";else
    status = "Next player: " + (this.state.xIsNext ? "X" : "O");

    return /*#__PURE__*/(
      React.createElement("div", { className: "game" }, /*#__PURE__*/
      React.createElement("div", { className: "game-board" }, /*#__PURE__*/
      React.createElement(Board, {
        winningSquares: winner ? winner.line : [],
        squares: current.squares,
        onClick: i => this.handleClick(i) })), /*#__PURE__*/


      React.createElement("div", { className: "game-info" }, /*#__PURE__*/
      React.createElement("div", null, status), /*#__PURE__*/
      React.createElement("ol", null, this.state.isDescending ? moves : moves.reverse()), /*#__PURE__*/
      React.createElement("button", { onClick: () => this.sortHistory() }, "Sort by: ",
      this.state.isDescending ? "Descending" : "Asending"))));




  }}


// ========================================

ReactDOM.render( /*#__PURE__*/React.createElement(Game, null), document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}