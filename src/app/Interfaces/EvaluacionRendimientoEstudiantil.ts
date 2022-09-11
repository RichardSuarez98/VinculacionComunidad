export interface IEvaluacionRendimientoEstudiantil {
    idFevaluacionRendimiento?: number;
    observacion?:              string;
    idUsuario?:                number;
    idAnioLectivo?:            number;
    idProyecto?:               number;
    idCarrera?:                number;
    detaevaRendimiento?:       DetaevaRendimiento[];
}

export interface DetaevaRendimiento {
    idfevaReDe?:               number;
    idFevaluacionRendimiento?: number;
    calificacion?:             string;
    /*ns?:                       string;
    ps?:                       string;
    s?:                        string;
    ms?:                       string;
    e?:                        string;*/
}
