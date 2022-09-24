import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAsistenciaQuery } from 'src/app/Interfaces/Asistencia';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaServiceService {
  //private urlGeneral='http://www.api-vincomunidad.somee.com/';
  private urlGeneral='https://localhost:5001/'
  private url=this.urlGeneral+'api/asistencia';
  private urlEstudiante = this.urlGeneral+'api/asistencia/estudianteAsistencia'
  private urlCarrera = this.urlGeneral+'api/asistencia/cargarcarrera';
  private urlCargaaniolectivo = this.urlGeneral+'api/asistencia/cargarAnioLectivo';
  private urlCargaProyecto=this.urlGeneral+'api/asistencia/cargarproyecto';

 ///actualizarAsistencia



  constructor(private http:HttpClient) { }

  get (asistencia:IAsistenciaQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlEstudiante,asistencia);
  }

  getDocente (asistencia:IAsistenciaQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/docenteAsistencia",asistencia);
  }

  getSupervisor (asistencia:IAsistenciaQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/supervisorAsistencia",asistencia);
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

  putAsistencia(asistencia:IAsistenciaQuery):Observable<IResponse>{
    return this.http.post<IResponse>(this.url+"/actualizarAsistencia",asistencia);
  }










}
