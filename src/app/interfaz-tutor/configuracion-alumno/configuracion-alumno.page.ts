import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Alumno } from 'src/app/models/alumno.model';
import { CamaraService } from 'src/app/services/camara.service';
import { Validators } from '@angular/forms';
import {AlumnoService} from "../../services/alumno.service";

@Component({
  selector: 'app-configuracion-alumno',
  templateUrl: './configuracion-alumno.page.html',
  styleUrls: ['./configuracion-alumno.page.scss'],
})
export class ConfiguracionAlumnoPage implements OnInit {
  private alumnoService = inject(AlumnoService);
  alumno : Alumno;
  alumnoId : number;
  public foto : string;
  public nombre : string;
  public formulario;


  constructor(private toast: ToastController, private formBuilder: FormBuilder, private actionSheetCtrl: ActionSheetController, public camaraService: CamaraService, private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit() {

    this.activatedRoute.paramMap.subscribe(async params => {
      let alumnoId = params.get('alumnoId');

      await this.alumnoService.getAlumno(alumnoId).subscribe(async data => {

        this.alumno = new Alumno(data.id, data.nombre, data.fotoPerfil);
        this.nombre = data.nombre;
        this.alumnoId = data.id;

        this.foto = data.fotoPerfil;
        if(this.foto == null || this.foto == '')
          this.foto = "../../assets/sinFoto.png";


      });
    });

    this.formulario = this.formBuilder.group({
      nombre: [this.nombre, [Validators.required, Validators.minLength(2)]]
   })


  }


  async enviarFormulario(){
    if (!this.formulario.valid) {

      let toast = await this.toast.create({
        message: 'Se debe de introducir todos los datos',
        duration: 3000
      });
      toast.present();

      return false;

    }

    else{
      this.editarAlumno();
      return true;
    }


  }

   editarAlumno(){

    this.nombre = this.formulario.value.nombre;

      const alumno = new Alumno(this.alumnoId, this.nombre, this.camaraService.imgURL);
     console.log(alumno);

     this.alumnoService.updateAlumno(alumno).subscribe( _ => {
          //volvemos a la página inicial del tutor
          this.router.navigate(['./homepage-tutor']);
      });
  }
  async eliminarAlumno(){

    await this.alumnoService.deleteAlumno(this.alumnoId).subscribe(async _ => {
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
            this.foto = this.camaraService.imgURL;
            console.log(this.camaraService.imageData);
          });
        }

      }, {
        text: 'Cámara',
        handler: async () => {

        await this.camaraService.getCamara().then(async (_) => {
          this.foto = this.camaraService.imgURL;
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


}
