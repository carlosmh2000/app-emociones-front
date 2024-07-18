import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Alumno } from 'src/app/models/alumno.model';
import { Juego } from 'src/app/models/juego.model';
import { CamaraService } from 'src/app/services/camara.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  public alumnos : Alumno[] = [];
  public alumno : Alumno;
  public juegos : Juego[] = [];
  public nombreAlumno : string;
  public profilePhoto : string;


  constructor(private db : DatabaseService, private screenOrientation : ScreenOrientation, public photoService: CamaraService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    //obtenermos el id del alumno de la ruta
    this.activatedRoute.paramMap.subscribe(params => {
      let alumnoId = params.get('alumnoId');

      //obtenemos el alumno de la base de datos
      this.db.getAlumno(alumnoId).then(data => {

        this.nombreAlumno = data.nombre;
        this.profilePhoto = data.fotoPerfil;
        this.alumno = data;
      });
    });

    //obtenemos la lista de juegos de la base de datos
    this.db.getDatabaseState().subscribe(listo => {
      if (listo) {
        this.db.getJuegosUnirColor().subscribe(juegos => {
          this.juegos = juegos;
        })
      }
    });
  }

  //Función para obtener la ruta del tipo de juego
  jugarJuegoTipo(tipo : string) : string{

    if(tipo = 'unirColor')
      return 'juego-unir-color';

    else if(tipo = 'asociarImagen')
      return 'juego-asociar-imagen';

     return 'juego-unir-color';

  }

}
