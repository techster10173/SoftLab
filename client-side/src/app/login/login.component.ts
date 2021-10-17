import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  successLogin(event: FirebaseUISignInSuccessWithAuthResult){
    this.router.navigate(['/projects']);
  }

  errorCallback(event: FirebaseUISignInFailure){
    this.snackbar.open(event.code);
  }

}
