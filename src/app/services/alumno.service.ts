import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Alumno} from "../models/alumno.model";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";



@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private http: HttpClient;
  constructor(http: HttpClient) {
    this.http = http;
  }

  apiUrl = environment.apiUrl+'/api/alumno';
  addAlumno(nombre: string, fotoPerfil: string): Observable<Alumno>{
    return this.http.post<Alumno>(this.apiUrl, {nombre: nombre, fotoPerfil: fotoPerfil});
  }

  getAlumnos(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  getAlumno(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deleteAlumno(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateAlumno(alumno: Alumno): Observable<Alumno>{
    return this.http.patch<Alumno>(`${this.apiUrl}/${alumno.id}`, {nombre: alumno.nombre, fotoPerfil: alumno.fotoPerfil} );
  }

  asignarJuego(juegoId: number, tipoJuego: string, alumnoId: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/${alumnoId}/asignar`, {juegoId: juegoId, tipoJuego: tipoJuego});
  }
}
