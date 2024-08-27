import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Juego} from "../models/juego.model";
import {JuegoBuscarIntruso} from "../models/juego-buscar-intruso.model";
import {JuegoUnirPareja} from "../models/juego-unir-pareja.model";
import {JuegoUnircolor} from "../models/juego-unircolor.model";
import {JuegoUnir} from "../models/juego-unir.model";



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

  addJuegoBuscarIntruso(juego: JuegoBuscarIntruso): Observable<JuegoBuscarIntruso>{
    return this.http.post<JuegoBuscarIntruso>(`${this.apiUrl}/buscarIntruso`, juego);
  }

  addJuegoUnirPareja(juego: JuegoUnirPareja): Observable<JuegoUnirPareja>{
    return this.http.post<JuegoUnirPareja>(`${this.apiUrl}/unirPareja`, juego);
  }

  addJuegoUnircolor(juego: JuegoUnircolor): Observable<JuegoUnircolor>{
    return this.http.post<JuegoUnircolor>(`${this.apiUrl}/unirColor`, juego);
  }

  getJuegos(tipo: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${tipo}`);
  }

  getJuego(id: string, tipo: string): Observable<Juego>{
    return this.http.get<Juego>(`${this.apiUrl}/${id}/${tipo}`);
  }
  getJuegoUnirPareja(id: string): Observable<JuegoUnir>{
    return this.http.get<JuegoUnir>(`${this.apiUrl}/unirPareja/${id}`);
  }


  deleteJuego(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateJuego(juego: Juego): Observable<Juego>{
    return this.http.patch<Juego>(`${this.apiUrl}/${juego.id}`, juego );
  }
}
