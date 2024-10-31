import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Juego } from 'src/app/models/juego.model';
import {JuegoService} from "../../services/juego.service";

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit {
  juegoService = inject(JuegoService);
  router = inject(Router);

  public juegos : Juego[] = [];
  public nombreJuego;
  public juegoId
  public portada;
  public tipo;

  constructor(private activatedRoute: ActivatedRoute) {

   }

  ngOnInit() {


    this.activatedRoute.paramMap.subscribe(params => {
      this.juegoId = params.get('juegoId');
      let tipoJuego = params.get('tipojuego');
      console.log('juegoId: ' + this.juegoId);
      console.log('tipoJuego: ' + tipoJuego);

      this.juegoService.getJuego(this.juegoId, tipoJuego).subscribe(data => {
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

  redirectToConfig(): void {
    console.log('Redirecting to configuracion-juego');
    this.router.navigate([`/juegos/${this.tipo}/juego/${this.juegoId}/configuracion-juego`], {
      queryParams: {juegoId: this.juegoId, tipo: this.tipo}
    });
  }

    async eliminarJuego(){

    await this.juegoService.deleteJuego(this.juegoId, this.tipo).subscribe(async _ => {
        //volvemos a la vista de juegos
        await this.router.navigate(['./juegos/'+this.tipo]);
    });

  }
}
