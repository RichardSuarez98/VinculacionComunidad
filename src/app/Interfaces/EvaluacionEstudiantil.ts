export interface IEvaluacionEstudiantil {
    idFevaluacionEstudiantil?:  number;
    conocimientoHabilidades?:   string;
    idAnioLectivo?:             number;
    idProyecto?:                number;
    idCarrera?:                 number;
    idUsuario?:                 number;
    detaEvaluacionEstudiantil?: DetaEvaluacionEstudiantil[];
}

export interface DetaEvaluacionEstudiantil {
    idFevaDeta?:               number;
    idFevaluacionEstudiantil?: number;
    calificacion?:              string;
    /*ns?:                       string;
    ps?:                       string;
    s?:                        string;
    ms?:                       string;
    e?:                        string;*/
}

/*export interface IEvaluacionEstudiantil {
    idFevaluacionEstudiantil?:  number;
    conocimientoHabilidades?:   string;
    idAnioLectivo?:             number;
    idProyecto?:                number;
    idCarrera?:                 number;
    idUsuario?:                 number;
    detaEvaluacionEstudiantil?: DetaEvaluacionEstudiantil[];
}

export interface DetaEvaluacionEstudiantil {
    idFevaDeta?:               number;
    idFevaluacionEstudiantil?: number;
    ns?:                       string;
    ps?:                       string;
    s?:                        string;
    ms?:                       string;
    e?:                        string;
}
*/
