import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Juego } from 'src/app/models/juego.model';
import { CamaraService } from 'src/app/services/camara.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-configuracion-juego',
  templateUrl: './configuracion-juego.page.html',
  styleUrls: ['./configuracion-juego.page.scss'],
})
export class ConfiguracionJuegoPage implements OnInit {

  public juego : Juego;
  public nombre;
  public id;
  public portada;

  constructor(private toast: ToastController, private db : DatabaseService, private formBuilder: FormBuilder, private actionSheetCtrl: ActionSheetController, public photoService: CamaraService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(async params => {
      let juegoId = params.get('juegoId');
 
      await this.db.getJuegoUnirColor(juegoId).then(async data => {

        this.juego = new Juego(data);
        this.nombre = data.nombre;
        this.id = data.id;
        

        this.portada = data.portada;
        if(this.portada == null || this.portada == '')
          this.portada = "../../assets/sinFoto.png";


      });
    });
  }

}
