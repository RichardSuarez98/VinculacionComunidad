import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../Service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route:Router,
    private loginservice:LoginService){


}

canActivate(route: ActivatedRouteSnapshot){
const usuario= this.loginservice.usuarioData;

if(usuario){
return true;
}

this.route.navigate(['/login']);
return false;
}
}
