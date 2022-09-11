import { Time } from "@angular/common";

export interface IMonitoreoDocente {
    idFmonitoreoDocente?: number;
    idUsuario?:           number;
    idAnioLectivo?:       number;
    idProyecto?:          number;
    visita?:              number;
    horaVisita?:          string;
    fecha?:               Date;
    idCarrera?:           number;
    observacion?:         string;
    recomendacion?:       string;
    detaeMonitoreoDocente?: DetaeMonitoreoDocente[];
}

export interface DetaeMonitoreoDocente {
    idMoniDeta?:          number;
    idFmonitoreoDocente?: number;
    calificacion?:              string;
    /*ns?:                  string;
    ps?:                  string;
    s?:                   string;
    ms?:                  string;
    e?:                   string;*/
}

