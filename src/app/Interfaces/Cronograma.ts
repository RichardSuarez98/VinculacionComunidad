import { Time } from "@angular/common";

export interface ICronograma {
    idCronograma?:               number;
    fechaInicioProyecto?:        Date;
    fechaFinProyecto?:           Date;
    horaInicioJornada?:          Time;
    horaFinJornada?:             Time;
    horaCumplirEstudianteTotal?: number;
    cantidadEstudianteProyecto?: number;
    directorProyectoNumero?:     string;
    docenteColaborador1?:        string;
    docenteColaborador2?:        string;
    idProyecto?:                 number;
    idCarrera?:                  number;
    idAnioLectivo?:              number;
}




