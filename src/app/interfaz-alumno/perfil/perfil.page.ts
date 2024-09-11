import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Alumno } from 'src/app/models/alumno.model';
import { CamaraService } from 'src/app/services/camara.service';
import {AlumnoService} from "../../services/alumno.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  private alumnoService = inject(AlumnoService);
  public alumno : Alumno;

  constructor(private screenOrientation : ScreenOrientation, public photoService: CamaraService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.lockToLandscape();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('alumnoId')) {
        return;
      }

      const alumnoId = paramMap.get('alumnoId');
      //this.alumno = this.alumnoService.getAlumno(alumnoId);
      this.alumnoService.getAlumno(alumnoId).subscribe(alumno => {
        this.alumno = alumno;
      });

    });
  }

  // Lock to landscape
  lockToLandscape(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
}
