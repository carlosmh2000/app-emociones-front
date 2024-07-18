

export class PreguntaBuscarIntruso {
    public id: number;
    public img: string;
    public texto : string;
    public intruso : Boolean;
    public numEjer : number;
  
    constructor( id : number = null, img : string = '', texto : string = '', intruso : Boolean = null, numEjer : number  = null) 
    {

      this.id = id;
      this.img = img;
      this.texto = texto;
      this.intruso = intruso;
      this.numEjer = numEjer;
    }
  }