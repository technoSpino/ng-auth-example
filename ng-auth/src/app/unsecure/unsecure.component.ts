import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-unsecure',
  templateUrl: './unsecure.component.html',
  styleUrls: ['./unsecure.component.css']
})
export class UnsecureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginRedirect() {
    console.log("Redirecting...");
    window.location.href = environment.loginURL
  }
}
