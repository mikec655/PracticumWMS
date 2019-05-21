import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../score.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-five',
  templateUrl: './top-five.component.html',
  styleUrls: ['./top-five.component.css'],
  providers: [ScoreService]
})
export class TopFiveComponent implements OnInit {

  topScores:Array<topScore> = [
    {name:"Barack ", time:200},
    {name:"Bernie Sanders", time:300},
    {name:"Hillary Clinton", time:400},
    {name:"Jeb Bush", time:500},
    {name:"Donald Trump", time:600}
  ]

  constructor(private scoreService:ScoreService) {
    // this.updateScore = scoreService.changeScore.subscribe((input) => { 
    //                        this.addscore(input, 0);
    //                      });
   this.updateTopScore = scoreService.changeTopScore.subscribe((input) => { 
                          this.addscore(input.name, input.time);
                        });
  }

  updateScore:Subscription;

  updateTopScore:Subscription;

 // voor test deze komt van de twee toegevoegde input fields, dit zou vanuit een andere klasse moeten.
  onScoreChange(e:Event) {
    var inpp:string = (<HTMLInputElement>e.target).value;
    var num:number = +inpp;
    console.log("onscoreChange: "+ inpp); 
    this.scoreService.topScorechanged("mark", num);
  }

  ngOnInit() {
  }

 addscore(inputname:string, inputtime:number){

     console.log("addscore aangroepen: " + inputname + " + " + inputtime);
      const newscore : topScore ={name: inputname, time: inputtime}
      this.topScores.push(newscore)
  }
}

export interface topScore {
  name:string
  time:number
}

// export function addscore(inputname,inputtime){
//       const newscore : topScore ={name: inputname, time: inputtime}
//       this.topScores.push(newscore)
// }