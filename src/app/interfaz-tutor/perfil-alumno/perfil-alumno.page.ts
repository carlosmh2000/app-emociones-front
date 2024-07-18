import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { Juego } from 'src/app/models/juego.model';
import { DatabaseService } from 'src/app/services/database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
})
export class PerfilAlumnoPage implements OnInit {

  
  public juegos : Juego[] = [];
  public alumno : Alumno; 
  public nombreAlumno;
  public foto;

  constructor( private db : DatabaseService, private activatedRoute: ActivatedRoute) {
    
   }

  ngOnInit() {

    
    this.activatedRoute.paramMap.subscribe(params => {
      let alumnoId = params.get('alumnoId');
      console.log('alumnoId: ' + alumnoId);

      this.db.getAlumno(alumnoId).then(data => {

        this.nombreAlumno = data.nombre;
        console.log('nombreAlumno: ' + this.nombreAlumno);
        this.foto = data.fotoPerfil;
        console.log('profilePhoto: ' + this.foto);
      });
    });

  }

}
