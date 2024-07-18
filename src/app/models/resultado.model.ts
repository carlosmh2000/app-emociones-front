
export class Resultado{
    public id: number;
    public correctas: number;
    public incorrectas: number;
    public fecha: Date;
    public idJuego: number;
    public idAlumno : number;
  
    constructor(  id, correctas, incorrectas, fecha, idJuego, idAlumno) 
    {
      this.id = id;
      this.correctas = correctas;
      this.incorrectas = incorrectas;
      this.fecha = fecha;
      this.idJuego = idJuego;
      this.idAlumno = idAlumno;
    }
  
  }