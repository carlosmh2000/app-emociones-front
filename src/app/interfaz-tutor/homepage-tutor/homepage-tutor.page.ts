import {Component, inject, OnInit} from '@angular/core';
import * as $ from "jquery";
import { DatabaseService } from '../../services/database.service';
import { Alumno } from 'src/app/models/alumno.model';
import { Observable } from 'rxjs';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { OpcionCuestionarioFinal } from 'src/app/models/opcion-cuestionario-final.model';
import { PreguntaUnir } from 'src/app/models/pregunta-unir.model';
import { JuegoUnir } from 'src/app/models/juego-unir.model';
import {AlumnoService} from "../../services/alumno.service";
import {Filesystem} from "@capacitor/filesystem";

@Component({
  selector: 'app-homepage-tutor',
  templateUrl: './homepage-tutor.page.html',
  styleUrls: ['./homepage-tutor.page.scss'],
})
export class HomepageTutorPage implements OnInit {
  private alumnoService = inject(AlumnoService);

  alumnos: Alumno[] = [];
  alumno : Alumno;
  nombreAlumno : string;
  preguntas : PreguntaUnir[] = [];
  juegos : JuegoUnir[] = [];
  sonidos : string[] = [];
  opcionesCuestionarioFinal : OpcionCuestionarioFinal[] = [];



  selectedView = 'devs';

  constructor(private db: DatabaseService, private screenOrientation : ScreenOrientation) { }

  ngOnInit() {

    this.lockToPortrait();

    this.alumnoService.getAlumnos().subscribe(al => {
      this.alumnos = al.items;
      console.log(this.alumnos);
    });

    /***


    this.db.getJuegosUnirColor().subscribe(jue => {
      this.juegos = jue;

      console.log(this.juegos);

    })

    this.db.getPreguntasUnirColor().subscribe(jue => {
      console.log(jue);

    })

    this.db.getSonidos().subscribe(jue => {
      console.log(jue);
      this.sonidos = jue;
      console.log(this.sonidos);

    })

    this.db.getOpcionesCuestionarioFinal().subscribe(jue => {
      console.log(jue);
      this.opcionesCuestionarioFinal = jue;
      console.log(this.opcionesCuestionarioFinal);

    })
     */
  }

  // Lock to landscape
  lockToPortrait(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  borrar(){
    this.db.deleteJuegoUnirColor(1).then(_ => {

    })

    this.db.deleteJuegoUnirColor(2).then(_ => {

    })

    this.db.deleteJuegoUnirColor(3).then(_ => {

    })

    this.db.deleteJuegoUnirColor(4).then(_ => {

    })

    this.db.deleteJuegoUnirColor(5).then(_ => {

    })

    this.db.deleteJuegoUnirColor(6).then(_ => {

    })

    this.db.deleteJuegoUnirColor(7).then(_ => {

    })

    this.db.deleteJuegoUnirColor(8).then(_ => {

    })

    this.db.deleteJuegoUnirColor(9).then(_ => {

    })

    this.db.deleteJuegoUnirColor(10).then(_ => {

    })

  }
}
