import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvaluacionEstudiantil } from 'src/app/Interfaces/EvaluacionEstudiantil';
import { fichaDatosGeneralResponse } from 'src/app/Interfaces/IFichaDatosGenerales';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionEstudiantilServiceService {

  private url='https://localhost:5001/api/evaluacionEstudiantil';
  //private url='http://www.api-vincomunidad.somee.com/api/evaluacionEstudiantil';

  constructor(private http:HttpClient) { }

  get (evaluacion:IEvaluacionEstudiantil):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/consultarEvaluacionEstudiantil",evaluacion);
  }

  post (evaluacion:IEvaluacionEstudiantil):Observable<IResponse> {
    return this.http.post<IResponse>(this.url,evaluacion);
  }

  /*  /api/evaluacionEstudiantil/mostrarperiodo */
  postCargarDatosParaEvaluacionEstudiantil (evaluacion:IEvaluacionEstudiantil):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/mostrarperiodo",evaluacion);
  }






}
