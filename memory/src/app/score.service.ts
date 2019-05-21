import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { topScore } from './side-bar/top-five/top-five.component';

@Injectable({
  providedIn: 'root',
})


export class ScoreService {

  //changeScore:Subject<{}> = new Subject<{}>();
  //changeScore:Subject<string> = new Subject<string>();

  changeTopScore:Subject<topScore> = new Subject<topScore>();


  constructor() { 
  }

  // scorechanged(input:string){
  //   console.log("scoreservice scorechanged aangroepen: " + input);
  //   this.changeScore.next(input);
  // }


  topScorechanged(naam:string, score:number){
    console.log("scoreservice scorechanged aangroepen: " + naam + " "+ score);
    var newscore : topScore = {name:naam, time:score}
    this.changeTopScore.next(newscore);
  }
}
