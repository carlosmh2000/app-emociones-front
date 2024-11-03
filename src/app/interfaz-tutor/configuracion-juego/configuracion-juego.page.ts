import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Juego } from 'src/app/models/juego.model';
import { CamaraService } from 'src/app/services/camara.service';
import {JuegoService} from "../../services/juego.service";
import {JuegoUnir} from "../../models/juego-unir.model";
import {JuegoAsociar} from "../../models/juego-asociar.model";
import {PreguntaUnir} from "../../models/pregunta-unir.model";

@Component({
  selector: 'app-configuracion-juego',
  templateUrl: './configuracion-juego.page.html',
  styleUrls: ['./configuracion-juego.page.scss'],
})
export class ConfiguracionJuegoPage implements OnInit {

  private juegoService = inject(JuegoService);
  juego : any;
  juegoId : number;
  public foto : string;
  public nombre : string;
  public formulario;


  constructor(private toast: ToastController, private formBuilder: FormBuilder, private actionSheetCtrl: ActionSheetController, public camaraService: CamaraService, private activatedRoute: ActivatedRoute, private router: Router) { }

   ngOnInit() {

    this.activatedRoute.queryParamMap.subscribe( params => {
      let juegoId = params.get('juegoId');
      console.log(params);
      this.juegoService.getJuego(juegoId, params.get('tipo')).subscribe( data => {
        this.juego = new Juego(data.id, data.nombre, data.portada, data.tipo,
          data.instrucciones, data.tutorial, data.descrip_tutorial, data.efectos_sonido,
          data.sonidos, data.refPositivo, data.refNegativo, data.resultadoNum, data.resultadoPicto, data.imgRefPositivo,
          data.imgRefNegativo, data.cuestionarioFinal, data.cuestionarioFinalPregunta, data.opcionesCuestionarioFinal, data.ejercicios);

        this.juegoId = data.id;
        this.foto = data.portada;
        if(this.foto == null || this.foto == '')
          this.foto = "../../assets/sinFoto.png";
      });
    });

  }

  async editarJuego(){

    this.nombre = this.formulario.value.nombre;

      const juego = new Juego(this.juegoId, this.nombre, this.foto);

      this.juegoService.updateJuego(juego).subscribe(async _ => {
          //volvemos a la página inicial del tutor
          await this.router.navigate(['..']);
      });
  }
  async eliminarJuego(){

    await this.juegoService.deleteJuego(this.juegoId, this.juego.tipo).subscribe(async _ => {
        //volvemos a la página inicial del tutor
        await this.router.navigate(['./homepage-tutor']);
    });

  }

  async presentActionSheet() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Elige una opción',
      buttons: [{
        text: 'Galería',
        handler: async () => {

          await  this.camaraService.getGaleria().then(async (_) => {
            this.foto = await this.camaraService.imgURL;
            console.log(this.foto);
          });
        }

      }, {
        text: 'Cámara',
        handler: async () => {

        await this.camaraService.getCamara().then(async (_) => {
          this.foto = await this.camaraService.imgURL;
          console.log(this.foto);
        });

        }
      }, {
        text: 'Cancelar',
        role: 'cancel'
      }]
    });

    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();

  }

  protected readonly JuegoUnir = JuegoUnir;
}
