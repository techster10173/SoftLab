import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import { AngularFireAuth } from '@angular/fire/auth';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToMain = () => redirectLoggedInTo(['']);

const routes: Routes = [
  { path: 'login',
  canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectLoggedInToMain},
  loadChildren: () => import('./login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AngularFireAuth],
  exports: [RouterModule]
})

export class AppRoutingModule { }
