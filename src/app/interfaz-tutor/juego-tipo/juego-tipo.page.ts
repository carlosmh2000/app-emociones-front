import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { JuegoAsociar } from 'src/app/models/juego-asociar.model';
import { JuegoBuscarIntruso } from 'src/app/models/juego-buscar-intruso.model';
import { JuegoUnirPareja } from 'src/app/models/juego-unir-pareja.model';
import { JuegoUnir } from 'src/app/models/juego-unir.model';
import {JuegoService} from "../../services/juego.service";
import {JuegoElegirEmocion} from "../../models/juego-elegir-emocion.model";
import {JuegoAsociarFrase} from "../../models/juego-asociar-frase.model";
import {AlumnoService} from "../../services/alumno.service";

@Component({
  selector: 'app-juego-tipo',
  templateUrl: './juego-tipo.page.html',
  styleUrls: ['./juego-tipo.page.scss'],
})
export class JuegoTipoPage implements OnInit {
  juegoService = inject(JuegoService);
  alumnoService = inject(AlumnoService)
  public juegos : JuegoUnir[] = [];
  public juegosBuscarIntruso : JuegoBuscarIntruso[] = [];
  public juegosAsociar : JuegoAsociar[] = [];
  public juegosUnirPareja : JuegoUnirPareja[] = [];
  public juegosElegirEmocion : JuegoElegirEmocion[] = [];
  public juegosAsociarFrase : JuegoAsociarFrase[] = [];
  public tipoJuego;
  asignandoJuegos = false;
  idAlumno = ''

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('tipojuego')){
        return;
      }
      this.asignandoJuegos = this.router.url.includes('asignar-juego');
      this.idAlumno = paramMap.get('alumnoId');
      console.log(this.idAlumno);
      console.log(this.asignandoJuegos);
      const tipoJuego = paramMap.get('tipojuego');
      this.tipoJuego = tipoJuego;
      this.juegoService.getJuegos(this.tipoJuego).subscribe(juegos => {
        if(this.tipoJuego === 'unirColor') this.juegos = juegos.items;
        else if(this.tipoJuego === 'hacerPareja') this.juegosUnirPareja = juegos.items;
        else if(this.tipoJuego === 'asociarImagen') this.juegosAsociar = juegos.items;
        else if(this.tipoJuego === 'buscarIntruso') this.juegosBuscarIntruso = juegos.items;
        else if(this.tipoJuego === 'elegirEmocion') this.juegosElegirEmocion = juegos.items;
        else if(this.tipoJuego === 'unirFrase') this.juegosAsociarFrase = juegos.items;
        console.log(this.juegos);

      })
    });
  }

  asignarJuego(juegoId: number, tipoJuego: string){
    if(this.asignandoJuegos){
      this.alumnoService.asignarJuego(juegoId, tipoJuego, this.idAlumno).subscribe(() => {
        this.router.navigate(['/homepage-tutor/alumno/' + this.idAlumno]);
      });
    }
  }

}
