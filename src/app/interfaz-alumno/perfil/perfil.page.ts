import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Alumno } from 'src/app/models/alumno.model';
import { CamaraService } from 'src/app/services/camara.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  public alumno : Alumno;

  constructor( private db : DatabaseService, private screenOrientation : ScreenOrientation, public photoService: CamaraService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.lockToLandscape();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('alumnoId')) {
        return;
      }

      const alumnoId = paramMap.get('alumnoId');
      //this.alumno = this.alumnoService.getAlumno(alumnoId);
      Promise.all([this.db.getAlumno(alumnoId)]).then((al) => {
        this.alumno = new Alumno(al[0].id, al[0].nombre, al[0].fotoPerfil) ;
      });

    });
  }

  // Lock to landscape
  lockToLandscape(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
}
