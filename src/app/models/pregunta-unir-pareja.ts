

export class PreguntaUnirPareja {
    public id: number;
    public img_1: string;
    public texto_1: string;
    public img_2: string;
    public texto_2: string;
    public numEjer : number;
    public musica: string;

    constructor(id = null, img_1 = null, texto_1 = '', img_2 = null, texto_2 = '', numEjer = null, musica = '')
    {

      this.id = id;
      this.img_1 = img_1;
      this.texto_1 = texto_1;
      this.img_2 = img_2;
      this.texto_2 = texto_2;
      this.numEjer = numEjer;
      this.musica = musica;
    }

  }
