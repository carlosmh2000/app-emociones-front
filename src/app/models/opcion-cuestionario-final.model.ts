export class OpcionCuestionarioFinal {
    public id: number;
    public img: string;
    public texto : string;
  
    constructor(id, img = '', texto = '') 
    {
      this.id = id;
      this.img = img;
      this.texto = texto;
    }
  }
  