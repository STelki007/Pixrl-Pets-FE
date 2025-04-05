
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckWinner {

  checkWinner(board: string[], size: number): string | null {
    for (let i = 0; i < size; i++) {
      if (board[i * size] && board[i * size] === board[i * size + 1] && board[i * size + 1] === board[i * size + 2]) {
        return board[i * size];
      }
    }

    for (let i = 0; i < size; i++) {
      if (board[i] && board[i] === board[i + size] && board[i + size] === board[i + 2 * size]) {
        return board[i];
      }
    }

    if (board[0] && board[0] === board[size + 1] && board[size + 1] === board[2 * size + 2]) {
      return board[0];
    }

    let antiDiagonalWin = true;
    for (let i = 0; i < size; i++) {
      if (board[size - 1] === "" || board[(i + 1) * (size - 1)] !== board[size - 1]) {
        antiDiagonalWin = false;
        break;
      }
    }
    if (antiDiagonalWin) {
      return board[size - 1];
    }

    return null;
  }
}
