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
    ns?:                  string;
    ps?:                  string;
    s?:                   string;
    ms?:                  string;
    e?:                   string;
}
