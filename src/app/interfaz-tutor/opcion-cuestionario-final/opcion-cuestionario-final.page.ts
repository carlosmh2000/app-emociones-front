import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { OpcionCuestionarioFinal } from 'src/app/models/opcion-cuestionario-final.model';
import { AudioService } from 'src/app/services/audio.service';
import { CamaraService } from 'src/app/services/camara.service';

@Component({
  selector: 'app-opcion-cuestionario-final',
  templateUrl: './opcion-cuestionario-final.page.html',
  styleUrls: ['./opcion-cuestionario-final.page.scss'],
})
export class OpcionCuestionarioFinalPage implements OnInit {

  @Input() numOpcion: number;
  public preguntaForm: FormGroup;
  public img = null;
  public opcion : OpcionCuestionarioFinal = null;
  public crearError = false;
  
  @ViewChild('preguntaFormRef', { static: false }) preguntaFormRef: NgForm;


  constructor(public audioService : AudioService, private modalCtr: ModalController, private photoService : CamaraService, private actionSheetCtrl: ActionSheetController, private navCtrl: NavController) { }
  ngOnInit() {
    this.preguntaForm = new FormGroup({
      texto: new FormControl('', Validators.required)
    });

  }

  get texto(): AbstractControl {
    return this.preguntaForm.get('texto');
  }


  async cerrar() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }


  async create(){
    this.preguntaFormRef.onSubmit(undefined);

    if(this.preguntaForm.valid && this.img != null ){
      let opcion = new OpcionCuestionarioFinal(null, this.img, this.preguntaForm.value.texto);
      await this.modalCtr.dismiss(opcion);
    }

    else{
      this.crearError = true;
    }

  }

    
  async presentActionSheet() {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Elige una opción',
      buttons: [{
        text: 'Galería',
        handler: async () => {
 
          await  this.photoService.getGaleria().then(async (_) => {
   
           
            this.img = await this.photoService.imgURL;
   
             
          });
        }
        
      }, {
        text: 'Cámara',
        handler: async () => {

        await this.photoService.getCamara().then(async (_) => {
          this.img = await this.photoService.imgURL;
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
