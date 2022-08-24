import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../Service/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

constructor(private service:LoginService,private route:Router){

}

canActivate() {
    if(this.service.HaveAcces())
    return true;
    else{
        //alert("tu no tienes acceso");
        //this.route.navigate(['']);
        this.route.navigate(['/dashboard/pagenotfound']);
        return false;
    }

}


}
