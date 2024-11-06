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

  @Input() asignando = false;


  seccionesEmociones = [
    { nombre: 'Triste', ruta: 'emociones/triste', imgs: [], visible: true },
    { nombre: 'Enfadado', ruta: 'emociones/enfadado', imgs: [], visible: true },
    { nombre: 'Feliz', ruta: 'emociones/feliz', imgs: [], visible: true },
    { nombre: 'Asustado', ruta: 'emociones/asustado', imgs: [], visible: true }
  ];

  seccionesPortadas = [
    { nombre: 'Portadas juegos', ruta: 'portadasJuegosTipo', imgs: [], visible: true },
  ];

  seccionesGaleria = [
    { seccion: 'Emociones', subsecciones: this.seccionesEmociones, visible: true },
    { seccion:'Portadas', subsecciones: this.seccionesPortadas, visible: true }
  ]

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages() {
    for (let seccion of this.seccionesGaleria) {
      for (let subseccion of seccion.subsecciones) {
        this.galleryService.getImages(subseccion.ruta).subscribe((data) => {
          subseccion.imgs = data.files.map(img => `${this.apiUrl}/${img.replace(/\\/g, '/')}`);
        });
      }
    }
  }

  async subirFoto(subruta = '') {
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


  toggleSubSection(seccion): void {
    seccion.visible = !seccion.visible;
  }

  async closeModal(imgRoute: string) {
    if (this.asignando){
      await this.modalCtrl.dismiss({img: imgRoute});
    }
  }
}
