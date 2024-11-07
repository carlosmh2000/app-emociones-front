import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  constructor(private http: HttpClient) { }

  getImages(subdir: string = ''): Observable<any> {
    const imgDir = 'img/'+subdir;
    return this.http.get<any>(apiUrl+'/api/upload/list/'+imgDir);
  }

  getSounds(subdir: string = ''): Observable<any> {
    const imgDir = 'sonidos/'+subdir;
    return this.http.get<any>(apiUrl+'/api/upload/list/'+imgDir);
  }

  getContent(subdir = '', sonido = false): Observable<any> {
    return sonido? this.getSounds(subdir): this.getImages(subdir)
  }

  getImage(image: string): Observable<any> {
    return this.http.get<any>(apiUrl+'/uploads/'+image);
  }

  uploadAudio(folder: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return this.http.post(`${apiUrl}/api/upload_audio`, formData);
  }
}
