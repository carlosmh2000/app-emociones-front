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

  constructor( private db : DatabaseService, private activatedRoute: ActivatedRoute) {

   }

  ngOnInit() {


    this.activatedRoute.paramMap.subscribe(params => {
      let juegoId = params.get('juegoId');
      console.log('juegoId: ' + juegoId);

      this.juegoService.getJuego(juegoId).subscribe(data => {
        this.nombreJuego = data.nombre;
        console.log('nombreJuego: ' + this.nombreJuego);
        this.portada = data.portada;
        console.log('portada: ' + this.portada);
      });
    });

  }

}
