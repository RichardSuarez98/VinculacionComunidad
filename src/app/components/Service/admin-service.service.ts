import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IactualizarDatos } from 'src/app/Interfaces/IActualizarDatos';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
 // private url='https://localhost:5001/api/AdminControl';
  private url='http://www.api-vincomunidad.somee.com/api/AdminControl';


  constructor(private http:HttpClient) { }

  getLog():Observable<IResponse> {
    return this.http.get<IResponse>(this.url+"/log");
  }

  getUsuarioTotales():Observable<IResponse> {
    return this.http.get<IResponse>(this.url+"/admin");
  }

  getFichaEstudiantil(ficha:fichaAdmin):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/fichaEstudiante",ficha);
  }


  actualizarDatos(datos:IactualizarDatos):Observable<IResponse>{
    return this.http.post<IResponse>(this.url+"/ActualizarRolPassword",datos);
  }








  getCargarRoles():Observable<IResponse>{
    return this.http.get<IResponse>(this.url+"/roles");
  }

getCargarEstudiantes():Observable<IResponse>{
  return this.http.get<IResponse>(this.url+"/listarEstudiantes");
}



}



export interface fichaAdmin{
  tipoFicha?: number;
  idEstudiante?: number;
}
