import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Alumno } from 'src/app/models/alumno.model';
import { Juego } from 'src/app/models/juego.model';
import { CamaraService } from 'src/app/services/camara.service';
import {AlumnoService} from "../../services/alumno.service";
import {JuegoService} from "../../services/juego.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  private alumnoService = inject(AlumnoService);
  private juegoService = inject(JuegoService);

  private router = inject(Router);

  public alumnos : Alumno[] = [];
  public alumno : Alumno;
  public juegos : Juego[] = [];
  public nombreAlumno : string;
  public profilePhoto : string;


  constructor(private screenOrientation : ScreenOrientation, public photoService: CamaraService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    //obtenermos el id del alumno de la ruta
    this.activatedRoute.paramMap.subscribe(params => {
      let alumnoId = params.get('alumnoId');

      //obtenemos el alumno de la base de datos
      this.alumnoService.getAlumno(alumnoId).subscribe(data => {
        this.nombreAlumno = data.nombre;
        this.profilePhoto = data.fotoPerfil;
        this.alumno = data;
      });
    });

    //obtenemos la lista de juegos de la base de datos
    this.juegoService.getJuegos('unirColor').subscribe(unirColor => {
      this.juegos = unirColor.items;
      this.juegoService.getJuegos('asociarImagen').subscribe(asociarImagen => {
        this.juegos = this.juegos.concat(asociarImagen.items);
        this.juegoService.getJuegos('unirFrase').subscribe(unirFrase => {
          this.juegos = this.juegos.concat(unirFrase.items);
          this.juegoService.getJuegos('elegirEmocion').subscribe(elegirEmocion => {
            this.juegos = this.juegos.concat(elegirEmocion.items);
            this.juegoService.getJuegos('hacerPareja').subscribe(hacerPareja => {
              this.juegos = this.juegos.concat(hacerPareja.items);
              this.juegoService.getJuegos('buscarIntruso').subscribe(buscarIntruso => {
                this.juegos = this.juegos.concat(buscarIntruso.items);
                console.log(buscarIntruso.items);
                console.log(this.juegos);
              });
            });
          });
        });
      });
    });
  }

  //Función para obtener la ruta del tipo de juego
jugarJuegoTipo(tipo: string, id?: number): void {
  if (tipo === 'unirColor') {
    this.router.navigate([`/login/alumno/${this.alumno.id}/juego-unir-color/${id}`]);
  } else if (tipo === 'asociarImagen') {
    this.router.navigate([`/login/alumno/${this.alumno.id}/juego-asociar-imagen/${id}`]);
  } else if (tipo === 'hacerPareja') {
    this.router.navigate([`/login/alumno/${this.alumno.id}/juego-unir-pareja/${id}`]);
  } else if (tipo === 'buscarIntruso') {
    this.router.navigate([`/login/alumno/${this.alumno.id}/juego-buscar-intruso/${id}`]);
  } else if (tipo === 'unirFrase') {
    this.router.navigate(['/juego-asociar-frase']);
  } else if (tipo === 'elegirEmocion') {
    this.router.navigate(['/juego-asociar-emocion']);
  } else {
    this.router.navigate(['/juego-unir-color']);
  }
}

}
