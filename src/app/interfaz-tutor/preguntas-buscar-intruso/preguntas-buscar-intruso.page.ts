import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { PreguntaBuscarIntruso } from 'src/app/models/pregunta-buscar-intruso.model';
import { PreguntaUnir } from 'src/app/models/pregunta-unir.model';
import { AudioService } from 'src/app/services/audio.service';
import { CamaraService } from 'src/app/services/camara.service';
import {openGaleriaModal} from "../../utils";

@Component({
  selector: 'app-preguntas-buscar-intruso',
  templateUrl: './preguntas-buscar-intruso.page.html',
  styleUrls: ['./preguntas-buscar-intruso.page.scss'],
})
export class PreguntasBuscarIntrusoPage implements OnInit {

  @Input() numEjer: number;
  @Input() tipo: string;
      @Input() ejercicios?: any[];

  public numPregunta = 1;
  public preguntaForm: FormGroup;
  public preguntas : any[] = [];
  public crearError = false;
  public imgAsociada = true;
  public imgGrupo = false;
  public img = null;
  public tipoImg = '';
  public intruso = false;

  @ViewChild('preguntaFormRef', { static: false }) preguntaFormRef: NgForm;

  constructor(public audioService : AudioService, private modalCtr: ModalController, private photoService : CamaraService, private actionSheetCtrl: ActionSheetController, private navCtrl: NavController) { }

  ngOnInit() {
        this.preguntas = this.ejercicios.map(ejercicio => ({
      ...ejercicio,
      formGroup: new FormGroup({
        texto: new FormControl('', Validators.required)

      })
    }));
    console.log(this.numEjer);
    this.preguntaForm = new FormGroup({
      texto: new FormControl('', Validators.required)
    });

    if(this.tipo == 'tutorial'){
      this.numEjer = 0;
    }
  }

  get texto(): AbstractControl {
    return this.preguntaForm.get('texto');
  }


  async cerrar() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  async add(){

    this.preguntaFormRef.onSubmit(undefined);

    if(this.preguntaForm.valid && this.img != null){

      this.preguntas.push(new PreguntaBuscarIntruso( null, this.img, this.preguntaForm.value.texto, this.intruso, this.numEjer));
      console.log(this.preguntas);
      this.numPregunta++;

      this.img = null;
      this.tipoImg = null;
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

  getFoto(tipo: string, pregunta?: any) {
    openGaleriaModal(this.modalCtr).then((data) => {
      if(tipo == 'img'){

        this.img = data.img;
      }else if (tipo === 'img2'){
        pregunta.img = data.img;
      }
    });
  }

  async presentActionSheet(dir : string) {

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
