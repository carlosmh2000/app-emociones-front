import {Component, inject, OnInit} from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from "@angular/forms";
import { ActionSheetController, ToastController } from '@ionic/angular';
import { DatabaseService } from 'src/app/services/database.service';
import { CamaraService } from 'src/app/services/camara.service';
import { Router } from '@angular/router';
import {AlumnoService} from "../../services/alumno.service";

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.page.html',
  styleUrls: ['./crear-alumno.page.scss'],
})
export class CrearAlumnoPage implements OnInit {
  private alumnoService = inject(AlumnoService);
  public formulario;
  foto : string = '../../assets/sinFoto.png' ;



  constructor(private toast: ToastController, public router : Router, public camaraService : CamaraService, private db : DatabaseService, private actionSheetCtrl: ActionSheetController, private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
   })

  }


  async obtenerFoto() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Elige una opción',
      buttons: [{
        text: 'Galería',
        handler: async () => {

          await  this.camaraService.getGaleria().then(async (_) => {

            this.foto = await this.camaraService.imgURL;

          });
        }

      }, {
        text: 'Cámara',
        handler: async () => {

        await this.camaraService.getCamara().then(async (_) => {

          this.foto = await this.camaraService.imgURL;


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



  async enviarFormulario() {
    if (!this.formulario.valid) {

      let toast = await this.toast.create({
        message: 'Se debe de introducir todos los datos',
        duration: 3000
      });
      toast.present();

      return false;

    }

    else{
      return await this.crearAlumno(this.formulario);
    }

  }

  async crearAlumno(formulario) {

      //añadimos el alumno con esa personalización
        await this.alumnoService.addAlumno(formulario.value.nombre, this.foto).subscribe(async _ => {

          //volvemos a la página inicial del tutor
          await this.router.navigate(['./homepage-tutor']);
        });


  }

}
