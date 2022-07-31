import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAsistenciaQuery } from 'src/app/Interfaces/Asistencia';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaServiceService {
  private url='https://localhost:5001/api/asistencia';
  private urlEstudiante = 'https://localhost:5001/api/asistencia/estudianteAsistencia'
  private urlCarrera = 'https://localhost:5001/api/asistencia/cargarcarrera';
  private urlCargaaniolectivo = 'https://localhost:5001/api/asistencia/cargarAnioLectivo';
  private urlCargaProyecto='https://localhost:5001/api/asistencia/cargarproyecto';


  constructor(private http:HttpClient) { }

  get (asistencia:IAsistenciaQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlEstudiante,asistencia);
  }
 
  getCarrera ():Observable<any> {
    return this.http.get<any>(this.urlCarrera);
  }

  getCargaAnioLectivo ():Observable<any> {
    return this.http.get<any>(this.urlCargaaniolectivo);
  }

  getCargaProyecto ():Observable<any> {
    return this.http.get<any>(this.urlCargaProyecto);
  }

  postAsistencia(asistencia:IAsistenciaQuery):Observable<IResponse>{
    return this.http.post<IResponse>(this.url,asistencia);
  }









}
