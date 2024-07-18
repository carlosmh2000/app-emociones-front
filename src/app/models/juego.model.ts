import { OpcionCuestionarioFinal } from "./opcion-cuestionario-final.model";

  export class Juego {
    public id: number;
    public nombre: string;
    public portada : string;
    public tipo : string;
    public instrucciones : string;
    public tutorial : boolean;
    public descrip_tutorial : string;
    public efectos_sonido : boolean;
    public sonidos : string [];
    public refPositivo : boolean;
    public refNegativo : boolean;
    public resultadoNum : boolean;
    public resultadoPicto : boolean;
    public imgRefPositivo : string;
    public imgRefNegativo : string;
    public cuestionarioFinal : boolean;
    public cuestionarioFinalPregunta : string;
    public opcionesCuestionarioFinal : OpcionCuestionarioFinal[];

  
    constructor(id, nombre = '', portada =  '', tipo = '', instrucciones = '', tutorial = true, descrip_tutorial = '', efectos_sonido = true, sonidos = [], refPositivo = true, refNegativo = true,  resultadoNum = true, resultadoPicto = false,
    imgRefPositivo = '', imgRefNegativo = '',  cuestionarioFinal = true, cuestionarioFinalPregunta = '', opcionesCuestionarioFinal = []) 
    {
      this.id = id;
      this.nombre = nombre;
      this.portada = portada;
      this.tipo = tipo;
      this.instrucciones = instrucciones;
      this.tutorial = tutorial;
      this.descrip_tutorial = descrip_tutorial;
      this.efectos_sonido = efectos_sonido;
      this.sonidos = sonidos;
      this.refPositivo = refPositivo;
      this.refNegativo = refNegativo;
      this.resultadoNum = resultadoNum;
      this.resultadoPicto = resultadoPicto;
      this.imgRefPositivo = imgRefPositivo;
      this.imgRefNegativo = imgRefNegativo;
      this.cuestionarioFinal = cuestionarioFinal;
      this.cuestionarioFinalPregunta = cuestionarioFinalPregunta;
      this.opcionesCuestionarioFinal = opcionesCuestionarioFinal;
    }
  
  }