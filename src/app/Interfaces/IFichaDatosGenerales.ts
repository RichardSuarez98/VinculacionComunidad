export interface datosGeneralesResponse {
  tituloProyecto?:         string;
  nombreCarrera?:          string;
  nombreEstudiante?:       string;
  cedulaEstudiante?:       string;
  correoEstudiante?:       string;
  nombreDocente?:          string;
  nombreSupervisor?:       string;
  cedulaSupervisor?:       string;
  cargoSupervisor?:        string;
  departamentoSupervisor?: string;
  nombreInstitucion?:      string;
  ruc?:                    string;
  direccion?:              string;
  telefonos?:              string;
  email?:                  string;
  fechaInicio?:            Date;
  fechaProgramada?:        Date;
  fechaFinalReal?:         Date;
  jornadaPractica?:        string;
  horario?:                string;
  diasSemanas?:            string;
  codigoProyecto?:         string;
}

export interface fichaDatosGeneralResponse{
  idAnioLectivo?: number;
  idCarrera?:     number;
  idProyecto?:    number;
}



export interface guardarDatosGeneralResponse {
  idFdatosGenerales?: number;
  fechaInicio?:       Date;
  fechaProgramada?:   Date;
  fechaFinalReal?:    Date;
  jornadaPractica?:   string;
  diasSemanas?:       string;
  horario?:           string;
  idProyecto?:        number;
  idAnioLectivo?:     number;
  idCarrera?:         number;
  fechaGeneracion?:   Date;
}


