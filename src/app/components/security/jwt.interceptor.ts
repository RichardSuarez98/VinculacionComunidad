import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../Service/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private loginservice:LoginService){}

    intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
       const usuario= this.loginservice.usuarioData;

       if(usuario){
        request=request.clone({
            setHeaders:{
                Authorization: `Bearer ${usuario.token}` 
            }
        });
       }
       return next.handle(request);


    }
}
