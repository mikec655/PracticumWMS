import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const loginRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
]

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  exports: [],
  providers: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes),
  ]
})
export class RegisterModule { }
