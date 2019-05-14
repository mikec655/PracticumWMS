import { Component, Input } from '@angular/core';
import { BoardModule } from './board/board.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  size:number = 6;
  char:string = "*";
  board:string[][];
  
  constructor() {
    this.updateChar(this.char);
  }

  updateChar(char:string) {
    this.char = char;
    this.board = [];
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = char;
      }
    }
  }
}
