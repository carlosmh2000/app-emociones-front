

export class PreguntaAsociar {
    public id: number;
    public img: string;
    public texto : string;
    public tipo : string;
    public opcionCorrecta : Boolean;
    public numEjer : number;
  
    constructor( id : number = null, img : string = '', texto : string = '', tipo : string = '', opcionCorrecta : Boolean = null, numEjer : number  = null) 
    {

      this.id = id;
      this.img = img;
      this.texto = texto;
      this.tipo = tipo;
      this.opcionCorrecta = opcionCorrecta;
      this.numEjer = numEjer;
    }
  }