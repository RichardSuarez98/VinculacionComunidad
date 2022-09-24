import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstudianteQuery, queryMonitoreoDocenteBuscar } from 'src/app/Interfaces/Estudiante';
import { fichaDatosGeneralResponse, guardarDatosGeneralResponse } from 'src/app/Interfaces/IFichaDatosGenerales';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  //private url='http://www.api-vincomunidad.somee.com/api/estudiante'
  private url='https://localhost:5001/api/estudiante';
  private urlFicha='https://localhost:5001/api/fichas';
  //private urlFicha='http://www.api-vincomunidad.somee.com/api/fichas';

  constructor(private http:HttpClient) { }

  getActividades (estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/actividadesEstudiante",estudiante);
  }


  putGuardarEvidencia (estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/guardarEvidencia",estudiante);
  }

  getVerAsistenciaEstudiante(estudiante:IEstudianteQuery){
    return this.http.post<IResponse>(this.url+"/verAsistencia",estudiante);
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


   ////  ************************************** FICHA DE MONITOREO
   fichaEvaluacionMonitoreoDocente(estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlFicha+"/fichaMonitoreoDocente",estudiante);
  }

  DescargarfichafichaMonitoreoDocente(estudiante:queryMonitoreoDocenteBuscar):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlFicha+"/DescargarfichaMonitoreoDocente",estudiante);
  }


/*  ficha de asistencia   */
fichaEstudianteAsistencia(estudiante:IEstudianteQuery):Observable<IResponse> {
  return this.http.post<IResponse>(this.urlFicha+"/fichaAsistencia",estudiante);
}
  DescargarfichaAsistenciaEstudiantil(estudiante:IEstudianteQuery):Observable<IResponse> {
    return this.http.post<IResponse>(this.urlFicha+"/DescargarFichaAsistencia",estudiante);
  }



  /* FICHA DE DATOS GENERAL*/
/* FICHA DE DATOS GENERAL*/
consultarFichaDatosGeneral(evaluacion:IEstudianteQuery):Observable<IResponse> {
  return this.http.post<IResponse>(this.urlFicha+"/ConsultarfichaDatosGeneral",evaluacion);
}

postCargarFichaDatosGenerales (evaluacion:fichaDatosGeneralResponse):Observable<IResponse> {
  return this.http.post<IResponse>(this.urlFicha+"/fichaDatosGeneral",evaluacion);
}



/*   private urlFicha='https://localhost:5001/api/fichas';
GUARDAR FICHA DE FATOS GENERALES
*/


guardarFichaDatosGenerales(solicitud:guardarDatosGeneralResponse):Observable<IResponse> {
  return this.http.post<IResponse>(this.urlFicha+"/guardarFichaDatosGenerales",solicitud);
}






}
