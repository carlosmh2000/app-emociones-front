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
import {ActivatedRoute, Router} from '@angular/router';
import { ActionSheetController, IonContent, IonSlides, MenuController, NavController, Platform } from '@ionic/angular';
import { JuegoUnir } from 'src/app/models/juego-unir.model';
import { Juego } from 'src/app/models/juego.model';
import { PreguntaUnir } from 'src/app/models/pregunta-unir.model';
import {JuegoService} from "../../../services/juego.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-juego-unir-pareja',
  templateUrl: './juego-unir-pareja.page.html',
  styleUrls: ['./juego-unir-pareja.page.scss'],
})
export class JuegoUnirParejaPage implements OnInit {

  private juegoService = inject(JuegoService);
  private router = inject(Router)
  ejercicioTutorial : Conjunto[] = [];
  ejercicios : Conjunto[][] = [];
  seleccionado1 = null;
  seleccionado2 = null;
  seleccionadoClase1 = 'botonImagen';
  seleccionadoClase2 = 'botonImagen';
  width;
  height;
  claseBoton = 'botonImagen';

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
  musicaSeleccionada = '';

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
  alumnoId ?: string;
  public juego?: JuegoUnir;

  public slides: string[];
  public currentSlide: string;
  public isBeginning: boolean = true;
  public isEnd: boolean = false;


  juego2 : JuegoUnir = new JuegoUnir(1, 'Une el color', '../../assets/portadaJuegoUnirColor', 'UnirColor',
  'Seleccionar la emoción adecuada para cada color', true, 'Seleccionar la emoción adecuada para cada color. Pruébalo en la izquierda', true,
  ['../../assets/sonidoAcertar.mp3', '../../assets/sonidoFallar.mp3', '../../assets/sonidoTocar.mp3', '../../assets/sonidoCompletar.mp3'],
  true, true, true, true, '../../assets/pictoAcertar.png', '../../assets/pictoFallar.png', true, '¿Cómo te sientes?', [],
  [
    new PreguntaUnir( 1, '../../assets/gris.png', 'Gris',  '../../assets/asustado.png', 'Asustado', '../../assets/musicaAsustado.mp3',  0),
  new PreguntaUnir( 2, '../../assets/azul.png', 'Azul',  '../../assets/triste.png',  'Triste', '../../assets/musicaTriste.mp3',  0),
  new PreguntaUnir( 3, '../../assets/gris.png', 'Gris',  '../../assets/asustado.png', 'Asustado', '../../assets/musicaAsustado.mp3',  0),
  new PreguntaUnir( 4, '../../assets/azul.png', 'Azul',  '../../assets/triste.png',  'Triste', '../../assets/musicaTriste.mp3',  0),
  ],

  [[
  new PreguntaUnir( 5, '../../assets/gris.png', 'Gris',  '../../assets/asustado.png', 'Asustado', '../../assets/musicaAsustado.mp3',  1),
  new PreguntaUnir( 6, '../../assets/azul.png', 'Azul',  '../../assets/triste.png',  'Triste', '../../assets/musicaTriste.mp3',  1),
  new PreguntaUnir( 7, '../../assets/gris.png', 'Gris',  '../../assets/asustado.png', 'Asustado', '../../assets/musicaAsustado.mp3',  1),
  new PreguntaUnir( 8, '../../assets/azul.png', 'Azul',  '../../assets/triste.png',  'Triste', '../../assets/musicaTriste.mp3',  1),
],

[
  new PreguntaUnir( 9, '../../assets/gris.png', 'Gris',  '../../assets/asustado.png', 'Asustado', '../../assets/musicaAsustado.mp3',  1),
  new PreguntaUnir( 10, '../../assets/azul.png', 'Azul',  '../../assets/triste.png',  'Triste', '../../assets/musicaTriste.mp3',  1),
  new PreguntaUnir( 11, '../../assets/gris.png', 'Gris',  '../../assets/asustado.png', 'Asustado', '../../assets/musicaAsustado.mp3',  1),
  new PreguntaUnir( 12, '../../assets/azul.png', 'Azul',  '../../assets/triste.png',  'Triste', '../../assets/musicaTriste.mp3',  1),
],
]);
init = false

@ViewChild(IonContent, { static: true }) ionContent: IonContent;
@ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;

