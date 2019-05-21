import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BoardService } from 'src/app/board.service';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.css']
})
export class GameSettingsComponent implements OnInit {

  @Output() charChange: EventEmitter<any> = new EventEmitter();

  constructor(private boardService:BoardService) { }

  ngOnInit() { }

  onSizeChange(e:any) {
    this.boardService.setSize(e.target.value);
  }

  onCharacterChange(e:any) {
    this.boardService.setCharacter(e.target.value);
  }

}
