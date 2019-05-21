import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private size:number = 6
  private character = "*";
  private board:CardData[][]

  private foundPairs:number
  private firstCard:CardData
  private secondCard:CardData
  private emptyCard:CardData = {
    index: -1,
    character: "",
    state: ""
  }

  boardChange:Subject<CardData[][]> = new Subject<CardData[][]>()
  foundPairsChange:Subject<number> = new Subject<number>()
  characterChange:Subject<string> = new Subject<string>()

  constructor(private timeService:TimeService) {
    this.reset();
  }

  reset() {
    this.board = this.createNewBoard();
    this.boardChange.next(this.board);
    this.foundPairs = 0;
    this.foundPairsChange.next(this.foundPairs)
    this.emptyCard = {
      index: -1,
      character: "",
      state: ""
    }
    this.firstCard = this.emptyCard;
    this.secondCard = this.emptyCard;
  }

  getFoundPairs() : number {
    return this.foundPairs;
  }

  getBoard(): CardData[][] {
    return this.board;
  }

  setSize(size:number) {
    this.size = size;
  } 

  getCharacter() {
    return this.character;
  }

  setCharacter(character:string) {
    this.character = character;
    this.characterChange.next(this.character);
  }

  isGameEnded() : boolean {
    return this.foundPairs == this.size * this.size / 2;
  }

  cardClicked(card:CardData) {
    this.timeService.checkStarttijd();
    this.checkDerdeKaart();
    let draaiKaartOm = this.turnCard(card);
    if (draaiKaartOm == 2){
      this.timeService.startTurnTime();
      this.checkKaarten();
    }

    this.boardChange.next(this.board);
    this.foundPairsChange.next(this.foundPairs);

    if (this.isGameEnded()) {
      this.timeService.stopTime();
    }

    console.log(this.board);
  }

  turnCard(card:CardData) : number{
    // Draai de kaart om. Dit kan alleen als de kaart nog niet geopend of gevonden is.
    // Geef ook aan hoeveel kaarten er nu zijn omgedraaid en return dit zodat in de 
    // cardClicked functie de checkKaarten functie kan worden aangeroepen als dat nodig is.
  
    if (this.firstCard.index == card.index) {
      return 1;
    } else if (this.firstCard.index == -1) {
      this.firstCard = card;
      this.toggleCard(card);
      return 1;
    } else if (this.secondCard.index == -1) {
      this.secondCard = card;
      this.toggleCard(card);
      return 2;
    }
    
    return 0;
  }

  checkDerdeKaart(){
    // Controleer of het de derde kaart is die wordt aangeklikt.
    // Als dit zo is kunnen de geopende kaarten gedeactiveerd (gesloten) worden.
    if (this.firstCard.index != -1 && this.secondCard.index != -1) {
      this.deactivateCards();
    }
  }
  
  deactivateCards = () => {
    // Functie om de twee omgedraaide kaarten weer terug te draaien
    this.firstCard.state = "inactive";
    this.firstCard = this.emptyCard;
    this.secondCard.state = "inactive";
    this.secondCard = this.emptyCard;
    //$("#timeLeft").animate({width: "185px"}, 0);
  }
  
  toggleCard(card:CardData) {
    // Draai de kaart om, als de letter getoond wordt, toon dan de achterkant en 
    // vice versa. switch dus van active naar inactive of omgekeerd.
    let x = card.index / this.size;
    let y = card.index % this.size;
    if (card.state == "active") {
      card.state = "inactive"
    } else if (card.state == "inactive") { 
      card.state = "active"
    };
  }
  
  checkKaarten(){
    // Kijk of de beide kaarten gelijk zijn. Als dit zo is moet het aantal gevonden paren 
    // opgehord worden, het aantal resterende kaarten kleiner worden en ervoor  
    // gezorgd worden dat er niet meer op de kaarten geklikt kan worden. De kaarten
    // zijn nu found.
    // Als de kaarten niet gelijk zijn moet de timer gaan lopen van de toontijd, en 
    // de timeleft geanimeerd worden zodat deze laat zien hoeveel tijd er nog is.
    let firstCardLetter = this.firstCard.character;
    let secondCardLetter = this.secondCard.character;
  
    if (firstCardLetter == secondCardLetter) {
      this.firstCard.state = "found";
      this.secondCard.state = "found";
      this.firstCard = this.emptyCard;
      this.secondCard = this.emptyCard;
      this.foundPairs += 1;
    } else {
      setTimeout(this.deactivateCards, 2000);
      //$("#timeLeft").animate({width: "0px"}, intervalID);
    }
  
  }

  createNewBoard() : CardData[][] {
    let letterArray = "AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRSSTTUUVVWWXXYYZZ".substring(0, this.size*this.size).split('');
    letterArray = this.shuffle(letterArray);

    let newBoard = [];
    for (let i = 0; i < this.size; i++) {
      newBoard[i] = [];
      for (let j = 0; j < this.size; j++) {
        let index = i + j * this.size
        newBoard[i][j] = {
          index: index,
          character: letterArray[index],
          state: "inactive"
        }
      }
    }
    return newBoard
  } 

  shuffle(array: Array<string>) : Array<string>{
    let currentIndex:number = array.length, temporaryValue:string, randomIndex:number;
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

export interface CardData {
  index:number
  character:string
  state:string
}