  constructor( private activatedRoute: ActivatedRoute, private ptl : Platform, private menu: MenuController) {
    this.activatedRoute.paramMap.subscribe(params => {
      let juegoId = params.get('juegoId');
      this.alumnoId = params.get('alumnoId');
      console.log('juegoId: ' + juegoId);
      this.juegoService.getJuegoUnirPareja(juegoId).subscribe(data => {
          this.juego = new JuegoUnir(data.id, data.nombre, data.portada, data.tipo,
            data.instrucciones, data.tutorial, data.descrip_tutorial, data.efectos_sonido,
            data.sonidos, data.refPositivo, data.refNegativo, data.resultadoNum, data.resultadoPicto, data.imgRefPositivo,
            data.imgRefNegativo, data.cuestionarioFinal, data.cuestionarioFinalPregunta, data.opcionesCuestionarioFinal,
            data.pregunta_tutorial, data.ejercicios);
          this.buildSlides();
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

        this.numEjercicios = this.juego.ejercicios.length - 1;

        for(let j = 0; j < this.juego.ejercicios[0].length; j++){
          this.ejercicioTutorial.push({id: this.juego.ejercicios[0][j].id, img: this.juego.ejercicios[0][j].img_1, texto: this.juego.ejercicios[0][j].texto_1, tipo:'color',  musica: this.juego.ejercicios[0][j].musica});
          this.ejercicioTutorial.push({id: this.juego.ejercicios[0][j].id, img: this.juego.ejercicios[0][j].img_2, texto: this.juego.ejercicios[0][j].texto_2, tipo:'asociada',  musica: this.juego.ejercicios[0][j].musica});
        }


        for(let i = 1; i < this.juego.ejercicios.length; i++){
          let aux = [];
          for(let j = 0; j < this.juego.ejercicios[i].length; j++){
            aux.push({id: this.juego.ejercicios[i][j].id, img: this.juego.ejercicios[i][j].img_1, texto: this.juego.ejercicios[i][j].texto_1, tipo:'color',  musica: this.juego.ejercicios[i][j].musica});
            aux.push({id: this.juego.ejercicios[i][j].id, img: this.juego.ejercicios[i][j].img_2, texto: this.juego.ejercicios[i][j].texto_2, tipo:'asociada',  musica: this.juego.ejercicios[i][j].musica});
          }
          this.ejercicios.push(aux);
        }


        this.ejercicioTutorial = this.shuffle(this.ejercicioTutorial);

        this.ejercicios = this.shuffle(this.ejercicios);
      });
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {


      let juegoId = params.get('juegoId');
      console.log('juegoId: ' + juegoId);
      this.juegoService.getJuegoUnirPareja(juegoId).subscribe(data => {
        this.juego = new JuegoUnir(data.id, data.nombre, data.portada, data.tipo,
            data.instrucciones, data.tutorial, data.descrip_tutorial, data.efectos_sonido,
            data.sonidos, data.refPositivo, data.refNegativo, data.resultadoNum, data.resultadoPicto, data.imgRefPositivo,
            data.imgRefNegativo, data.cuestionarioFinal, data.cuestionarioFinalPregunta, data.opcionesCuestionarioFinal,
            data.pregunta_tutorial, data.ejercicios);
          this.buildSlides();
          this.width = this.ptl.width;
          this.height = this.ptl.height;

          //this.audioAcertar.src = '../../assets/acertar.mp3';
          this.audioFallar.src = '../../assets/fallar.mp3';
          this.audioCompletar.src = '../../assets/completar.mp3';
          this.audioTocar.src = '../../assets/tocar.mp3';

          //this.audioAcertar.load();
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
        img: ejercicio.img_1,
        texto: ejercicio.texto_1,
        tipo: 'color',
        musica: ejercicio.musica
      })).concat(this.juego.ejercicios[0].map(ejercicio => ({
        id: ejercicio.id,
        img: ejercicio.img_2,
        texto: ejercicio.texto_2,
        tipo: 'asociada',
        musica: ejercicio.musica
      })));

      // Assign the remaining exercises to ejercicios
      for (let i = 1; i < this.juego.ejercicios.length; i++) {
        let aux = [];
        for (let j = 0; j < this.juego.ejercicios[i].length; j++) {
          aux.push({
            id: this.juego.ejercicios[i][j].id,
            img: this.juego.ejercicios[i][j].img_1,
            texto: this.juego.ejercicios[i][j].texto_1,
            tipo: 'color',
            musica: this.juego.ejercicios[i][j].musica
          });
          aux.push({
            id: this.juego.ejercicios[i][j].id,
            img: this.juego.ejercicios[i][j].img_2,
            texto: this.juego.ejercicios[i][j].texto_2,
            tipo: 'asociada',
            musica: this.juego.ejercicios[i][j].musica
          });
        }
        this.ejercicios.push(aux);
      }

          this.ejercicioTutorial = this.shuffle(this.ejercicioTutorial);

          this.ejercicios = this.shuffle(this.ejercicios);
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

    console.log(' CLASEEE: ' + this.claseBoton);
    console.log(' WIDTHHH: ' + this.width);
    console.log(' HEIGHTTT: ' + this.height);
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

  getClaseOrganImg(size : number, ejer =false){
    let clase = 'elementos';

    if(size == 2)
      clase = 'elementos2';

    else if(size == 6)
      clase = 'elementos6';

    else if(size == 8)
      clase = ejer? 'elementos8--ejer' :  'elementos8';

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


  seleccionar(id: string){

    if(!this.estaUnido(id)){

      if(this.esRepetido)
      this.esRepetido = false;

      if(this.isFallo)
        this.isFallo = false;

      if(this.isCorrecto)
        this.isCorrecto = false;

      if(this.seleccionado1 == null ){
        if(this.seleccionado2 == id)
          this.seleccionado2 = null;

        else
          this.seleccionado1 = id;
      }

      else if(this.seleccionado1 == id)
        this.seleccionado1 = null;

      else if(this.seleccionado2 == id)
        this.seleccionado2 = null;

      else
        this.seleccionado2 = id;

    }

  }

  seleccionarFinal(id: string){


    if(this.seleccionadoFinal == id )
      this.seleccionadoFinal = null;

    else{
      this.seleccionadoFinal = id;
    }
  }


  isSeleccionado(id : string, musica : string){


    let clase = 'botonImagen';

    if(this.seleccionadoFinal == id){
      clase = 'botonImagenSelected';
      this.audioCompletar.play();

    }

    //si no está ya unido correctamente
    else if (!this.estaUnido(id)){

    if(this.seleccionado1 == id){

      if(this.seleccionado2 != null){
        this.resultado(this.seleccionado1, this.seleccionado2, musica);
        if(this.isFallo){
          this.seleccionadoClase1 = 'botonImagenSelectedFallo';
          this.seleccionadoClase2 = 'botonImagenSelectedFallo';

          clase = 'botonImagenSelectedFallo';
        }

        else if(this.isCorrecto){
          this.seleccionadoClase1 = 'botonImagenSelectedCorrecto';
          this.seleccionadoClase2 = 'botonImagenSelectedCorrecto';
          clase = 'botonImagenSelectedCorrecto';
        }

      }

      else{
        this.seleccionadoClase1 = 'botonImagenSelected';
        clase = 'botonImagenSelected';
      }
    }

    if(this.seleccionado2 == id ){

      if(this.seleccionado1 != null){

        this.resultado(this.seleccionado1, this.seleccionado2, musica);
        if(this.isFallo){
          this.seleccionadoClase1 = 'botonImagenSelectedFallo';
          this.seleccionadoClase2 = 'botonImagenSelectedFallo';
          clase = 'botonImagenSelectedFallo';
        }

        else if(this.isCorrecto){
          this.seleccionadoClase1 = 'botonImagenSelectedCorrecto';
          this.seleccionadoClase2 = 'botonImagenSelectedCorrecto';

          clase = 'botonImagenSelectedCorrecto';
        }

      }

      else{
        this.seleccionadoClase2 = 'botonImagenSelected';
        clase = 'botonImagenSelected';
      }
    }

  }

  else if (this.estaUnido(id)){
    this.seleccionadoClase1 = 'botonImagenSelectedCorrecto';
    this.seleccionadoClase2 = 'botonImagenSelectedCorrecto';
    clase = 'botonImagenSelectedCorrecto';

  }

  else{
    this.seleccionadoClase1 = 'botonImagen';
    this.seleccionadoClase2 = 'botonImagen';
  }

  console.log('CLASEEE2 : ' + clase);
  return clase;


  }

  estaUnido(id : string){
    let unido = false;

    this.unidos.map(elem =>{
      if(elem === id)
      unido = true;
    });

    return unido;
  }


  repetirEjTutorial(){
    this.esRepetido = true;
    this.resetJuego();

  }

  resetJuego(){
    this.unidos = [];
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

 async resultado(seleccionado1, seleccionado2, musica){

    const id1 = seleccionado1.split("+")[0];
    const id2 = seleccionado2.split("+")[0];

    if(id1 == id2){


      this.isCorrecto = true;
      this.numAciertos ++;
      this.unidos.push(seleccionado1);
      this.unidos.push(seleccionado2);
      this.seleccionado1 = null;
      this.seleccionado2 = null;

      //this.audioAcertar.src = musica;
      //this.audioAcertar.load();

      if((this.tutorial && this.ejercicioTutorial.length == this.unidos.length) || this.currentEj.length == this.unidos.length ){

        console.log('ACERTAR');
        this.audioAcertar.play();
        await delay(1000);
        this.audioAcertar.pause();
        this.todosUnidosTutorial = true;
        this.audioCompletar.play();

      }

      else{
        console.log('ACERTAR 2');
        console.log(this.audioAcertar.src);
        this.audioAcertar.play();


      }

    }

    else if(id1 != id2){
      console.log('FAIL');
      if( this.seleccionadoClase2 != 'botonImagenSelectedFallo' ||  this.seleccionadoClase1 != 'botonImagenSelectedFallo' ){
        this.numErrores++;

      }
      console.log(this.audioFallar.src);
      this.audioFallar.play();
      this.isFallo = true;

    }
  }

  resultadoPicto(){
    let picto = '../../assets/pictoAcertar.png';

    if(this.numErrores < 5)
      picto = '../../assets/pictoFallar.png';

    return picto;
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

