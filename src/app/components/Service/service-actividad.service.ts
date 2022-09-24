import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetaActividad, IActividades } from 'src/app/Interfaces/Actividad';
import { IResponse } from 'src/app/Interfaces/Response';
import { IActividadesGestorAprobarPlanificacion } from '../dashboard/director-proyecto-modulo/director-proyecto-modulo.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceActividad{

    private url='https://localhost:5001/api/actividad';
  //private url='http://www.api-vincomunidad.somee.com/api/actividad';

  constructor(private http:HttpClient) { }

  eliminarEstudianteActividad (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/eliminarActividad",actividad);
  }


  get (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/consultarActividad",actividad);
  }

  getActividadesEstudianteTotales (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/consultarActividadEstudianteTotal",actividad);
  }

  post (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url,actividad);
  }
  ActualizarActividad (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/actualizarActividad",actividad);
  }

  putEstadoActividad (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/actualizarEstado",actividad);
  }

  getMostrarActividadEstudiante(actividad:IActividades):Observable<IResponse>{
    return this.http.post<IResponse>(this.url+"/actividadDetalleEstudiante",actividad);
  }



  putEstaDocenteActividad (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/actualizarEstadoDocenteSupervisor",actividad);
  }

/*  putEstadoSupervisorActividad (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/actualizarEstadoSupervisor",actividad);
  }*/

   //mostarActividadCompleta

   getMostrarActividadDialog (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/mostarActividadCompleta",actividad);
  }


  getMostrarPorcentajeProyecto (actividad:IActividades):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/porcentajeActividad",actividad);
  }

//actualizarObservacion
putActualizarObservacion (actividad:DetaActividad):Observable<IResponse> {
  return this.http.post<IResponse>(this.url+"/actualizarObservacion",actividad);
}


putActualizarDetalleActividad (actividad:DetaActividad):Observable<IResponse> {
  return this.http.post<IResponse>(this.url+"/actualizarDetalleActividad",actividad);
}




///// EL GESTOR DE VINCULACION ACTUALIZA EL ESTADO DE LA PLANIFICACION
actualizarPlanificacionGestor(numero:IActividadesGestorAprobarPlanificacion):Observable<IResponse>{
  return this.http.post<IResponse>(this.url+"/aprobarpla",numero);
}



}
