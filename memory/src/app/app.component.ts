import { Component, Input } from '@angular/core';
import { BoardModule } from './board/board.module';
import { BoardService, CardData } from './board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  char:string = "*";
  board:CardData[][];
  
  constructor(private boardService:BoardService) {
    this.board = boardService.getBoard();
  }

  updateChar(char:string) {
    console.log("CHAR");
    this.char = char;
  }

  
}
