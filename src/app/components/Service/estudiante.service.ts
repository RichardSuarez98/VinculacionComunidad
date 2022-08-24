import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstudianteQuery } from 'src/app/Interfaces/Estudiante';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private url='https://localhost:5001/api/estudiante';
  private urlFicha='https://localhost:5001/api/fichas';

  constructor(private http:HttpClient) { }

  getActividades (estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/actividadesEstudiante",estudiante);
  }


  putGuardarEvidencia (estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/guardarEvidencia",estudiante);
  }

/*********************************************   AQUI CAMBIA LA URL               */

  fichaActividadDiaria (estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlFicha+"/fichaActividadDiaria",estudiante);
  }


  DescargarfichaActividadDiaria (estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlFicha+"/DescargarfichaActividadDiaria",estudiante);
  }

  //fichaEvaluacionEstudiantil ****************************** FICHA EVALUACION ESTUDIANTIL *******************************
  fichaEvaluacionEstudiantil (estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlFicha+"/fichaEvaluacionEstudiantil",estudiante);
  }


  DescargarfichaEvaluacionEstudiantil (estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlFicha+"/DescargarfichaEvaluacionEstudiantil",estudiante);
  }

  ////  ************************************** FICHA DE EVALUACION Y RENDIMIENTO                fichaEvaluacionRendimiento
  fichaEvaluacionRendimiento (estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlFicha+"/fichaEvaluacionRendimiento",estudiante);
  }
  DescargarfichafichaEvaluacionRendimiento (estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlFicha+"/DescargarfichaEvaluacionRendimiento",estudiante);
  }


  ////   ******************************** certificaxccion
  DescargarCertificacionTutor(estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlFicha+"/certificadoTutor",estudiante);
  }

  DescargarCertificacionSupervisor(estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlFicha+"/certificadoSupervisor",estudiante);
  }




}
