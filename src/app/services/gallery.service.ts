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

  getImage(image: string): Observable<any> {
    return this.http.get<any>(apiUrl+'/uploads/'+image);
  }
}
