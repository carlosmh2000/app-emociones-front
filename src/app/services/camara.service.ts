import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  public imgURL : string;

  constructor(private camara: Camera, private DomSanitizer: DomSanitizer) 
  { 
    this.imgURL = '';
  }

  async getCamara() {
    await this.camara.getPicture( {
      sourceType: this.camara.PictureSourceType.CAMERA,
      destinationType: this.camara.DestinationType.DATA_URL
    }).then(async (res) => {
      this.imgURL = 'data:image/jpeg;base64,' + res;

    }).catch(e => {
      console.log(e);
    })

  }


  async getGaleria() {

    await this.camara.getPicture({
      sourceType: this.camara.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG
    }).then(async (res) => {
      this.imgURL = 'data:image/jpeg;base64,' + res;
    }).catch(e => {
      console.log(e);
    })


  }

}
