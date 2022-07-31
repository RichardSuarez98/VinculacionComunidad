
export interface IActividades {
    idActividadesDiarias?: number;
    numeroSemana?:         number;
    totalHoras?:           number;
    idUsuario?:            number;
    idAnioLectivo?:        number;
    idProyecto?:           number;
    idCarrera?:            number;
    detaActividad?:        DetaActividad[];
    estadoDocente?:        string;
    estadoSupervisor?:        string;
}

export interface DetaActividad {
    idActividadDiDeta?:    number;
    idActividadesDiarias?: number;
    fecha?:                Date;
    descripcionActividad?: string;
    horas?:                number;
}
