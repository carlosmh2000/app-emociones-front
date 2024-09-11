import {Component, inject, OnInit} from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {AlumnoService} from "../../services/alumno.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private alumnoService = inject(AlumnoService);

  public alumnos : Alumno[] = [];

  constructor( private screenOrientation : ScreenOrientation){

  }

  ngOnInit() {

    this.orientacionHoriz();
    this.alumnoService.getAlumnos().subscribe(alumnos => {
      this.alumnos = alumnos.items;
    })
  }

  // Lock to landscape
  orientacionHoriz(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
}
