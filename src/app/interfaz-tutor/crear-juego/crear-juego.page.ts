import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ActionSheetController, IonContent, IonSlides, NavController } from '@ionic/angular';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { CamaraService } from 'src/app/services/camara.service';
import { PreguntasUnirColorPage } from '../preguntas-unir-color/preguntas-unir-color.page';
import { AudioService } from 'src/app/services/audio.service';
import { OpcionCuestionarioFinal } from 'src/app/models/opcion-cuestionario-final.model';
import { OpcionCuestionarioFinalPage } from '../opcion-cuestionario-final/opcion-cuestionario-final.page';
import { PreguntaUnir } from 'src/app/models/pregunta-unir.model';
import {Juego} from "../../models/juego.model";
import {JuegoService} from "../../services/juego.service";
import {JuegoUnircolor} from "../../models/juego-unircolor.model";
import {JuegoUnir} from "../../models/juego-unir.model";


@Component({
  selector: 'app-crear-juego',
  templateUrl: './crear-juego.page.html',
  styleUrls: ['./crear-juego.page.scss'],
})
export class CrearJuegoPage implements OnInit {
  juegoService = inject(JuegoService);
  router = inject(Router);

  @Input()juego?: JuegoUnir;
  @Input()editando = false;

  tipoJuego : string;
  public slides: string[];
  public currentSlide: string;
  public isBeginning: boolean = true;
  public isEnd: boolean = false;
  public presentacionForm: FormGroup;
  public tutorialForm: FormGroup;
  public juegoForm: FormGroup;
  public sonidoForm: FormGroup;
  public resultForm: FormGroup;
  public imagePath: SafeResourceUrl;
  public ejercicios: PreguntaUnir[][] = [];
  public ejercicioTutorial : PreguntaUnir[] = [];
  public audioAcertar = '';
  public audioFallar = '../../assets/fallar.mp3';
  public audioTocar = '';
  public audioCompletar = '../../assets/completar.mp3';
  public sonidos : string[] = [];
  public imgRefPositivo : string = '../../assets/pictoAcertar.png';
  public imgRefNegativo : string = '../../assets/pictoFallar.png';
  public audioPlaying = new Audio();

  public numPreguntas = 1;
  public numElementos = 1;
  public visualizarTutorial = true;
  public refPositivo = true;
  public refNegativo = true;
  public efectosSonido = true;
  public resultNum = true;
  public resultPicto = false;
  public resultImg = false;
  public cuestionarioFinal = true;

  public nombreJuego : string = '';
  public portadaJuego: string = '';
  public tutorialDescrip: string;
  public juegoInstruc: string;
  public preguntaCuestionario : string = "¿Cómo te sientes?";
  public opcionesCuestionario : OpcionCuestionarioFinal[] = [];
  modalDataResponse: any;


  @ViewChild(IonContent, { static: true }) ionContent: IonContent;
  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  @ViewChild('presentacionFormRef', { static: false }) presentacionFormRef: NgForm;
  @ViewChild('tutorialFormRef', { static: false }) tutorialFormRef: NgForm;
  @ViewChild('juegoFormRef', { static: false }) juegoFormRef: NgForm;
  @ViewChild('sonidoFormRef', { static: false }) sonidoFormRef: NgForm;
  @ViewChild('resultFormRef', { static: false }) resultFormRef: NgForm;

  constructor(public audioService: AudioService, public photoService : CamaraService, private modalController: ModalController,  private activatedRoute : ActivatedRoute, private actionSheetCtrl: ActionSheetController, private navCtrl: NavController, private sanitizer: DomSanitizer) { }

