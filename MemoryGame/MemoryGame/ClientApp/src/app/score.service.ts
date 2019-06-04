import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { TopScore } from './side-bar/top-five/top-five.component';

@Injectable({
  providedIn: 'root',
})

export class ScoreService {

  changeTopScore:Subject<TopScore> = new Subject<TopScore>();

  topScores:Array<TopScore> = [
    {name:"Barack ", time:200},
    {name:"Bernie Sanders", time:300},
    {name:"Hillary Clinton", time:400},
    {name:"Jeb Bush", time:500},
    {name:"Donald Trump", time:600}
  ]

  constructor(private http: HttpClient) {
  }

  getTopScores(): Array<TopScore> {
    console.log(this.http.get("http://localhost:5304/myscores/1"));
    return this.topScores;
  }

    addScore(inputname:string, inputtime:number){
        console.log("addscore aangroepen: " + inputname + " + " + inputtime);
        var id = localStorage.getItem("id_token");
        this.http.post<TopScore>('MyScores', { id, inputtime });
        const newScore : TopScore = {name: inputname, time: inputtime};
        this.topScores.push(newScore);
        this.topScores.sort((a, b) => a.time - b.time);
        this.topScores.pop();
        console.log(this.topScores);
    }
}
