import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../score.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-five',
  templateUrl: './top-five.component.html',
  styleUrls: ['./top-five.component.css'],
})
export class TopFiveComponent implements OnInit {

  topScores:TopScore[]
  updateTopScore:Subscription

  constructor(private scoreService:ScoreService) {
    this.topScores = scoreService.getTopScores();
    this.updateTopScore = scoreService.changeTopScore.subscribe((input) => { 
      this.topScores.push(input);
    });
  }

  ngOnInit() { }
 
}

export interface TopScore {
  name:string
  time:number
}
