import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { PreguntaUnirPareja } from 'src/app/models/pregunta-unir-pareja';
import { PreguntaUnir } from 'src/app/models/pregunta-unir.model';
import { AudioService } from 'src/app/services/audio.service';
import { CamaraService } from 'src/app/services/camara.service';
import {openGaleriaModal} from "../../utils";

@Component({
  selector: 'app-preguntas-unir-pareja',
  templateUrl: './preguntas-unir-pareja.page.html',
  styleUrls: ['./preguntas-unir-pareja.page.scss'],
})
export class PreguntasUnirParejaPage implements OnInit {

  @Input() numEjer: number;
  @Input() tipo: string;
    @Input() ejercicios?: any[];

  public numPregunta = 1;
  public preguntaForm: FormGroup;
  public img_color = null;
  public img_asociada = null;
  public preguntas : any[] = [];
  public crearError = false;
  public musica = '';

  @ViewChild('preguntaFormRef', { static: false }) preguntaFormRef: NgForm;

  constructor(public audioService : AudioService, private modalCtr: ModalController, private photoService : CamaraService, private actionSheetCtrl: ActionSheetController, private navCtrl: NavController) { }

  ngOnInit() {
    this.preguntas = this.ejercicios.map(ejercicio => ({
      ...ejercicio,
      formGroup: new FormGroup({
        texto_1: new FormControl(ejercicio.texto_1, Validators.required),
        texto_2: new FormControl(ejercicio.texto_2, Validators.required)
      })
    }));
    console.log(this.numEjer);
    this.preguntaForm = new FormGroup({
      texto_color: new FormControl('', Validators.required),
      texto_img: new FormControl('', Validators.required)
    });

    if(this.tipo == 'tutorial'){
      this.numEjer = 0;
    }
  }

  getFoto(tipo: string, pregunta?: any) {
    openGaleriaModal(this.modalCtr).then((data) => {
      if (tipo == 'unirColor_color') {
        this.img_color = data.img;
      } else if (tipo == 'unirColor_img_asociada') {
        this.img_asociada = data.img;
      }else if(tipo === 'img1'){
        pregunta.img_1 = data.img;
      }else if (tipo === 'img2'){
        pregunta.img_2 = data.img;
      }
    });
  }

  get textoColor(): AbstractControl {
    return this.preguntaForm.get('texto_color');
  }

  get textoImg(): AbstractControl {
    return this.preguntaForm.get('texto_img');
  }

  async cerrar() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  async add(){

    this.preguntaFormRef.onSubmit(undefined);

    if(this.preguntaForm.valid && this.img_color != null && this.img_asociada != null){

      this.preguntas.push(new PreguntaUnirPareja( null, this.img_color, this.preguntaForm.value.texto_color, this.img_asociada, this.preguntaForm.value.texto_img, this.numEjer));
      console.log(this.preguntas);
      this.numPregunta++;

      this.img_color = null;
      this.img_asociada = null;
      this.preguntaForm.reset();
    }
  }

  async create(){
    if(this.preguntas.length != 0){
      await this.modalCtr.dismiss(this.preguntas);
    }

    else{
      this.crearError = true;
    }

  }

  async delete(index : number){
    this.preguntas.splice(index, 1);
    this.numPregunta --;
  }


  async selectAudio(){

    await this.audioService.seleccionarAudio().then(async (_) => {
      this.musica = this.audioService.returnpath;

    })
  }


  async presentActionSheet(dir : string) {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Elige una opción',
      buttons: [{
        text: 'Galería',
        handler: async () => {

          await  this.photoService.getGaleria().then(async (_) => {
            if(dir == 'unirColor_color'){
              this.img_color = await this.photoService.imgURL;
             }

             else if(dir == 'unirColor_img_asociada'){
               this.img_asociada = await this.photoService.imgURL;

             }
          });
        }

      }, {
        text: 'Cámara',
        handler: async () => {

        await this.photoService.getCamara().then(async (_) => {
          if(dir == 'unirColor_color'){
           this.img_color = await this.photoService.imgURL;
          }

          else if(dir == 'unirColor_img_asociada'){
            this.img_asociada = await this.photoService.imgURL;

          }
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
