
export interface IActividades {
    idActividadesDiarias?: number;
    numeroSemana?:         number;
    totalHoras?:           number;
    idEstudiante?:         number;
    idAnioLectivo?:        number;
    idProyecto?:           number;
    idCarrera?:            number;
    idDocente?:            number;
    idSupervisor?:         number;
    estadoDocente?:        string;
    estadoSupervisor?:     string;
    detaActividad?:        DetaActividad[];
}

export interface DetaActividad {
  idActividadDiDeta?:    number;
  idActividadesDiarias?: number;
  fecha?:                Date;
  descripcionActividad?: string;
  horas?:                number;
  estadoDocente?:        string;
  estadoSupervisor?:     string;
  observacion?:          string;
}

