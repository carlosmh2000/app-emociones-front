import {Component, inject, OnInit} from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { Juego } from 'src/app/models/juego.model';
import { ActivatedRoute } from '@angular/router';
import {AlumnoService} from "../../services/alumno.service";

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
})
export class PerfilAlumnoPage implements OnInit {

  private alumnoService = inject(AlumnoService);
  public juegos : Juego[] = [];
  public alumno : Alumno;
  public nombreAlumno;
  public foto;
  public idAlumno ;

  constructor(private activatedRoute: ActivatedRoute) {

   }

  ngOnInit() {


    this.activatedRoute.paramMap.subscribe(params => {
      let alumnoId = params.get('alumnoId');
      console.log('alumnoId: ' + alumnoId);

      this.alumnoService.getAlumno(alumnoId).subscribe(data => {

        this.nombreAlumno = data.nombre;
        console.log('nombreAlumno: ' + this.nombreAlumno);
        this.foto = data.fotoPerfil;
        this.idAlumno = data.id

        console.log('profilePhoto: ' + this.foto);
      });
    });

  }

}
