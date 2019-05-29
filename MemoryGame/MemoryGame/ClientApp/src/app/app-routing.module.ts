import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MemoryComponent } from './memory/memory.component';
import { MemoryModule } from './memory/memory.module';
import { LoginModule } from './login/login.module';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuardService } from './auth/auth-guard.service';



const routes: Routes = [
  {
    path:"", loadChildren: "./memory/memory.module#MemoryModule"
  },
  {
    path: "login", loadChildren: "./login/login.module#LoginModule"
  } 
]

@NgModule({
  declarations: [

  ],
  imports: [
    MemoryModule,
    LoginModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
