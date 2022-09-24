import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Observable } from 'rxjs';
import { IActividades } from 'src/app/Interfaces/Actividad';
import { IResponse } from 'src/app/Interfaces/Response';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {
  private url='https://localhost:5001/api/actividad';
  //private url='http://www.api-vincomunidad.somee.com/api/actividad';

  constructor(private http:HttpClient) { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   //  FileSaver
     FileSaver.saveAs(data,`${new Date().toISOString()+fileName+EXCEL_EXTENSION}`);
     //     FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);

  }


/*   GENERAMOS LAS FICHASCERTIFICADO TUTOR, SUPERVISOR Y ACTIVIDADES DIARIAS  */

generarFichaActividadesDiarias(evaluacionRendimiento:IActividades):Observable<IResponse> {
  return this.http.post<IResponse>(this.url+"/fichaActividadDiariaGenerada",evaluacionRendimiento);
}

generarCertificadoTutor(evaluacionRendimiento:IActividades):Observable<IResponse> {
  return this.http.post<IResponse>(this.url+"/generarCertificadoTutor",evaluacionRendimiento);
}

generarCertificadoSupervisor(evaluacionRendimiento:IActividades):Observable<IResponse> {
  return this.http.post<IResponse>(this.url+"/generarCertificadoSupervisor",evaluacionRendimiento);
}

//generarCertificadoTutor
// generarCertificadoSupervisor



}
