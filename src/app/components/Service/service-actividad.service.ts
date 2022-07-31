import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActividades } from 'src/app/Interfaces/Actividad';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class ServiceActividad{

private url='https://localhost:5001/api/actividad';

  constructor(private http:HttpClient) { }

  get (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/consultarActividad",actividad);
  }

  post (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url,actividad);
  }

  putEstadoActividad (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/actualizarEstado",actividad);
  }

  
}