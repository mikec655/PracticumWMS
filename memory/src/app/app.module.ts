import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BoardModule } from './board/board.module';
import { SideBarModule } from './side-bar/side-bar.module';
import { TopBarModule } from './top-bar/top-bar.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BoardModule,
    SideBarModule,
    TopBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
