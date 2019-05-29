import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BoardService } from 'src/app/board.service';
import { TimeService } from 'src/app/time.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent implements OnInit {

  @Output() charChange: EventEmitter<any> = new EventEmitter();

  verschilGemiddeldeTijd:string = "0s (+0s)"
  verschilGemiddeldeTijdSubscription:Subscription

  constructor(
    private boardService:BoardService,
    private timeService:TimeService) { 

      this.verschilGemiddeldeTijdSubscription = timeService.verschilGemiddeldeTijdChange.subscribe(
        text => this.verschilGemiddeldeTijd = text
      ) 
    }

  ngOnInit() { }

  onSizeChange(e:any) {
    this.boardService.setSize(e.target.value);
  }

  onCharacterChange(e:any) {
    this.boardService.setCharacter(e.target.value);
  }

}
