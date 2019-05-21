import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeBarComponent } from './time-bar/time-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [TimeBarComponent, TopBarComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    TopBarComponent,
    TimeBarComponent,
  ]
})
export class TopBarModule { }
