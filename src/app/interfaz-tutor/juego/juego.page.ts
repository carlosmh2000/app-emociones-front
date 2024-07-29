import {Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Juego } from 'src/app/models/juego.model';
import { DatabaseService } from 'src/app/services/database.service';
import {JuegoService} from "../../services/juego.service";

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit {
  juegoService = inject(JuegoService);

  public juegos : Juego[] = [];
  public nombreJuego;
  public portada;
  public tipo;

  constructor( private db : DatabaseService, private activatedRoute: ActivatedRoute) {

   }

  ngOnInit() {


    this.activatedRoute.paramMap.subscribe(params => {
      let juegoId = params.get('juegoId');
      let tipoJuego = params.get('tipojuego');
      console.log('juegoId: ' + juegoId);
      console.log('tipoJuego: ' + tipoJuego);

      this.juegoService.getJuego(juegoId, tipoJuego).subscribe(data => {
        this.nombreJuego = data.nombre;
        console.log('nombreJuego: ' + this.nombreJuego);
        this.portada = data.portada;
        this.tipo = tipoJuego;
        console.log(data);
        console.log('portada: ' + this.portada);
        console.log('tipo: ' + this.tipo);
      });
    });

  }

}
