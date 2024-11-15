import {
  Component,
  OnInit,
  AfterContentChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  HostListener,
  inject
} from '@angular/core';
import { ActionSheetController, IonContent, IonSlides, MenuController, NavController, Platform } from '@ionic/angular';
import { JuegoBuscarIntruso } from 'src/app/models/juego-buscar-intruso.model';
import { Juego } from 'src/app/models/juego.model';
import { PreguntaBuscarIntruso } from 'src/app/models/pregunta-buscar-intruso.model';
import {JuegoService} from "../../../services/juego.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-juego-buscar-intruso',
  templateUrl: './juego-buscar-intruso.page.html',
  styleUrls: ['./juego-buscar-intruso.page.scss'],
})
export class JuegoBuscarIntrusoPage implements OnInit  {
  juegoService = inject(JuegoService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  alumnoId ?: string;
  ejercicioTutorial : PreguntaBuscarIntruso[] = [];
  ejercicios : PreguntaBuscarIntruso[][] = [];
  seleccionado1 = null;
  seleccionado2 = null;
  seleccionadoClase1 = 'botonImagen';
  seleccionadoClase2 = 'botonImagen';
  width;
  height;
  claseBoton = 'botonImagen';

  encontrado = false;
  isFallo = false;
  isCorrecto = false;
  unidos : string[] = [];
  esRepetido = false;
  todosUnidosTutorial = false;
  numEjercicios = 0;
  currentEj = [];
  currentEjNum = 1;
  tutorial = true;
  numErrores = 0;
  numAciertos = 0;
  resultados : Resultado[] = [];
  seleccionadoFinal = null;
  terminarVentana = false;
  audioAcertar = new Audio();
  intrusoId = null;

  audioFallar = new Audio();
  audioCompletar = new Audio();
  audioTocar = new Audio();


  /*Configuración del usu*/
  preguntaFinal = '¿Cómo te sientes?'
  preguntasFinal = [{id: 1, img:'../../assets/feliz.png', texto:'Feliz'}, {id: 2, img:'../../assets/triste.png', texto:'Triste'}];
  texto = true;
  picto = true;
  mostrarResultados = true;
  resultadosPositivos = true;
  resultadosNegativos = true;


  public slides: string[];
  public currentSlide: string;
  public isBeginning: boolean = true;
  public isEnd: boolean = false;

juego?: JuegoBuscarIntruso;
juego2 : JuegoBuscarIntruso = new JuegoBuscarIntruso(1, 'Une el color', '../../assets/portadaJuegoUnirColor', 'UnirColor',
  'Seleccionar la emoción adecuada para cada color', true, 'Seleccionar la emoción adecuada para cada color. Pruébalo en la izquierda', true,
  ['../../assets/sonidoAcertar.mp3', '../../assets/sonidoFallar.mp3', '../../assets/sonidoTocar.mp3', '../../assets/sonidoCompletar.mp3'],
  true, true, true, true, '../../assets/pictoAcertar.png', '../../assets/pictoFallar.png', true, '¿Cómo te sientes?', [],
  [new PreguntaBuscarIntruso(1, '../../assets/enfadado.png','Enfadado', true, 0),
  new PreguntaBuscarIntruso(2, '../../assets/triste.png','Triste', false, 0),
  new PreguntaBuscarIntruso(3, '../../assets/triste.png','Triste', false, 0),
  new PreguntaBuscarIntruso(4, '../../assets/triste.png','Triste', false, 0),
  ],

[[new PreguntaBuscarIntruso(5, '../../assets/triste.png','Triste', false, 1),
  new PreguntaBuscarIntruso(6, '../../assets/triste.png','Triste', false, 1),
  new PreguntaBuscarIntruso(7, '../../assets/triste.png','Triste', false, 1),
  new PreguntaBuscarIntruso(8, '../../assets/feliz.png','Feliz', true, 1),
  new PreguntaBuscarIntruso(9, '../../assets/triste.png','Triste', false, 1),
  new PreguntaBuscarIntruso(10, '../../assets/triste.png','Triste', false, 1),
],

[new PreguntaBuscarIntruso(11, '../../assets/triste.png','Triste', false, 2),
  new PreguntaBuscarIntruso(12, '../../assets/triste.png','Triste', false, 2),
  new PreguntaBuscarIntruso(13, '../../assets/triste.png','Triste', false, 2),
  new PreguntaBuscarIntruso(14, '../../assets/feliz.png','Feliz', true, 2),
  new PreguntaBuscarIntruso(15, '../../assets/triste.png','Triste', false, 2),
  new PreguntaBuscarIntruso(16, '../../assets/triste.png','Triste', false, 2),
],
]);


@ViewChild(IonContent, { static: true }) ionContent: IonContent;
@ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;

  constructor( private ptl : Platform, private cd: ChangeDetectorRef, private menu: MenuController) {
   }

ngOnInit() {
  this.activatedRoute.paramMap.subscribe(params => {
    let juegoId = params.get('juegoId');
    this.alumnoId = params.get('alumnoId');
    console.log('Fetching game data for juegoId:', juegoId);
    this.juegoService.getJuegoBuscarIntruso(juegoId).subscribe(data => {
      console.log('Game data fetched:', data);
      this.juego = new JuegoBuscarIntruso(data.id, data.nombre, data.portada, data.tipo,
        data.instrucciones, data.tutorial, data.descrip_tutorial, data.efectos_sonido,
        data.sonidos, data.refPositivo, data.refNegativo, data.resultadoNum, data.resultadoPicto, data.imgRefPositivo,
        data.imgRefNegativo, data.cuestionarioFinal, data.cuestionarioFinalPregunta, data.opcionesCuestionarioFinal,
        data.pregunta_tutorial, data.ejercicios);

      this.buildSlides();
      console.log(this.slides);
      console.log(this.currentSlide);
      this.width = this.ptl.width;
      this.height = this.ptl.height;

      this.audioAcertar.src = '../../assets/acertar.mp3';
      this.audioFallar.src = '../../assets/fallar.mp3';
      this.audioCompletar.src = '../../assets/completar.mp3';
      this.audioTocar.src = '../../assets/tocar.mp3';

      this.audioAcertar.load();
      this.audioFallar.load();
      this.audioCompletar.load();
      this.audioTocar.load();

      this.audioFallar.volume -= 0.4;
      this.audioCompletar.volume -= 0.4;
      this.audioTocar.volume -= 0.4;

      this.numEjercicios = this.juego.ejercicios.length;

      // Assign the first exercise to ejercicioTutorial
      this.ejercicioTutorial = this.juego.ejercicios[0].map(ejercicio => ({
        id: ejercicio.id,
        img: ejercicio.img,
        texto: ejercicio.texto,
        intruso: ejercicio.intruso,
        numEjer: ejercicio.numEjer,
      }));

      // Assign the remaining exercises to ejercicios
      for (let i = 1; i < this.juego.ejercicios.length; i++) {
        let aux = [];
        for (let j = 0; j < this.juego.ejercicios[i].length; j++) {
          aux.push({
            id: this.juego.ejercicios[i][j].id,
            img: this.juego.ejercicios[i][j].img,
            texto: this.juego.ejercicios[i][j].texto,
            intruso: this.juego.ejercicios[i][j].intruso,
            numEjer: this.juego.ejercicios[i][j].numEjer,
          });
        }
        console.log(this.juego.ejercicios[i].length);
        this.ejercicios.push(aux);
      }

      console.log(this.ejercicios);
      console.log(this.ejercicios.length);
    }, error => {
      console.error('Error fetching game data:', error);
    });
  });
}
  @HostListener('window:resize', ['$event'])
  private onResize(event){
    const width = event.target.innerWidth;
    const height = event.target.innerHeight;
    console.log('width: ' + width);
    console.log('height: '+ height);
    this.botonSize(width, height);
  }



  botonSize(width, height){

    this.claseBoton = 'botonImagen';

    if(height < 1000 || width < 1200){
      this.claseBoton = 'botonImagenSmaller';
    }

  }

  public slidesOpts = {
    allowTouchMove: false,
    //autoHeight: true,
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

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  getClaseOrganImg(size : number){
    let clase = 'elementos';

    if(size == 2)
      clase = 'elementos2';

    else if(size == 6)
      clase = 'elementos6';

    else if(size == 8)
      clase = 'elementos8';

    return clase;

  }



  buildSlides() {
    let slides = ['Tutorial'];

    for(let i = 0; i < this.juego.ejercicios.length; i++){
      slides.push('Ejercicio_' + (i+1).toString());
    }

    slides.push('Final');
    this.currentSlide = slides[0];
    console.log('currentSlide: ' + this.currentSlide);
    this.slides = slides;
    console.log('slides: ' + this.slides);
  }

  terminar(){
    this.resultados.push({numErrores: this.numErrores, numAciertos: this.numAciertos, numEjer: this.currentEjNum});
    this.currentSlide = 'Final';
    this.terminarVentana = false;
  }

  botonTerminar(){
    this.terminarVentana = !this.terminarVentana;
  }

  onBackButtonTouched() {

    if(this.currentSlide === 'Final'){
      this.currentSlide = ('Ejercicio_' + (this.currentEjNum).toString());
    }
    else if (this.currentSlide === 'Ejercicio_1'){
      this.currentSlide = 'Tutorial';
    }
    else{
      this.currentEjNum--;
      this.currentEj = this.ejercicios[this.currentEjNum-1];
      this.currentSlide == ('Ejercicio_' + (this.currentEjNum).toString());
      this.resetJuego();
      this.currentEj.map(elem =>{
        this.unidos.push((elem.id + '+' + elem.tipo));
      });

    }
    this.ionContent.scrollToTop();
  }

  onNextButtonTouched() {

    console.log(this.currentSlide);
    if (this.currentSlide === 'Tutorial') {

        //this.ionSlides.slideNext();
        this.currentEj = this.ejercicios[0];
        this.currentSlide = 'Ejercicio_1';
        console.log("this.ejercicios[0] " + this.ejercicios[0]);
        console.log("thisCurrent " + this.currentEj);
        //this.ionContent.scrollToTop();
        this.resetJuego();
        console.log(this.currentSlide);
        this.tutorial = false;
    }

    else if(this.currentSlide === 'Final') {
      //route to inicio
      this.router.navigate(['/login/alumno/'+this.alumnoId]);


    }

    else if(this.currentSlide === 'Resultados') {
      this.currentSlide = 'Final';

    }

    else {
      console.log("elseeeee");
      let i = 0;
      let slide = false;
      console.log('Number: ' + Number(this.currentSlide.split('_')[1]));

      while(!slide && i < this.juego.ejercicios.length){

        if (this.currentSlide === ('Ejercicio_' + (i+1).toString())) {
          console.log('this.todosUnidosTutorial: ' + this.todosUnidosTutorial);

         //if(this.todosUnidosTutorial){

          this.resultados.push({numErrores: this.numErrores, numAciertos: this.numAciertos, numEjer: this.currentEjNum});
          if(this.currentEjNum != this.ejercicios.length){
              this.currentEjNum ++;
              this.currentEj = this.ejercicios[this.currentEjNum-1];
              this.currentSlide = ('Ejercicio_' + (this.currentEjNum).toString());

          }
          else if(this.mostrarResultados){
              this.currentSlide = 'Resultados';
          }

          else{
            this.currentSlide = 'Final';
          }


            //this.ionSlides.slideNext();
            //this.ionContent.scrollToTop();
            this.resetJuego();

            slide = true;
            console.log(this.currentSlide);
            console.log(this.resultados);
          //}
        }
        i++;
      }
    }
  }


  seleccionar(id: number){

    if(!this.encontrado){

      if(this.esRepetido)
      this.esRepetido = false;

      if(this.isFallo)
        this.isFallo = false;

      if(this.isCorrecto)
        this.isCorrecto = false;

      if(this.seleccionado1 == id)
        this.seleccionado1 = null;

      else
        this.seleccionado1 = id;

    }

    console.log('selecccionado111: ' + this.seleccionado1);

  }

  seleccionarFinal(id: string){


    if(this.seleccionadoFinal == id )
      this.seleccionadoFinal = null;

    else{
      this.seleccionadoFinal = id;
    }
  }


  isSeleccionado(id : number){

    let clase = 'botonImagen';
    this.seleccionadoClase1 = 'botonImagen';

    if(this.seleccionadoFinal == id){
      clase = 'botonImagenSelected';
      this.audioCompletar.play();

    }

    if (!this.encontrado && this.seleccionado1 == id){
      this.resultado();
      if(this.encontrado){
        clase = 'botonImagenSelectedCorrecto';
        this.seleccionadoClase1 = 'botonImagenSelectedCorrecto';
      }

      else{
        clase = 'botonImagenSelectedFallo';
        this.seleccionadoClase1 = 'botonImagenSelectedFallo';

      }

    }

    else if (this.encontrado && this.intrusoId == id){
      clase = 'botonImagenSelectedCorrecto';
      this.seleccionadoClase1 = 'botonImagenSelectedCorrecto';
    }

    return clase;


  }

  estaUnido(id : number){
    let intruso = false;

    for(let i = 0; i < this.ejercicios.length; i++){
      for(let j = 0; j < this.ejercicios[i].length; j++){
        if(this.ejercicios[i][j].id == id){
          if(this.ejercicios[i][j].intruso){
            intruso = true;
            this.intrusoId = id;

          }

        }
      }
    }

    for(let i = 0; i < this.ejercicioTutorial.length; i++){
      if(this.ejercicioTutorial[i].id == id){
        if(this.ejercicioTutorial[i].intruso){
          intruso = true;
          this.intrusoId = id;
        }

      }
    }

    return intruso;
  }


  repetirEjTutorial(){
    this.esRepetido = true;
    this.resetJuego();

  }

  resetJuego(){
    this.encontrado = false;
    this.intrusoId = null;
    this.seleccionado1 = null;
    this.seleccionado2 = null;
    this.isCorrecto = false;
    this.todosUnidosTutorial = false;
    this.numErrores = 0;
    this.numAciertos = 0;
  }

  getNumAciertosTotal(){
    let num = 0;
    this.resultados.map(res => {
      num += res.numAciertos;
    });

    return num;

  }

  getNumErroresTotal(){
    let num = 0;
    this.resultados.map(res => {
      num += res.numErrores;
    });

    return num;

  }

  fade(){
    if(this.audioAcertar.volume > 0){
      this.audioAcertar.volume -= 0.7;
        setTimeout(this.fade, 1);
    }else{
      this.audioAcertar.pause();
    }
}

  resultado(){


    if(this.estaUnido(this.seleccionado1)){
      this.encontrado = true;
      this.numAciertos ++;
      this.seleccionado1 = null;

      this.audioAcertar.play();

    }

    else{
      if( this.seleccionadoClase1 != 'botonImagenSelectedFallo' )
        this.numErrores++;

      this.audioFallar.play();
      this.isFallo = true;

    }

  }


  shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }


  resultadoPicto(){
    let picto = '../../assets/pictoAcertar.png';

    if(this.numErrores < 5)
      picto = '../../assets/pictoFallar.png';

    return picto;
  }

}

export interface Conjunto{
  id: number;
  img: string;
  texto: string;
  musica: string;
  tipo: string;
}

export interface Resultado{
  numErrores: number;
  numAciertos: number;
  numEjer : number;
}
