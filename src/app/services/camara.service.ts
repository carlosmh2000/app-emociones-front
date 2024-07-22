import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

export interface PhotoData {
  filepath: string,
  webviewPath: string,
  base64URL: string

}

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  public imgURL : string;
  public imageData: PhotoData;

  constructor()
  {
    this.imgURL = '';
  }

  async getCamara() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: true,
      quality: 10
    });

    const imageData = await this.savePicture(capturedPhoto);
    this.imgURL = imageData.webviewPath;
    this.imageData = imageData;

  }


  async getGaleria() {
    const image = await Camera.getPhoto({
      quality: 10,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    const imageData = await this.savePicture(image);
    this.imgURL = imageData.webviewPath;
    this.imageData = imageData;
 }

  private async savePicture(photo: Photo): Promise<PhotoData> {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
      base64URL: base64Data
    };
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}
