import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from '../app.component';

export interface PhotoData {
  filepath: string,
  webviewPath: string,
  base64URL: string
}

@Injectable({
  providedIn: 'root'
})
export class CamaraService {

  public imgURL: string;
  public imageData: PhotoData;

  constructor(private http: HttpClient) {
    this.imgURL = '';
  }

  async getCamara(subruta='') {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      saveToGallery: true,
      quality: 10
    });

    const imageData = await this.savePicture(capturedPhoto, subruta);
    if (imageData) {
      this.imageData = imageData;
    }
  }

  async getGaleria(subruta='') {
    const image = await Camera.getPhoto({
      quality: 10,
      allowEditing: true,
      saveToGallery: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    const imageData = await this.savePicture(image, subruta);
    if (imageData) {
      this.imageData = imageData;
    }
  }

  private async savePicture(photo: Photo, subruta=''): Promise<PhotoData | null> {
    if (!photo || !photo.webPath) {
      console.error('Photo object is invalid:', photo);
      return null;
    }

    const base64Data = await this.readAsBase64(photo);

    return new Promise((resolve, reject) => {
      this.uploadImage(base64Data, subruta).subscribe(response => {
        const fileName = apiUrl + '/uploads/'+ subruta + Date.now() + '.jpeg';
        resolve({
          filepath: fileName,
          webviewPath: photo.webPath,
          base64URL: base64Data
        });
      }, error => {
        reject(error);
      });
    });
  }

  private async readAsBase64(photo: Photo) {
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

  private uploadImage(base64Data: string, subruta=''): Observable<any> {
    const url = apiUrl + '/api/upload/'+subruta;
    const filename = Date.now() + '.jpeg';
    this.imgURL = apiUrl + '/uploads/' + filename;
    const payload = { image: base64Data, name: filename };
    return this.http.post(url, payload).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error.message);
    return throwError('Error');
  }
}
