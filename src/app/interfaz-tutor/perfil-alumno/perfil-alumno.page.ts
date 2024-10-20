import {Component, inject, OnInit} from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { Juego } from 'src/app/models/juego.model';
import { ActivatedRoute } from '@angular/router';
import {AlumnoService} from "../../services/alumno.service";
import {JuegoService} from "../../services/juego.service";

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.page.html',
  styleUrls: ['./perfil-alumno.page.scss'],
})
export class PerfilAlumnoPage implements OnInit {

  private alumnoService = inject(AlumnoService);
  private juegoService = inject(JuegoService);
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
      this.idAlumno = parseInt(alumnoId);
      console.log('alumnoId: ' + alumnoId);

      this.alumnoService.getAlumno(alumnoId).subscribe(data => {

        this.nombreAlumno = data.nombre;
        console.log('nombreAlumno: ' + this.nombreAlumno);
        this.foto = data.fotoPerfil;
        this.idAlumno = data.id
        this.juegoService.getJuegosAlumno('unirColor', this.idAlumno).subscribe(unirColor => {
          this.juegos = unirColor.items;
          this.juegoService.getJuegosAlumno('asociarImagen', this.idAlumno).subscribe(asociarImagen => {
            this.juegos = this.juegos.concat(asociarImagen.items);
            this.juegoService.getJuegosAlumno('unirFrase', this.idAlumno).subscribe(unirFrase => {
              this.juegos = this.juegos.concat(unirFrase.items);
              this.juegoService.getJuegosAlumno('elegirEmocion', this.idAlumno).subscribe(elegirEmocion => {
                this.juegos = this.juegos.concat(elegirEmocion.items);
                this.juegoService.getJuegosAlumno('hacerPareja', this.idAlumno).subscribe(hacerPareja => {
                  this.juegos = this.juegos.concat(hacerPareja.items);
                  this.juegoService.getJuegosAlumno('buscarIntruso', this.idAlumno).subscribe(buscarIntruso => {
                    this.juegos = this.juegos.concat(buscarIntruso.items);
                    console.log(this.juegos);
                  });
                });
              });
            });
          });
        });
      });
    });

  }

}
