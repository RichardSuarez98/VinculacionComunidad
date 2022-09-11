import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReporte } from 'src/app/Interfaces/Reporte';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class ReporteServiceService {

  private url='https://localhost:5001/api/reportes';

  constructor(private http:HttpClient) { }

  getReporte (reporte: IReporte):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/consultarReporte",reporte);
  }



}
