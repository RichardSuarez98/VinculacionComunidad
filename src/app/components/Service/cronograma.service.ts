import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICronograma } from 'src/app/Interfaces/Cronograma';
import { IResponse } from 'src/app/Interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class CronogramaService {
  private url='https://localhost:5001/api/cronograma';
  //private url='http://www.api-vincomunidad.somee.com';

  constructor(private http:HttpClient) { }

  get (cronograma:ICronograma):Observable<IResponse> {
    return this.http.post<IResponse>(this.url+"/consultarCronograma",cronograma);
  }

  getConsultaDocente (cronograma:number):Observable<IResponse> {/*        ESTA PENDIENTEEE*/
    return this.http.post<IResponse>(this.url+"/consultarCronograma",cronograma);
  }

  postcronograma(cronograma:ICronograma):Observable<IResponse>{
    return this.http.post<IResponse>(this.url,cronograma);
  }

  putcronograma(cronograma:ICronograma):Observable<IResponse>{
    return this.http.post<IResponse>(this.url+"/actualizarCronograma",cronograma);
  }


}
