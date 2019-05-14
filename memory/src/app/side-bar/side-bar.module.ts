import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopFiveComponent } from './top-five/top-five.component';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { ColorSettingsComponent } from './color-settings/color-settings.component';
import { NewGameComponent } from './new-game/new-game.component';

@NgModule({
  declarations: [
    TopFiveComponent, 
    GameSettingsComponent, 
    ColorSettingsComponent, 
    NewGameComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopFiveComponent,
    GameSettingsComponent,
    ColorSettingsComponent,
    NewGameComponent
  ]
})
export class SideBarModule { }
