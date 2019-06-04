import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryComponent } from './memory.component';
import { SideBarModule } from '../side-bar/side-bar.module';
import { BoardModule } from '../board/board.module';
import { TopBarModule } from '../top-bar/top-bar.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes:Routes = [
  {path: '', component: MemoryComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  declarations: [MemoryComponent],
  imports: [
    CommonModule,
    BoardModule,
    SideBarModule,
    TopBarModule,
    RouterModule.forChild(routes)
  ],
  providers: [AuthService, AuthGuardService]
})
export class MemoryModule { }
