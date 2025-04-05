import { Component } from '@angular/core';
import {CheckWinner} from '@components/games/tic-tac-toe/CheckWinner';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [
    NgForOf
  ],
  templateUrl: './tic-tac-toe.component.html',
  standalone: true,
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent {
  title = 'TicTacToc';
  X = "X"
  O = "O"
  turn = this.X
  winnerMassage = ""
  boardSize = 3;
  board: string[] = new Array(this.boardSize * this.boardSize).fill('');
  gameOver = false;
  gameModus = "player"
  isDraw = false;
  scoreX = 0;
  scoreO = 0;
  timeToResetTheGame = 3

  constructor(private checkWinnerService: CheckWinner) {}

  onCellClick(index: number) {
    if (!this.board[index] && !this.gameOver && !this.isDraw) {
      this.vsPlayer(index);
      this.checkDraw();
      this.checkAndUpdateWinner();

      if (!this.gameOver && !this.isDraw && this.gameModus === "easy") {
        setTimeout(() => {
          this.vsBotEasy();
          this.checkDraw();
          this.checkAndUpdateWinner();
        }, 500);
      }

      if (!this.gameOver && !this.isDraw && this.gameModus === "hard") {
        setTimeout(() => {
          this.vsBotHard();
          this.checkDraw();
          this.checkAndUpdateWinner();
        }, 500);
      }
    }
  }

  vsPlayer (index: number) {
    if (this.turn == this.X){
      this.board[index] = this.turn;
      this.turn = this.O;
    }else{
      this.board[index] = this.turn;
      this.turn = this.X
    }
  }

  vsBotEasy() {
    let index: number;
    do {
      index = Math.floor(Math.random() * this.board.length);
    } while (this.board[index] !== '');

    this.board[index] = this.O;
    this.turn = this.X;
  }

  resetTheGame(){
    this.board = new Array(this.boardSize * this.boardSize).fill('');
    this.turn = this.X;
    this.winnerMassage = ""
    this.isDraw = false;
    this.gameOver = false;
    this.timeToResetTheGame = 3;
  }

  onResetTheGameClick() {
    this.resetTheGame()
  }

  checkDraw() {
    if (this.board.every(cell => cell !== '')) {
      this.isDraw = true;
      this.winnerMassage = "unentschieden!"
      return true;
    }
    return false;
  }

  checkAndUpdateWinner() {
    const winner = this.checkWinnerService.checkWinner(this.board, this.boardSize);

    if (winner) {
      if (winner == "X"){
        this.scoreX++;
      }else{
        this.scoreO++;
      }

      this.winnerMassage = `${winner} hat gewonnen!`;
      this.gameOver = true;
    }
  }

  playWithPlayer(player: string) {
    this.resetTheGame()
    this.gameModus = player
    this.setScoresZero()
  }

  botEasyModus(easy: string) {
    this.resetTheGame()
    this.gameModus = easy;
    this.setScoresZero()
  }

  botHardModus(hard: string) {
    this.resetTheGame()
    this.gameModus = hard;
    this.setScoresZero()
  }

  vsBotHard() {
    let bestMove = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] === '') {
        this.board[i] = this.O;
        let score = this.minimax(this.board, 0, false);
        this.board[i] = '';

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;

        }
      }
    }

    if (bestMove !== -1) {
      this.board[bestMove] = this.O;
      this.turn = this.X;
    }
  }

  minimax(board: string[], depth: number, isMaximizing: boolean): number {
    const winner = this.checkWinnerService.checkWinner(board, this.boardSize);

    if (winner === this.O) return 10 - depth;
    if (winner === this.X) return depth - 10;
    if (!board.includes('')) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = this.O;
          let score = this.minimax(board, depth + 1, false);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = this.X;
          let score = this.minimax(board, depth + 1, true);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  resetScore() {
    this.setScoresZero()
  }

  setScoresZero(){
    this.scoreO = 0;
    this.scoreX = 0;
  }
}
