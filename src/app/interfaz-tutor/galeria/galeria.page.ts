import {Component, inject, Input, OnInit} from '@angular/core';
import {GalleryService} from "../../services/gallery.service";
import {apiUrl} from "../../app.component";
import {CamaraService} from "../../services/camara.service";
import {ActionSheetController, ModalController} from "@ionic/angular";

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {
  private galleryService = inject(GalleryService);
  private camaraService = inject(CamaraService);
  private actionSheetCtrl = inject(ActionSheetController);
  private modalCtrl = inject(ModalController);

  images: string[] = [];
  apiUrl = apiUrl;
  anadirSeccion = false;

  @Input() asignando = false;

  nombreSeccion: string;
  nombreSubseccion: string;

  seccionesEmociones = [
    { nombre: 'Triste', ruta: 'emociones/triste', imgs: [], visible: true },
    { nombre: 'Enfadado', ruta: 'emociones/enfadado', imgs: [], visible: true },
    { nombre: 'Feliz', ruta: 'emociones/feliz', imgs: [], visible: true },
    { nombre: 'Asustado', ruta: 'emociones/asustado', imgs: [], visible: true }
  ];

  seccionesPortadas = [
    { nombre: 'Portadas juegos', ruta: 'portadasJuegosTipo', imgs: [], visible: true },
  ];

  sonidos = [{nombre: 'Audios', ruta: '', imgs: [], visible: true}];

  seccionesGaleria = [
    { seccion: 'Emociones', subsecciones: this.seccionesEmociones, visible: true },
    { seccion:'Portadas', subsecciones: this.seccionesPortadas, visible: true},
    { seccion: 'Sonidos', subsecciones: this.sonidos, visible: true }
  ]

  ngOnInit(): void {
    this.galleryService.getRouteTree().subscribe((data) => {
      this.seccionesGaleria = data.routes;
    });
  }
  async subirAudio(subruta = '') {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'audio/*';
    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.galleryService.uploadAudio(subruta, file).subscribe(response => {});
      }
    };
    input.click();
  }

  loadImages() {
    for (let seccion of this.seccionesGaleria) {
      for (let subseccion of seccion.subsecciones) {
        this.galleryService.getContent(subseccion.ruta, subseccion.nombre==='Audios').subscribe((data) => {
          subseccion.imgs = data.files.map(img => `${this.apiUrl}/${img.replace(/\\/g, '/')}`);
        });
      }
    }
  }

  async subirFoto(subruta = '', sonido=false) {
    if(sonido){
      await this.subirAudio(subruta);
    }else{

      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Elige una opción',
        buttons: [{
          text: 'Galería',
          handler: async () => {
            await  this.camaraService.getGaleria(subruta);
          }
        }, {
          text: 'Cámara',
          handler: async () => {
            await this.camaraService.getCamara(subruta);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel'
        }]
      });
      await actionSheet.present();
      actionSheet.onDidDismiss().then(() => {
        window.location.reload();
      });

    }
  }

  isImage(item: string): boolean {
    return !item.match(/\.(mp3)$/) != null;
  }

  getFileName(item: string): string {
    return item.split('/').pop();
  }


  toggleSubSection(seccion): void {
    seccion.visible = !seccion.visible;
  }

  async closeModal(imgRoute: string) {
    if (this.asignando){
      console.log(imgRoute);
      await this.modalCtrl.dismiss({img: imgRoute});
    }
  }

  anadirSeccicon(){

  }

    addNewSection(): void {
    const newSection = {
      seccion: this.nombreSeccion,
      subsecciones: [
        { nombre: this.nombreSubseccion, ruta: `${this.nombreSeccion.toLowerCase()}/${this.nombreSubseccion.toLowerCase()}`, imgs: [], visible: true }
      ],
      visible: true
    };
    this.seccionesGaleria.push(newSection);
    this.anadirSeccion = false;
    this.nombreSeccion = '';
    this.nombreSubseccion = '';
  }
}
