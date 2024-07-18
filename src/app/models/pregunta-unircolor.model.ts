import { Pregunta } from "./pregunta.model";

export interface PreguntaUnircolorDto{
    id: number;
    color: string;
    texto_color : string
    asociada : string;
    texto_asociada : string;
    musica : string;
    numEjer : number;
}


export class PreguntaUnircolor extends Pregunta{
    public id: number;
    public color: string;
    public texto_color: string;
    public asociada: string;
    public texto_asociada: string;
    public musica : string;
    public numEjer : number;
  
    constructor( { id, color, texto_color, asociada, texto_asociada, musica, numEjer}: PreguntaUnircolorDto = { id: null, color: null, texto_color: '', asociada: null, texto_asociada: '', musica: '', numEjer: null }) 
    {

      super();
      this.id = id;
      this.color = color;
      this.texto_color = texto_color;
      this.asociada = asociada;
      this.texto_asociada = texto_asociada;
      this.musica = musica;
      this.numEjer = numEjer;
    }
  
    uuidv4(): string {
      return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
        /[018]/g,
        (c: number) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
      );
    }
  }