  ngOnInit(){
    console.log(this.juego);

    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.tipoJuego = paramMap.get('tipo');
      this.portadaJuego = this.juego.portada ?? '../assets/sinFoto.png';
      this.ejercicios = this.juego.ejercicios ?? [];
      this.preguntaCuestionario = this.juego.cuestionarioFinalPregunta ?? '';
      this.opcionesCuestionario = this.juego.opcionesCuestionarioFinal ?? [];
      console.log(this.opcionesCuestionario);
      this.setupForm();
      this.buildSlides();
    });
  }


  async initModalEjercicio(tipo : string) {
    const modal = await this.modalController.create({
      component: PreguntasUnirColorPage,
      componentProps: {
        numEjer: (this.ejercicios.length + 1),
        tipo: tipo
      },
      cssClass: 'addEjercicio',
    }).then(async (elem)=>{
      await elem.present();
      await Promise.all([elem.onDidDismiss()]).then(async (data) => {
        if (data != null) {
          if(tipo == 'ejercicios'){
            this.ejercicios.push(data[0].data);
            console.log(data[0].data);
            console.log(this.ejercicios);
          }

          else if(tipo == 'tutorial'){
            this.ejercicioTutorial = data[0].data;
            console.log(data[0].data);
            console.log(this.ejercicioTutorial);
          }

       }
     });
    })
  }

  async initModalOpcionCuestionario() {
    const modal = await this.modalController.create({
      component: OpcionCuestionarioFinalPage,
      componentProps: {
        numOpcion: (this.opcionesCuestionario.length + 1),
      },
      cssClass: 'addEjercicio',
    }).then(async (elem)=>{
      await elem.present();
      await Promise.all([elem.onDidDismiss()]).then(async (data) => {
        if (data != null) {

          this.opcionesCuestionario.push(data[0].data);
          console.log(data[0].data);
          console.log(this.opcionesCuestionario);
          console.log(this.opcionesCuestionario.length);
       }
     });
    })
  }

  async deleteEjercicioTutorial(){
    this.ejercicioTutorial.length = 0;
  }

  async deleteOpcionCuestionario(index : number){

    let aux : OpcionCuestionarioFinal[] = [];
    for(let i = 0; i < this.opcionesCuestionario.length; i++){
      if(i != index)
        aux.push(this.opcionesCuestionario[i]);
    }

    this.opcionesCuestionario = aux;

  }

  async deleteEjercicio(index : number){

    let aux : PreguntaUnir[][] = [];
    for(let i = 0; i < this.ejercicios.length; i++){
      if(i != index)
        aux.push(this.ejercicios[i]);
    }

    this.ejercicios = aux;
  }

  toArray(answers: object) {
    return Object.keys(answers).map(key => ({
      key,
      ...answers[key]
    }))
  }

  buildSlides() {
    const slides = ['Presentacion', 'Tutorial', 'Juego', 'Refuerzos', 'Resultados'];
    this.currentSlide = slides[0];
    this.slides = slides;
  }

  getJuegoParamValueOrDefault(param: any, defaultValue: any): any {
    return param ? param : defaultValue;
  }


  setupForm() {
    this.presentacionForm = new FormGroup({
      nombre: new FormControl(this.getJuegoParamValueOrDefault(this.juego.nombre, ''), Validators.required),
    });

    this.tutorialForm = new FormGroup({
      descripcion: new FormControl(this.getJuegoParamValueOrDefault(this.juego.descrip_tutorial, ''), Validators.required),
    });

    this.juegoForm = new FormGroup({
      instrucciones: new FormControl(this.getJuegoParamValueOrDefault(this.juego.instrucciones, ''), Validators.required),
      ref_positivo: new FormControl(this.getJuegoParamValueOrDefault(this.juego.refPositivo, true), Validators.required),
      ref_negativo: new FormControl(this.getJuegoParamValueOrDefault(this.juego.refNegativo, true), Validators.required),
    });

    this.sonidoForm = new FormGroup({
    });

    this.resultForm = new FormGroup({
      pregunta: new FormControl(this.getJuegoParamValueOrDefault(this.juego.cuestionarioFinalPregunta, ''), Validators.required),
    });

  }

  public increment (elemento) {

    if(elemento == 'numPreguntas')
      this.numPreguntas++;

    else if(elemento == 'numElementos')
      this.numElementos++;
  }

  public decrement (elemento) {
    if(elemento == 'numPreguntas' && this.numPreguntas > 1){
      this.numPreguntas--;
    }

    else if(elemento == 'numElementos' && this.numElementos > 1){
      this.numElementos--;
    }

  }

  public slidesOpts = {
    allowTouchMove: false,
    autoHeight: true,
  };

  onSlidesDidChange() {
    this.ionContent.scrollToTop();
  }

  async onSlidesChanged() {
    const index = await this.ionSlides.getActiveIndex();
    this.currentSlide = this.slides[index];
    this.isBeginning = await this.ionSlides.isBeginning();
    this.isEnd = await this.ionSlides.isEnd();
  }

  get presentacionNombre(): AbstractControl {
    return this.presentacionForm.get('nombre');
  }


  get tutorialDescripcion(): AbstractControl {
    return this.tutorialForm.get('descripcion');
  }

  get juegoInstrucciones(): AbstractControl {
    return this.juegoForm.get('instrucciones');
  }

  get resultadosPregunta(): AbstractControl {
    return this.resultForm.get('pregunta');
  }



  onSubmit() {
    const juego = new JuegoUnircolor(undefined, this.nombreJuego, this.portadaJuego, this.tipoJuego, this.juegoInstruc,
      this.visualizarTutorial, this.tutorialDescrip, this.efectosSonido, this.sonidos, this.refPositivo, this.refNegativo,
      this.resultNum, this.resultPicto, this.imgRefPositivo, this.imgRefNegativo, this.cuestionarioFinal, this.preguntaCuestionario, this.opcionesCuestionario, [], this.ejercicios);
    console.log(this.sonidos);
    console.log(this.opcionesCuestionario);
    if (!this.editando){
      this.juegoService.addJuegoUnircolor(juego).subscribe(juego =>{
          console.log(juego);
          this.router.navigate(['/juegos/unirColor'])
        }
      );
    }else {
      juego.id = this.juego.id;
      juego.tipo = this.juego.tipo;
      this.juegoService.updateJuego(juego).subscribe(juego =>{
        console.log(juego);
        this.router.navigate(['/juegos/unirColor']);
      });
    }
  }

  onBackButtonTouched() {
    this.ionSlides.slidePrev();
    this.ionContent.scrollToTop();
  }

  onNextButtonTouched() {

    if (this.currentSlide === 'Presentacion') {

      this.presentacionFormRef.onSubmit(undefined);
      console.log('presentacion válida: ' + this.presentacionForm.valid);

      if (this.presentacionForm.valid) {
        console.log( 'Presentacionform nombre::.::. ' + this.presentacionForm.value.nombre);
        this.nombreJuego = this.presentacionForm.value.nombre;

        console.log(this.nombreJuego);
        console.log(this.portadaJuego);

        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

      } else if (this.currentSlide === 'Tutorial' ) {

      this.tutorialFormRef.onSubmit(undefined);

      if (this.tutorialForm.valid || !this.visualizarTutorial) {

        this.tutorialDescrip = this.tutorialForm.value.descripcion;

        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

    } else if (this.currentSlide === 'Refuerzos' && this.efectosSonido) {
      if (this.juegoForm.valid) {

        this.juegoInstruc = this.juegoForm.value.instrucciones;

        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();
      }

      this.sonidoFormRef.onSubmit(undefined);

      if( this.audioFallar.length != 0){
        this.sonidos.push(this.audioFallar);
      } else{
        this.sonidos.push('../../assets/fallar.mp3');
      }

      if( this.audioCompletar.length != 0){
        this.sonidos.push(this.audioCompletar);
      } else{
        this.sonidos.push('../../assets/completar.mp3');
      }

        this.ionSlides.slideNext();
        this.ionContent.scrollToTop();



    } else if (this.currentSlide === 'Resultados' ) {

      this.resultFormRef.onSubmit(undefined);


      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();


    } else {

      this.ionSlides.slideNext();
      this.ionContent.scrollToTop();
    }
  }

  loadSoundFileFromDevice = (event, type) => {
    const file = event.target.files[0];
    if (!event.target.files[0]) return;
    if (!file.type.match('audio')) return;


    let blobReader = new FileReader();
    blobReader.readAsArrayBuffer(file);
    blobReader.onload = () => {
      let blob: Blob = new Blob([new Uint8Array((blobReader.result as ArrayBuffer))]);
      let blobURL: string = URL.createObjectURL(blob);
      if(type == 'acertar'){
        this.audioAcertar = blobURL;
        console.log('acertar: ' + this.audioAcertar);

      }
    };

  }


  async selectAudio(type : string){

    await this.audioService.seleccionarAudio().then(async (_) => {

      if(type == 'acertar'){
        this.audioAcertar = this.audioService.returnpath;
      }

      else if(type == 'fallar'){
        this.audioFallar = this.audioService.returnpath;
      }

      else if(type == 'tocar'){
        this.audioTocar = this.audioService.returnpath;
      }

      else if(type == 'completar'){
        this.audioCompletar = this.audioService.returnpath;
      }
    })

  }

  async playAudio(sonido : string){

    if(this.audioPlaying.src != sonido){
      console.log('sonido.....' + this.audioFallar);
      console.log('this.audioPlaying.src.....' + this.audioPlaying.src);
      this.audioPlaying.src = sonido;
      this.audioPlaying.load();
      await this.audioPlaying.play().then(async _ => {
            console.log('PLAYYYYINGGG');
      });
    }

    else{
      await this.audioPlaying.pause();
    }



  }

  async presentActionSheet(tipo : string) {

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Elige una opción',
      buttons: [{
        text: 'Galería',
        handler: async () => {

          await  this.photoService.getGaleria().then(async (_) => {
            if(tipo == 'portada')
              this.portadaJuego = await this.photoService.imgURL;

            else if(tipo == 'imgRefNegativo')
              this.imgRefNegativo = await this.photoService.imgURL;

            else if(tipo == 'imgRefPositivo')
              this.imgRefPositivo = await this.photoService.imgURL;


          });
        }

      }, {
        text: 'Cámara',
        handler: async () => {

        await this.photoService.getCamara().then(async (_) => {

          if(tipo == 'portada')
            this.portadaJuego = await this.photoService.imgURL;

          else if(tipo == 'imgRefNegativo')
            this.imgRefNegativo = await this.photoService.imgURL;

          else if(tipo == 'imgRefPositivo')
            this.imgRefPositivo = await this.photoService.imgURL;


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
