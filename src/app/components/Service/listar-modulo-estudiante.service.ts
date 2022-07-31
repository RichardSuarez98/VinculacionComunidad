import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class ListarModuloEstudianteService {

  private url='https://localhost:5001/api/estudiante';

  constructor(private http:HttpClient) { }

  getFicha (id: number):Observable<IResponse> {
    return this.http.get<IResponse>(`${this.url+"/consultarFicha"}/${id}`);
  }

  getFichaRendimiento (id: number):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/consultarFichaEvaluacionRendimiento",id);
  }

  getFichaMonitoreo (id: number):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/consultarFichaMonitoreo",id);
  }

  getFichaActividades (id: number):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/consultarFichaActividades",id);
  }




}
