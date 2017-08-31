import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getAccount() {
    this.http.get(environment.accountURL).subscribe((response) => {
      console.log(response);
    })
  }

  getForbidden() {
    this.http.get(environment.forbiddenURL).subscribe((response) => {
      console.log(response);
    })
  }

}
