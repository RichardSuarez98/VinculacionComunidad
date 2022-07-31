import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMonitoreoDocente } from 'src/app/Interfaces/MonitoreoDocente';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class MonitoreoDocenteServiceService {
  private url='https://localhost:5001/api/monitoreoDocente';

  constructor(private http:HttpClient) { }

  get (monitoreoDocente:IMonitoreoDocente):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/consultarMonitoreoDocente",monitoreoDocente);
  }

  post (monitoreoDocente:IMonitoreoDocente):Observable<IResponse> {
    return this.http.post<IResponse>(this.url,monitoreoDocente);
  }
}
