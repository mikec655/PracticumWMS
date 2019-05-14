import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-five',
  templateUrl: './top-five.component.html',
  styleUrls: ['./top-five.component.css']
})
export class TopFiveComponent implements OnInit {
  topScores:Array<topScore> = [
    {name:"Barack Obama", time:200},
    {name:"Bernie Sanders", time:300},
    {name:"Hillary Clinton", time:400},
    {name:"Jeb Bush", time:500},
    {name:"Donald Trump", time:600}
  ]

  constructor() {}

  ngOnInit() {
  }

}

interface topScore {
  name:string
  time:number
}
