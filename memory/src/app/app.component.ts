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
    this.board = this.getNewBoard();
  }

  updateChar(char:string) {
    console.log("CHAR");
    this.char = char;
  }

  getNewBoard() : string[][] {
    let letterArray = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ".substring(0, this.size*this.size).split('');
    letterArray = this.shuffle(letterArray);

    let newBoard = [];
    for (let i = 0; i < this.size; i++) {
      newBoard[i] = [];
      for (let j = 0; j < this.size; j++) {
        newBoard[i][j] = letterArray[i + j * this.size];
      }
    }
    return newBoard
  } 

  shuffle(array: Array<string>) : Array<string>{
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
