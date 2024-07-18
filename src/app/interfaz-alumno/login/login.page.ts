import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno.model';
import { DatabaseService } from 'src/app/services/database.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  
  public alumnos : Alumno[] = [];

  constructor( private screenOrientation : ScreenOrientation, private db : DatabaseService){
    
  }

  ngOnInit() {

    this.orientacionHoriz();


    this.db.getDatabaseState().subscribe(listo => {
      if (listo) {
        this.db.getAlumnos().subscribe(alumnos => {
          this.alumnos = alumnos;
        })
      }
    });

  }

  // Lock to landscape
  orientacionHoriz(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
}
