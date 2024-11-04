import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Juego} from "../models/juego.model";
import {JuegoBuscarIntruso} from "../models/juego-buscar-intruso.model";
import {JuegoUnirPareja} from "../models/juego-unir-pareja.model";
import {JuegoUnircolor} from "../models/juego-unircolor.model";
import {JuegoUnir} from "../models/juego-unir.model";
import {JuegoAsociar} from "../models/juego-asociar.model";
import {environment} from "../../environments/environment";
import {apiUrl} from "../app.component";



@Injectable({
  providedIn: 'root',
})
export class JuegoService {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  apiUrl = apiUrl +'/api/juego';
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

  getJuegosAlumno(tipo: string, alumnoId: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${tipo}/alumno/${alumnoId}`);
  }

  getJuego(id: string, tipo: string): Observable<any>{
    if (tipo == 'hacerPareja') tipo = 'unirPareja';
    return this.http.get<any>(`${this.apiUrl}/${tipo}/${id}`);
  }
  getJuegoUnirPareja(id: string): Observable<JuegoUnir>{
    return this.http.get<JuegoUnir>(`${this.apiUrl}/unirPareja/${id}`);
  }

  getJuegoUnirColor(id: string): Observable<JuegoUnir>{
    return this.http.get<JuegoUnir>(`${this.apiUrl}/unirColor/${id}`);
  }

  getJuegoAsociarImagen(id: string): Observable<JuegoAsociar>{
    return this.http.get<JuegoAsociar>(`${this.apiUrl}/asociarImagen/${id}`);
  }

  getJuegoElegirEmocion(id: string): Observable<JuegoAsociar>{
    return this.http.get<JuegoAsociar>(`${this.apiUrl}/elegirEmocion/${id}`);
  }

  getJuegoUnirFrase(id: string): Observable<JuegoAsociar>{
    return this.http.get<JuegoAsociar>(`${this.apiUrl}/unirFrase/${id}`);
  }


  getJuegoBuscarIntruso(id: string): Observable<JuegoBuscarIntruso>{
    return this.http.get<JuegoBuscarIntruso>(`${this.apiUrl}/buscarIntruso/${id}`);
  }


  deleteJuego(id: number, tipo: string): Observable<any>{
    if (tipo == 'hacerPareja') tipo = 'unirPareja';
    return this.http.delete<any>(`${this.apiUrl}/${id}/${tipo}`);
  }

  updateJuego(juego: Juego): Observable<void>{
    return this.http.patch<void>(`${this.apiUrl}/${juego.id}`, juego );
  }
}
