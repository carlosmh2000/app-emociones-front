

export class PreguntaUnir {
    public id: number;
    public color: string;
    public texto_color: string;
    public asociada: string;
    public texto_asociada: string;
    public musica : string;
    public numEjer : number;
  
    constructor(id = null, color = null, texto_color = '', asociada = null, texto_asociada = '', musica = '', numEjer = null) 
    {

      this.id = id;
      this.color = color;
      this.texto_color = texto_color;
      this.asociada = asociada;
      this.texto_asociada = texto_asociada;
      this.musica = musica;
      this.numEjer = numEjer;
    }
  
  }