import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JuegoAsociar } from 'src/app/models/juego-asociar.model';
import { JuegoBuscarIntruso } from 'src/app/models/juego-buscar-intruso.model';
import { JuegoUnirPareja } from 'src/app/models/juego-unir-pareja.model';
import { JuegoUnir } from 'src/app/models/juego-unir.model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-juego-tipo',
  templateUrl: './juego-tipo.page.html',
  styleUrls: ['./juego-tipo.page.scss'],
})
export class JuegoTipoPage implements OnInit {

  public juegos : JuegoUnir[] = [];
  public juegosBuscarIntruso : JuegoBuscarIntruso[] = [];
  public juegosAsociar : JuegoAsociar[] = [];
  public juegosUnirPareja : JuegoUnirPareja[] = [];
  public tipoJuego;

  constructor( private db : DatabaseService, private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('tipojuego')){
        return;
      }

      const tipoJuego = paramMap.get('tipojuego');
      this.tipoJuego = tipoJuego;


      this.db.getDatabaseState().subscribe(rdy => {
        if (rdy) {
  
        if(this.tipoJuego == 'unirColor'){
          this.db.getJuegosUnirColor().subscribe(juegos => {
            this.juegos = juegos;
            console.log(this.juegos);
          })

        }

        else if(this.tipoJuego == 'asociarImagen'){
          this.db.getJuegosAsociar().subscribe(juegos => {
            this.juegosAsociar = juegos;
            console.log(this.juegosAsociar);
          })

        }

        if(this.tipoJuego == 'hacerPareja'){
          this.db.getJuegosUnirPareja().subscribe(juegos => {
            this.juegosUnirPareja = juegos;
            console.log(this.juegosUnirPareja);
          })

        }

        if(this.tipoJuego == 'buscarIntruso'){
          this.db.getJuegosBuscarIntruso().subscribe(juegos => {
            this.juegosBuscarIntruso = juegos;
            console.log(this.juegosBuscarIntruso);
          })

        }

        }
      });

    });
  }

}
