import { Component } from '@angular/core';
import { BoardModule } from './board/board.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'memory';
  size:number = 6;

  board:Array<string> = new Array<string>();
  
  constructor() {
    for (let i = 0; i < this.size; i++) {
      this.board[i] = "A";
    }
  }
}
