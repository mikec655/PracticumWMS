import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ScoreService } from './score.service';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private startTijd:number
  private totaalTijd:number
  private aantalTijden:number
  private isTimeStopped:boolean

  private verlopenTijd:number
  private verschilGemiddeldeTijd:string

  verlopenTijdChange:Subject<number> = new Subject<number>();
  verschilGemiddeldeTijdChange:Subject<string> = new Subject<string>()
  timeBarToggle:Subject<number> = new Subject<number>();

  constructor(private scoreService:ScoreService) {
    this.totaalTijd = 0;
    this.aantalTijden = 0;
    this.reset()
  }

  reset() {
    this.startTijd = -1;
    // this.totaalTijd = 0;
    // this.aantalTijden = 0;
    this.isTimeStopped = false;
  }

  getSeconds() {
    let date = new Date();
    let millis = date.getTime();
    return Math.round(millis / 1000);
  }

  stopTime() {
    this.isTimeStopped = true;
  }

  startTurnTime() {
    this.timeBarToggle.next(2000);
  }

  setTijden(){
    // bereken de verlopen tijd, de gemiddlede tijd en het verschil tussen 
    // de huidige speeltijd en de gemiddelde tijd en vul de elementen in de HTML.
    // Vul ook het aantal gevonden kaarten
    
    this.verlopenTijd = (this.startTijd < 0) ? 0 : this.getSeconds() - this.startTijd;

    let gemiddeldeTijd = (this.aantalTijden === 0) ? 0 : Math.round(this.totaalTijd / this.aantalTijden);
    let verschilGemiddeldeTijd = (this.startTijd < 0) ? 0 : (this.getSeconds() - this.startTijd) - gemiddeldeTijd;
    let sign = (verschilGemiddeldeTijd >= 0) ? "+" : "";
    this.verschilGemiddeldeTijd = gemiddeldeTijd + "s (" + sign + verschilGemiddeldeTijd + "s)";

    this.verlopenTijdChange.next(this.verlopenTijd);
    this.verschilGemiddeldeTijdChange.next(this.verschilGemiddeldeTijd);
  }

  checkStarttijd(){
    // Controleer of de startijd van het spel gezet is, i.e. het spel al gestart was.
    // Als dat niet zo is doe dat nu, en start de timeOut voor het bijhouden van de tijd.
    if (this.startTijd < 0) {
      this.startTijd = this.getSeconds();
      this.tijdBijhouden();
    }
  }

  tijdBijhouden = () => {
    if (!this.isTimeStopped) {
      this.setTijden();
      setTimeout(this.tijdBijhouden, 500);
    } else {
      this.totaalTijd += this.verlopenTijd;
      this.aantalTijden++;

      let name = prompt("Please enter your name", "");
      this.scoreService.addScore(name, this.verlopenTijd)
    }
  }
}
