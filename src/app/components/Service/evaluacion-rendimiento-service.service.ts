import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvaluacionRendimientoEstudiantil } from 'src/app/Interfaces/EvaluacionRendimientoEstudiantil';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionRendimientoServiceService {

  private url='https://localhost:5001/api/evaluacionRendimientoEstudiantil';

  constructor(private http:HttpClient) { }

  get (evaluacionRendimiento:IEvaluacionRendimientoEstudiantil):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/consultarEvaluacionRendimientoEstudiantil",evaluacionRendimiento);
  }

  post (evaluacionRendimiento:IEvaluacionRendimientoEstudiantil):Observable<IResponse> {
    return this.http.post<IResponse>(this.url,evaluacionRendimiento);
  }

}