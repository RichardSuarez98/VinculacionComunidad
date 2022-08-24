import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showFiller = false;
  nomusu:any
  constructor(private _login:LoginService,
    private _route:Router) { }

  ngOnInit(): void {
    this.nomusu=JSON.parse(localStorage.getItem('usuario')!);

  }

  logout(){
    this._login.logout();
    this._route.navigate(['login'])

  }

}
