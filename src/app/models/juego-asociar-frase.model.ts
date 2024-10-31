import { Juego } from "./juego.model";
import { PreguntaBuscarIntruso } from "./pregunta-buscar-intruso.model";
import {PreguntaElegirEmocion} from "./pregunta-elegir-emocion";
import {PreguntaAsociarFrase} from "./pregunta-asociar-frase.model";



  export class JuegoAsociarFrase extends Juego{

    public pregunta_tutorial : PreguntaAsociarFrase[] = [];
    // @ts-ignore
    public ejercicios : PreguntaAsociarFrase[][] = [];

    constructor(id, nombre = '', portada =  '', tipo = '', instrucciones = '', tutorial = true, descrip_tutorial = '', efectos_sonido = true, sonidos = [], refPositivo = true, refNegativo = true,  resultadoNum = true, resultadoPicto = false, imgRefPositivo = '', imgRefNegativo = '',  cuestionarioFinal = true, cuestionarioFinalPregunta = '', opcionesCuestionarioFinal = [], pregunta_tutorial = [] , ejercicios = [])
    {
      super(id, nombre, portada, tipo, instrucciones, tutorial, descrip_tutorial, efectos_sonido, sonidos, refPositivo, refNegativo,  resultadoNum, resultadoPicto, imgRefPositivo, imgRefNegativo,  cuestionarioFinal, cuestionarioFinalPregunta, opcionesCuestionarioFinal);
      this.id = id;
      this.pregunta_tutorial = pregunta_tutorial;
      this.ejercicios = ejercicios;
    }
  }
