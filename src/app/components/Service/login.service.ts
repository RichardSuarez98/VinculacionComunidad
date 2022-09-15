import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ILogin } from 'src/app/Interfaces/login';
import { IResponse } from 'src/app/Interfaces/Response';
import { IUsuario, Usuario } from 'src/app/Interfaces/Usuario';

const httop={
  headers: new  HttpHeaders({
    'Context-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null!);
  }

 public useri : Observable<IUsuario>

  private url = 'https://localhost:5001/api/authLogin';
//http://www.api-vincomunidad.somee.com/api/authLogin
//private url = 'http://www.api-vincomunidad.somee.com/api/authLogin';

  private usuarioSubject: BehaviorSubject<IUsuario>;

  public get usuarioData(): IUsuario{
    return this.usuarioSubject.value;
  }

  constructor(private http: HttpClient,private route:Router) {
    this.usuarioSubject=
    new BehaviorSubject<IUsuario>(JSON.parse(localStorage.getItem('usuario')!));
    this.useri=this.usuarioSubject.asObservable();
  }



  login(usuario: ILogin): Observable<IResponse> {
    return this.http.post<IResponse>(this.url,usuario,httop).pipe( //httOption
      map(res=>{
        if(res.codigo=== 1){
            const usuario : IUsuario = res.data!;
            localStorage.setItem('usuario',JSON.stringify(usuario));
            this.usuarioSubject.next(usuario);
        }
        return res;

      })
    );

  }




  HaveAcces(){
    /*var loggintoken= localStorage.getItem('usuario')||'';
    var _extractedtoken=loggintoken.split('.')[1];
    var _atobdata=atob(_extractedtoken);
    var _finaldata=JSON.parse(_atobdata);*/
   // this.nomusu=JSON.parse(localStorage.getItem('usuario')!);

    var _finaldata=JSON.parse(localStorage.getItem('usuario')!);
    if(_finaldata.idRol===1){
     // console.log("Tienes acceso de Director de Carrera");
      return true;
    }else if(_finaldata.idRol===2){
      //console.log("Tienes acceso de Gestor de Vinculación");
      return true;
    }else if(_finaldata.idRol===3){
      //console.log("Tienes acces de Director de Proyecto");
      return true;
    }
    else if(_finaldata.idRol===4){
     // console.log("Tienes acces de Docente Tutor");
      return true;
    }else if(_finaldata.idRol===5){
     // console.log("Tienes acces de Supervisor");
      return true;
    }else if(_finaldata.idRol===6){
      //this.route.navigate(['dashboard/estudiante']);
     // console.log("Tienes acces de Estudiante");
      return false;
    }
  //pagenotfound
    //this.router.navigate(['paginanotfound']);
    //alert("tu no tienes acceso");
    //console.log("no tienes acceso");
  return false
  }






}


