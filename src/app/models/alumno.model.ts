export class Alumno {
    public id: number;
    public nombre: string;
    public fotoPerfil : string;
  
    constructor( id, nombre, fotoPerfil) 
    {
      this.id = id;
      this.nombre = nombre;
      this.fotoPerfil = fotoPerfil;
    }

  }