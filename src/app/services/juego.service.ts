import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Juego} from "../models/juego.model";



@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  apiUrl = 'http://localhost:5000/api/juego';
  addJuego(juego: Juego): Observable<Juego>{
    return this.http.post<Juego>(this.apiUrl, juego);
  }

  getJuegos(tipo: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${tipo}`);
  }

  getJuego(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteJuego(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateJuego(juego: Juego): Observable<Juego>{
    return this.http.patch<Juego>(`${this.apiUrl}/${juego.id}`, juego );
  }
}
