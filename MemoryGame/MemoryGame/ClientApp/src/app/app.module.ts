import { NgModule } from '@angular/core';
import { BoardModule } from './board/board.module';
import { SideBarModule } from './side-bar/side-bar.module';
import { TopBarModule } from './top-bar/top-bar.module';

import { AppComponent } from './app.component';
import { BoardService } from './board.service';
import { ColorService } from './color.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterModule } from './register/register.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RegisterModule,
    BoardModule,
    SideBarModule,
    TopBarModule,
    AppRoutingModule,
    LoginModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ColorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
