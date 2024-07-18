import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';
import { Resultado } from '../models/resultado.model';
import { OpcionCuestionarioFinal } from '../models/opcion-cuestionario-final.model';
import { JuegoUnir } from '../models/juego-unir.model';
import { PreguntaUnir } from '../models/pregunta-unir.model';
import { PreguntaAsociar } from '../models/pregunta-asociar.model';
import { PreguntaBuscarIntruso } from '../models/pregunta-buscar-intruso.model';
import { PreguntaUnirPareja } from '../models/pregunta-unir-pareja';
import { JuegoUnirPareja } from '../models/juego-unir-pareja.model';
import { JuegoBuscarIntruso } from '../models/juego-buscar-intruso.model';
import { JuegoAsociar } from '../models/juego-asociar.model';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  alumnos = new BehaviorSubject([]);
  juegosUnirColor = new BehaviorSubject([]);
  juegosUnirPareja = new BehaviorSubject([]);
  juegosBuscarIntruso = new BehaviorSubject([]);
  juegosAsociar = new BehaviorSubject([]);
  preguntaUnirColor = new BehaviorSubject([]);
  preguntaAsociar = new BehaviorSubject([]);
  preguntaUnirPareja = new BehaviorSubject([]);
  preguntaBuscarIntruso = new BehaviorSubject([]);
  sonidos = new BehaviorSubject([]);
  resultados = new BehaviorSubject([]);
  opcionesCuestionarioFinal = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.initDb();
  }

  async initDb(): Promise<void> {
    if (this.plt){
      try {
        const rdy = await this.plt.ready();
        if (rdy){
          if (this.sqlite){
            const db = await this.sqlite.create({
              name: 'app-emociones.db',
              location: 'default',
              androidDatabaseLocation: 'default'
            });
            console.log(rdy)
            this.database = db;
            console.log(this.database)
            this.seedDatabase();
          }
        }
      } catch (e) {
        console.error('Error al crear la base de datos:', e);
      }
    }
  }

  //se importa las tablas de sql a la bd
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text' })
      .subscribe(sql => {
        if(this.database  && sql){
          console.log(this.database)
          this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            //se cargan todas las tablas
            this.loadAlumnos();
            this.loadJuegosUnirColor();
            this.loadJuegosUnirPareja();
            this.loadJuegosBuscarIntruso();
            this.loadJuegosAsociar();
            this.loadPreguntasUnirColor();
            this.loadPreguntasAsociar();
            this.loadPreguntasUnirPareja();
            this.loadPreguntasBuscarIntruso();
            this.loadSonidos();
            this.loadResultados();
            this.loadOpcionesCuestionarioFinal();
            console.log('listoooo');
            this.dbReady.next(true);
          })
          .catch(e => console.error(e))
        }
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }


  getAlumnos(): Observable<Alumno[]> {
    return this.alumnos.asObservable();
  }



  async loadAlumnos() {
    return await this.database.executeSql('SELECT * FROM alumno', []).then(async data => {
      let alumnos: Alumno[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          alumnos.push(new Alumno(data.rows.item(i).id, data.rows.item(i).nombre, data.rows.item(i).fotoPerfil,));
        }
      }
      this.alumnos.next(alumnos);
    });
  }

  async addAlumno(nombre, profilePhoto) {

    let data = [nombre, profilePhoto];
      return await this.database.executeSql('INSERT INTO alumno (nombre, fotoPerfil) VALUES (?, ?)', data).then(async data => {

        await this.loadAlumnos();
      });
  }

  async getAlumno(id): Promise<Alumno> {

    return await this.database.executeSql('SELECT * FROM alumno WHERE id = ?', [id]).then(async data => {
      return new Alumno(data.rows.item(0).id, data.rows.item(0).nombre, data.rows.item(0).fotoPerfil)
    });
  }

  async deleteAlumno(id) {

    return await this.getAlumno(id).then(async data => {

      return await this.database.executeSql('DELETE FROM alumno WHERE id = ?', [id]).then(async _ => {

        await this.loadAlumnos();
      });
    });

  }

  async deleteAllAlumno() {
    return await this.database.executeSql('DELETE * FROM alumno ').then(_ => {
      this.loadAlumnos();
    });
  }

  async updateAlumno(alumno: Alumno) {

    let data = [alumno.nombre, alumno.fotoPerfil, alumno.id];
    return await this.database.executeSql('UPDATE alumno SET nombre = ?, fotoPerfil = ? WHERE id = ?', data).then(async data => {
      await this.loadAlumnos();
    })
  }


  getJuegosUnirColor(): Observable<JuegoUnir[]> {
    return this.juegosUnirColor.asObservable();
  }

  addJuegoUnirColor(nombre: string, portada: string, tipo: string, instrucciones: string, tutorial: boolean, descrip_tutorial: string, efectos_sonido: boolean, sonidos: string[], refPositivo: boolean, refNegativo: boolean, resultadoNum: boolean, resultadoPicto: boolean, imgRefPositivo: string, imgRefNegativo: string, cuestionarioFinal: boolean, cuestionarioFinalPregunta: string, opcionesCuestionarioFinal: OpcionCuestionarioFinal[], preguntasTutorial: PreguntaUnir[], ejercicios: PreguntaUnir[][]) {
    let data = [nombre, portada, tipo, instrucciones, Number(tutorial), descrip_tutorial, Number(efectos_sonido), Number(refPositivo), Number(refNegativo), Number(resultadoNum), Number(resultadoPicto), imgRefPositivo, imgRefNegativo, Number(cuestionarioFinal), cuestionarioFinalPregunta];
    return this.database.executeSql('INSERT INTO juegoUnirCol (nombre, portada, tipo, instrucciones, tutorial, descrip_tutorial, efectos_sonido, refPositivo, refNegativo,  resultadoNum, resultadoPicto, imgRefPositivo, imgRefNegativo, cuestionarioFinal, cuestionarioFinalPregunta ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(async (data1) => {

      console.log('en addJuegoUnirColor +  opcionesCuestionarioFinal.length: ' + opcionesCuestionarioFinal.length);

      for (let i = 0; i < opcionesCuestionarioFinal.length; i++) {

        await this.addOpcionCuestionarioFinal(data1.insertId, opcionesCuestionarioFinal[i].img, opcionesCuestionarioFinal[i].texto).then(async dataOpciones => {

        });
      }

      console.log('en addJuegoUnirColor +  sonidos.length: ' + sonidos.length);

      for (let i = 0; i < sonidos.length; i++) {
        await this.addSonido(data1.insertId, sonidos[i]).then(async _ => {
        });
      }

      console.log('en addJuegoUnirColor +  preguntasTutorial.length: ' + preguntasTutorial.length);

      for (let i = 0; i < preguntasTutorial.length; i++) {
        await this.addPreguntasUnirColor(data1.insertId, preguntasTutorial[i].color, preguntasTutorial[i].texto_color, preguntasTutorial[i].asociada, preguntasTutorial[i].texto_asociada, preguntasTutorial[i].musica, preguntasTutorial[i].numEjer).then(async _ => {

        });
      }

      console.log('en addJuegoUnirColor +  ejercicios.length: ' + ejercicios.length);

      for (let i = 0; i < ejercicios.length; i++) {
        for (let j = 0; j < ejercicios[i].length; j++) {
          await this.addPreguntasUnirColor(data1.insertId, ejercicios[i][i].color, ejercicios[i][j].texto_color, ejercicios[i][j].asociada, ejercicios[i][j].texto_asociada, ejercicios[i][j].musica, ejercicios[i][j].numEjer).then(async _ => {

          });
        }
      }

      this.loadJuegosUnirColor();

    });

  }

  async loadJuegosUnirColor() {
    return await this.database.executeSql('SELECT * FROM juegoUnirCol', []).then(async data => {

      await this.loadPreguntasUnirColor();
      let juegos: JuegoUnir[] = [];
      let sonidos: string[] = [];
      let ejercicios: PreguntaUnir[][] = [];
      let preguntas: PreguntaUnir[] = [];
      let preguntaAux: PreguntaUnir[] = [];
      let numEjer = 1;
      let preguntasTutorial: PreguntaUnir[] = [];
      let opcionesCuestionarioFinal: OpcionCuestionarioFinal[] = [];


      if (data.rows.length > 0) {


        for (var i = 0; i < data.rows.length; i++) {


          sonidos = await this.getSonido(data.rows.item(i).id);

          console.log('en loadJuegosUnirColor +  sonidos.length: ' + sonidos.length);
          console.log('en loadJuegosUnirColor +  sonidos: ' + sonidos);

          preguntas = await this.getPreguntaUnirColor(data.rows.item(i).id);

          console.log('en preguntas +  preguntas.length: ' + preguntas.length);

          opcionesCuestionarioFinal = await this.getOpcionCuestionarioFinal(data.rows.item(i).id);

          console.log('en opcionesCuestionarioFinal +  opcionesCuestionarioFinal.length: ' + opcionesCuestionarioFinal.length);
          console.log('en opcionesCuestionarioFinal +  opcionesCuestionarioFinal: ' + opcionesCuestionarioFinal);

          for (let i = 0; i < preguntas.length; i++) {

            //ejercicios
            if (preguntas[i].numEjer != 0) {
              if (preguntas[i].numEjer == numEjer) {

                preguntaAux.push(preguntas[i]);
              }

              else {
                numEjer++;
                ejercicios.push(preguntaAux);


                preguntaAux = [];
                preguntaAux.push(preguntas[i]);

              }

              if (i == (preguntas.length - 1)) {

                ejercicios.push(preguntaAux);

              }
            }

            //tutorial
            else {
              preguntasTutorial.push(preguntas[i]);

            }

          }

          juegos.push(new JuegoUnir(data.rows.item(i).id, data.rows.item(i).nombre,
            data.rows.item(i).portada, data.rows.item(i).tipo, data.rows.item(i).instrucciones, data.rows.item(i).tutorial,
            data.rows.item(i).descrip_tutorial, data.rows.item(i).efectos_sonido, sonidos, data.rows.item(i).refPositivo,
            data.rows.item(i).refNegativo, data.rows.item(i).resultadoNum, data.rows.item(i).resultadoPicto, data.rows.item(i).imgRefPositivo,
            data.rows.item(i).imgRefNegativo, data.rows.item(i).cuestionarioFinal, data.rows.item(i).cuestionarioFinalPregunta, opcionesCuestionarioFinal, preguntasTutorial,
            ejercicios
          ));

          ejercicios = [];
          sonidos = [];
          opcionesCuestionarioFinal = [];
          preguntasTutorial = [];
          preguntaAux = [];
          numEjer = 1;
        }
      }
      this.juegosUnirColor.next(juegos);
    });
  }


  async getJuegoUnirColor(id): Promise<JuegoUnir> {

    return await this.database.executeSql('SELECT * FROM juegoUnirCol WHERE id = ?', [id]).then(async data => {

      let sonidos: string[] = [];
      let preguntas: PreguntaUnir[] = [];
      let ejercicios: PreguntaUnir[][] = [];
      let preguntaAux: PreguntaUnir[] = [];
      let numEjer = 1;
      let preguntasTutorial: PreguntaUnir[] = [];
      let opcionesCuestionarioFinal: OpcionCuestionarioFinal[] = [];

      //obtenemos las opciones del cuestionario final
      opcionesCuestionarioFinal = await this.getOpcionCuestionarioFinal(id);

      //obtenemos los sonidos
      sonidos = await this.getSonido(id);

      //obtenemos las preguntas del juego

      preguntas = await this.getPreguntaUnirColor(id);

      for (let i = 0; i < preguntas.length; i++) {

        //ejercicios
        if (preguntas[i].numEjer != 0) {
          if (preguntas[i].numEjer == numEjer) {

            preguntaAux.push(preguntas[i]);
          }

          else {
            numEjer++;
            ejercicios.push(preguntaAux);

            preguntaAux = [];
            preguntaAux.push(preguntas[i]);

          }

          if (i == (preguntas.length - 1))
            ejercicios.push(preguntaAux);
        }

        //tutorial
        else {
          preguntasTutorial.push(preguntas[i]);

        }

      }

      return new JuegoUnir(data.rows.item(0).id, data.rows.item(0).nombre,
        data.rows.item(0).portada, data.rows.item(0).tipo, data.rows.item(0).instrucciones, data.rows.item(0).tutorial,
        data.rows.item(0).descrip_tutorial, data.rows.item(0).efectos_sonido, sonidos, data.rows.item(0).refPositivo,
        data.rows.item(0).refNegativo, data.rows.item(0).resultadoNum, data.rows.item(0).resultadoPicto, data.rows.item(0).imgRefPositivo,
        data.rows.item(0).imgRefNegativo, data.rows.item(0).cuestionarioFinal, data.rows.item(0).cuestionarioFinalPregunta, opcionesCuestionarioFinal, preguntasTutorial, ejercicios)
    });
  }

  async deleteJuegoUnirColor(id) {

    //primero eliminamos sus elementos vinculadas
    return await this.getJuegoUnirColor(id).then(async data => {


      await this.deleteSonidosJuego(id).then(async _ => {

      });

      await this.deleteOpcionCuestionarioFinal(id).then(async _ => {

      });

      for (let i = 0; i < data.pregunta_tutorial.length; i++) {
        await this.deletePreguntaUnirColor(data.pregunta_tutorial[i].id).then(async _ => {

        });
      }

      for (let i = 0; i < data.ejercicios.length; i++) {
        for (let j = 0; j < data.ejercicios[i].length; j++) {
          await this.deletePreguntaUnirColor(data.ejercicios[i][j].id).then(async _ => {

          });
        }
      }

      //a continuación, borramos el ejercicio
      return this.database.executeSql('DELETE FROM juegoUnirCol WHERE id = ?', [id]).then(_ => {
        this.loadJuegosUnirColor();
      });

    });

  }


  async updateJuegoUnirColor(juego: JuegoUnir) {

    let ejercicios: PreguntaUnir[][] = [];
    let preguntaAux: PreguntaUnir[] = [];
    let numEjer = 1;
    let preguntasTutorial: PreguntaUnir[] = [];

    //obtenemos las preguntas del juego

    await this.getPreguntaUnirColor(juego.id).then(async preguntas => {

      console.log('en updateJuego preguntas.length ' + preguntas.length);

      for (let i = 0; i < preguntas.length; i++) {

        //ejercicios
        if (preguntas[i].numEjer != 0) {
          if (preguntas[i].numEjer == numEjer) {

            preguntaAux.push(preguntas[i]);
          }

          else {
            numEjer++;
            ejercicios.push(preguntaAux);

            preguntaAux = [];
            preguntaAux.push(preguntas[i]);

          }

          if (i == (preguntas.length - 1))
            ejercicios.push(preguntaAux);
        }

        //tutorial
        else {
          preguntasTutorial.push(preguntas[i]);

        }

      }

    });




    for (let i = 0; i < preguntasTutorial.length; i++) {
      let borrada = true;

      for (let j = 0; j < juego.pregunta_tutorial.length; j++) {

        if (preguntasTutorial[i].id == juego.pregunta_tutorial[j].id) {
          await this.updatePreguntaUnirColor(juego.pregunta_tutorial[i]).then(async _ => { });
          borrada = false;
        }

      }

      if (borrada)
        await this.deletePreguntaUnirColor(preguntasTutorial[i].id).then(async _ => { });
    }

    console.log('ejercicios.length: ' + ejercicios.length);
    console.log('juego.ejercicios.length: ' + juego.ejercicios.length);

    for (let i = 0; i < ejercicios.length; i++) {
      for (let j = 0; j < ejercicios.length; j++) {
        let borrada = true;

        for (let k = 0; k < juego.ejercicios.length; k++) {
          for (let l = 0; l < juego.ejercicios.length; l++) {

            if (ejercicios[i][j].id == juego.ejercicios[k][l].id) {
              await this.updatePreguntaUnirColor(juego.ejercicios[k][l]).then(async _ => { });
              borrada = false;
            }
          }
        }

        if (borrada) {
          console.log(borrada);
          await this.deletePreguntaUnirColor(ejercicios[i][j].id).then(async _ => { });
        }
      }
    }

    console.log('nomreee: ' + juego.nombre);

    let data = [juego.nombre, juego.portada, juego.tipo, juego.instrucciones, Number(juego.tutorial), juego.descrip_tutorial,
    Number(juego.efectos_sonido), Number(juego.refPositivo), Number(juego.refNegativo), Number(juego.resultadoNum),
    Number(juego.resultadoPicto), juego.imgRefPositivo, juego.imgRefNegativo, Number(juego.cuestionarioFinal), juego.cuestionarioFinalPregunta, juego.id];


    return await this.database.executeSql('UPDATE juegoUnirCol SET nombre = ?, portada = ?, tipo = ?, instrucciones = ?, tutorial = ?, descrip_tutorial = ?, efectos_sonido = ?, refPositivo = ?, refNegativo = ?, resultadoNum = ?, resultadoPicto = ?, imgRefPositivo = ?, imgRefNegativo = ?, cuestionarioFinal = ?, cuestionarioFinalPregunta = ?  WHERE id = ?', data).then(async data => {
      await this.loadJuegosUnirColor();
    })

  }




  getJuegosBuscarIntruso(): Observable<JuegoBuscarIntruso[]> {
    return this.juegosBuscarIntruso.asObservable();
  }

  addJuegoBuscarIntruso(nombre: string, portada: string, tipo: string, instrucciones: string, tutorial: boolean, descrip_tutorial: string, efectos_sonido: boolean, sonidos: string[], refPositivo: boolean, refNegativo: boolean, resultadoNum: boolean, resultadoPicto: boolean, imgRefPositivo: string, imgRefNegativo: string, cuestionarioFinal: boolean, cuestionarioFinalPregunta: string, opcionesCuestionarioFinal: OpcionCuestionarioFinal[], preguntasTutorial: PreguntaBuscarIntruso[], ejercicios: PreguntaBuscarIntruso[][]) {
    let data = [nombre, portada, tipo, instrucciones, Number(tutorial), descrip_tutorial, Number(efectos_sonido), Number(refPositivo), Number(refNegativo), Number(resultadoNum), Number(resultadoPicto), imgRefPositivo, imgRefNegativo, Number(cuestionarioFinal), cuestionarioFinalPregunta];
    return this.database.executeSql('INSERT INTO juegoBuscarIntruso (nombre, portada, tipo, instrucciones, tutorial, descrip_tutorial, efectos_sonido, refPositivo, refNegativo,  resultadoNum, resultadoPicto, imgRefPositivo, imgRefNegativo, cuestionarioFinal, cuestionarioFinalPregunta ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(async (data1) => {

      console.log('en addJuegoUnirColor +  opcionesCuestionarioFinal.length: ' + opcionesCuestionarioFinal.length);

      for (let i = 0; i < opcionesCuestionarioFinal.length; i++) {

        await this.addOpcionCuestionarioFinal(data1.insertId, opcionesCuestionarioFinal[i].img, opcionesCuestionarioFinal[i].texto).then(async dataOpciones => {

        });
      }

      console.log('en addJuegoUnirColor +  sonidos.length: ' + sonidos.length);

      for (let i = 0; i < sonidos.length; i++) {
        await this.addSonido(data1.insertId, sonidos[i]).then(async _ => {
        });
      }

      console.log('en addJuegoUnirColor +  preguntasTutorial.length: ' + preguntasTutorial.length);

      for (let i = 0; i < preguntasTutorial.length; i++) {
        await this.addPreguntasBuscarIntruso(data1.insertId, preguntasTutorial[i].img, preguntasTutorial[i].texto, preguntasTutorial[i].intruso, preguntasTutorial[i].numEjer).then(async _ => {

        });
      }

      console.log('en addJuegoUnirColor +  ejercicios.length: ' + ejercicios.length);

      for (let i = 0; i < ejercicios.length; i++) {
        for (let j = 0; j < ejercicios[i].length; j++) {
          await this.addPreguntasBuscarIntruso(data1.insertId, ejercicios[i][i].img, ejercicios[i][j].texto, ejercicios[i][j].intruso, ejercicios[i][j].numEjer).then(async _ => {

          });
        }
      }

      this.loadJuegosBuscarIntruso();

    });

  }

  async loadJuegosBuscarIntruso() {
    return await this.database.executeSql('SELECT * FROM juegoBuscarIntruso', []).then(async data => {

      await this.loadPreguntasBuscarIntruso();
      let juegos: JuegoBuscarIntruso[] = [];
      let sonidos: string[] = [];
      let ejercicios: PreguntaBuscarIntruso[][] = [];
      let preguntas: PreguntaBuscarIntruso[] = [];
      let preguntaAux: PreguntaBuscarIntruso[] = [];
      let numEjer = 1;
      let preguntasTutorial: PreguntaBuscarIntruso[] = [];
      let opcionesCuestionarioFinal: OpcionCuestionarioFinal[] = [];


      if (data.rows.length > 0) {


        for (var i = 0; i < data.rows.length; i++) {


          sonidos = await this.getSonido(data.rows.item(i).id);

          console.log('en loadJuegosUnirColor +  sonidos.length: ' + sonidos.length);
          console.log('en loadJuegosUnirColor +  sonidos: ' + sonidos);

          preguntas = await this.getPreguntaBuscarIntruso(data.rows.item(i).id);

          console.log('en preguntas +  preguntas.length: ' + preguntas.length);

          opcionesCuestionarioFinal = await this.getOpcionCuestionarioFinal(data.rows.item(i).id);

          console.log('en opcionesCuestionarioFinal +  opcionesCuestionarioFinal.length: ' + opcionesCuestionarioFinal.length);
          console.log('en opcionesCuestionarioFinal +  opcionesCuestionarioFinal: ' + opcionesCuestionarioFinal);

          for (let i = 0; i < preguntas.length; i++) {

            //ejercicios
            if (preguntas[i].numEjer != 0) {
              if (preguntas[i].numEjer == numEjer) {

                preguntaAux.push(preguntas[i]);
              }

              else {
                numEjer++;
                ejercicios.push(preguntaAux);


                preguntaAux = [];
                preguntaAux.push(preguntas[i]);

              }

              if (i == (preguntas.length - 1)) {

                ejercicios.push(preguntaAux);

              }
            }

            //tutorial
            else {
              preguntasTutorial.push(preguntas[i]);

            }

          }

          juegos.push(new JuegoBuscarIntruso(data.rows.item(i).id, data.rows.item(i).nombre,
            data.rows.item(i).portada, data.rows.item(i).tipo, data.rows.item(i).instrucciones, data.rows.item(i).tutorial,
            data.rows.item(i).descrip_tutorial, data.rows.item(i).efectos_sonido, sonidos, data.rows.item(i).refPositivo,
            data.rows.item(i).refNegativo, data.rows.item(i).resultadoNum, data.rows.item(i).resultadoPicto, data.rows.item(i).imgRefPositivo,
            data.rows.item(i).imgRefNegativo, data.rows.item(i).cuestionarioFinal, data.rows.item(i).cuestionarioFinalPregunta, opcionesCuestionarioFinal, preguntasTutorial,
            ejercicios
          ));

          ejercicios = [];
          sonidos = [];
          opcionesCuestionarioFinal = [];
          preguntasTutorial = [];
          preguntaAux = [];
          numEjer = 1;
        }
      }
      this.juegosBuscarIntruso.next(juegos);
    });
  }


  async getJuegoBuscarIntruso(id): Promise<JuegoBuscarIntruso> {

    return await this.database.executeSql('SELECT * FROM juegoBuscarIntruso WHERE id = ?', [id]).then(async data => {

      let sonidos: string[] = [];
      let preguntas: PreguntaBuscarIntruso[] = [];
      let ejercicios: PreguntaBuscarIntruso[][] = [];
      let preguntaAux: PreguntaBuscarIntruso[] = [];
      let numEjer = 1;
      let preguntasTutorial: PreguntaBuscarIntruso[] = [];
      let opcionesCuestionarioFinal: OpcionCuestionarioFinal[] = [];

      //obtenemos las opciones del cuestionario final
      opcionesCuestionarioFinal = await this.getOpcionCuestionarioFinal(id);

      //obtenemos los sonidos
      sonidos = await this.getSonido(id);

      //obtenemos las preguntas del juego

      preguntas = await this.getPreguntaBuscarIntruso(id);

      for (let i = 0; i < preguntas.length; i++) {

        //ejercicios
        if (preguntas[i].numEjer != 0) {
          if (preguntas[i].numEjer == numEjer) {

            preguntaAux.push(preguntas[i]);
          }

          else {
            numEjer++;
            ejercicios.push(preguntaAux);

            preguntaAux = [];
            preguntaAux.push(preguntas[i]);

          }

          if (i == (preguntas.length - 1))
            ejercicios.push(preguntaAux);
        }

        //tutorial
        else {
          preguntasTutorial.push(preguntas[i]);

        }

      }

      return new JuegoBuscarIntruso(data.rows.item(0).id, data.rows.item(0).nombre,
        data.rows.item(0).portada, data.rows.item(0).tipo, data.rows.item(0).instrucciones, data.rows.item(0).tutorial,
        data.rows.item(0).descrip_tutorial, data.rows.item(0).efectos_sonido, sonidos, data.rows.item(0).refPositivo,
        data.rows.item(0).refNegativo, data.rows.item(0).resultadoNum, data.rows.item(0).resultadoPicto, data.rows.item(0).imgRefPositivo,
        data.rows.item(0).imgRefNegativo, data.rows.item(0).cuestionarioFinal, data.rows.item(0).cuestionarioFinalPregunta, opcionesCuestionarioFinal, preguntasTutorial, ejercicios)
    });
  }

  async deleteJuegoBuscarIntruso(id) {

    //primero eliminamos sus elementos vinculadas
    return await this.getJuegoBuscarIntruso(id).then(async data => {


      await this.deleteSonidosJuego(id).then(async _ => {

      });

      await this.deleteOpcionCuestionarioFinal(id).then(async _ => {

      });

      for (let i = 0; i < data.pregunta_tutorial.length; i++) {
        await this.deletePreguntaBuscarIntruso(data.pregunta_tutorial[i].id).then(async _ => {

        });
      }

      for (let i = 0; i < data.ejercicios.length; i++) {
        for (let j = 0; j < data.ejercicios[i].length; j++) {
          await this.deletePreguntaBuscarIntruso(data.ejercicios[i][j].id).then(async _ => {

          });
        }
      }

      //a continuación, borramos el ejercicio
      return this.database.executeSql('DELETE FROM juegoBuscarIntruso WHERE id = ?', [id]).then(_ => {
        this.loadJuegosBuscarIntruso();
      });

    });

  }


  async updateJuegoBuscarIntruso(juego: JuegoBuscarIntruso) {

    let ejercicios: PreguntaBuscarIntruso[][] = [];
    let preguntaAux: PreguntaBuscarIntruso[] = [];
    let numEjer = 1;
    let preguntasTutorial: PreguntaBuscarIntruso[] = [];

    //obtenemos las preguntas del juego

    await this.getPreguntaBuscarIntruso(juego.id).then(async preguntas => {

      console.log('en updateJuego preguntas.length ' + preguntas.length);

      for (let i = 0; i < preguntas.length; i++) {

        //ejercicios
        if (preguntas[i].numEjer != 0) {
          if (preguntas[i].numEjer == numEjer) {

            preguntaAux.push(preguntas[i]);
          }

          else {
            numEjer++;
            ejercicios.push(preguntaAux);

            preguntaAux = [];
            preguntaAux.push(preguntas[i]);

          }

          if (i == (preguntas.length - 1))
            ejercicios.push(preguntaAux);
        }

        //tutorial
        else {
          preguntasTutorial.push(preguntas[i]);

        }

      }

    });




    for (let i = 0; i < preguntasTutorial.length; i++) {
      let borrada = true;

      for (let j = 0; j < juego.pregunta_tutorial.length; j++) {

        if (preguntasTutorial[i].id == juego.pregunta_tutorial[j].id) {
          await this.updatePreguntaBuscarIntruso(juego.pregunta_tutorial[i]).then(async _ => { });
          borrada = false;
        }

      }

      if (borrada)
        await this.deletePreguntaBuscarIntruso(preguntasTutorial[i].id).then(async _ => { });
    }

    console.log('ejercicios.length: ' + ejercicios.length);
    console.log('juego.ejercicios.length: ' + juego.ejercicios.length);

    for (let i = 0; i < ejercicios.length; i++) {
      for (let j = 0; j < ejercicios.length; j++) {
        let borrada = true;

        for (let k = 0; k < juego.ejercicios.length; k++) {
          for (let l = 0; l < juego.ejercicios.length; l++) {

            if (ejercicios[i][j].id == juego.ejercicios[k][l].id) {
              await this.updatePreguntaBuscarIntruso(juego.ejercicios[k][l]).then(async _ => { });
              borrada = false;
            }
          }
        }

        if (borrada) {
          console.log(borrada);
          await this.deletePreguntaBuscarIntruso(ejercicios[i][j].id).then(async _ => { });
        }
      }
    }

    console.log('nomreee: ' + juego.nombre);

    let data = [juego.nombre, juego.portada, juego.tipo, juego.instrucciones, Number(juego.tutorial), juego.descrip_tutorial,
    Number(juego.efectos_sonido), Number(juego.refPositivo), Number(juego.refNegativo), Number(juego.resultadoNum),
    Number(juego.resultadoPicto), juego.imgRefPositivo, juego.imgRefNegativo, Number(juego.cuestionarioFinal), juego.cuestionarioFinalPregunta, juego.id];


    return await this.database.executeSql('UPDATE juegoBuscarIntruso SET nombre = ?, portada = ?, tipo = ?, instrucciones = ?, tutorial = ?, descrip_tutorial = ?, efectos_sonido = ?, refPositivo = ?, refNegativo = ?, resultadoNum = ?, resultadoPicto = ?, imgRefPositivo = ?, imgRefNegativo = ?, cuestionarioFinal = ?, cuestionarioFinalPregunta = ?  WHERE id = ?', data).then(async data => {
      await this.loadJuegosBuscarIntruso();
    })

  }




  getJuegosAsociar(): Observable<JuegoAsociar[]> {
    return this.juegosAsociar.asObservable();
  }

  addJuegoAsociar(nombre: string, portada: string, tipo: string, instrucciones: string, tutorial: boolean, descrip_tutorial: string, efectos_sonido: boolean, sonidos: string[], refPositivo: boolean, refNegativo: boolean, resultadoNum: boolean, resultadoPicto: boolean, imgRefPositivo: string, imgRefNegativo: string, cuestionarioFinal: boolean, cuestionarioFinalPregunta: string, opcionesCuestionarioFinal: OpcionCuestionarioFinal[], preguntasTutorial: PreguntaAsociar[], ejercicios: PreguntaAsociar[][]) {
    let data = [nombre, portada, tipo, instrucciones, Number(tutorial), descrip_tutorial, Number(efectos_sonido), Number(refPositivo), Number(refNegativo), Number(resultadoNum), Number(resultadoPicto), imgRefPositivo, imgRefNegativo, Number(cuestionarioFinal), cuestionarioFinalPregunta];
    return this.database.executeSql('INSERT INTO juegoAsociar (nombre, portada, tipo, instrucciones, tutorial, descrip_tutorial, efectos_sonido, refPositivo, refNegativo,  resultadoNum, resultadoPicto, imgRefPositivo, imgRefNegativo, cuestionarioFinal, cuestionarioFinalPregunta ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(async (data1) => {

      console.log('en addJuegoUnirColor +  opcionesCuestionarioFinal.length: ' + opcionesCuestionarioFinal.length);

      for (let i = 0; i < opcionesCuestionarioFinal.length; i++) {

        await this.addOpcionCuestionarioFinal(data1.insertId, opcionesCuestionarioFinal[i].img, opcionesCuestionarioFinal[i].texto).then(async dataOpciones => {

        });
      }

      console.log('en addJuegoUnirColor +  sonidos.length: ' + sonidos.length);

      for (let i = 0; i < sonidos.length; i++) {
        await this.addSonido(data1.insertId, sonidos[i]).then(async _ => {
        });
      }

      console.log('en addJuegoUnirColor +  preguntasTutorial.length: ' + preguntasTutorial.length);

      for (let i = 0; i < preguntasTutorial.length; i++) {
        await this.addPreguntasAsociar(data1.insertId, preguntasTutorial[i].img, preguntasTutorial[i].texto, preguntasTutorial[i].tipo, preguntasTutorial[i].opcionCorrecta, preguntasTutorial[i].numEjer).then(async _ => {

        });
      }

      console.log('en addJuegoUnirColor +  ejercicios.length: ' + ejercicios.length);

      for (let i = 0; i < ejercicios.length; i++) {
        for (let j = 0; j < ejercicios[i].length; j++) {
          await this.addPreguntasAsociar(data1.insertId, ejercicios[i][i].img, ejercicios[i][j].texto, ejercicios[i][j].tipo, ejercicios[i][j].opcionCorrecta, ejercicios[i][j].numEjer).then(async _ => {

          });
        }
      }

      this.loadJuegosAsociar();

    });

  }

  async loadJuegosAsociar() {
    return await this.database.executeSql('SELECT * FROM juegoAsociar', []).then(async data => {

      await this.loadPreguntasAsociar();
      let juegos: JuegoAsociar[] = [];
      let sonidos: string[] = [];
      let ejercicios: PreguntaAsociar[][] = [];
      let preguntas: PreguntaAsociar[] = [];
      let preguntaAux: PreguntaAsociar[] = [];
      let numEjer = 1;
      let preguntasTutorial: PreguntaAsociar[] = [];
      let opcionesCuestionarioFinal: OpcionCuestionarioFinal[] = [];


      if (data.rows.length > 0) {


        for (var i = 0; i < data.rows.length; i++) {


          sonidos = await this.getSonido(data.rows.item(i).id);

          console.log('en loadJuegosUnirColor +  sonidos.length: ' + sonidos.length);
          console.log('en loadJuegosUnirColor +  sonidos: ' + sonidos);

          preguntas = await this.getPreguntaAsociar(data.rows.item(i).id);

          console.log('en preguntas +  preguntas.length: ' + preguntas.length);

          opcionesCuestionarioFinal = await this.getOpcionCuestionarioFinal(data.rows.item(i).id);

          console.log('en opcionesCuestionarioFinal +  opcionesCuestionarioFinal.length: ' + opcionesCuestionarioFinal.length);
          console.log('en opcionesCuestionarioFinal +  opcionesCuestionarioFinal: ' + opcionesCuestionarioFinal);

          for (let i = 0; i < preguntas.length; i++) {

            //ejercicios
            if (preguntas[i].numEjer != 0) {
              if (preguntas[i].numEjer == numEjer) {

                preguntaAux.push(preguntas[i]);
              }

              else {
                numEjer++;
                ejercicios.push(preguntaAux);


                preguntaAux = [];
                preguntaAux.push(preguntas[i]);

              }

              if (i == (preguntas.length - 1)) {

                ejercicios.push(preguntaAux);

              }
            }

            //tutorial
            else {
              preguntasTutorial.push(preguntas[i]);

            }

          }

          juegos.push(new JuegoAsociar(data.rows.item(i).id, data.rows.item(i).nombre,
            data.rows.item(i).portada, data.rows.item(i).tipo, data.rows.item(i).instrucciones, data.rows.item(i).tutorial,
            data.rows.item(i).descrip_tutorial, data.rows.item(i).efectos_sonido, sonidos, data.rows.item(i).refPositivo,
            data.rows.item(i).refNegativo, data.rows.item(i).resultadoNum, data.rows.item(i).resultadoPicto, data.rows.item(i).imgRefPositivo,
            data.rows.item(i).imgRefNegativo, data.rows.item(i).cuestionarioFinal, data.rows.item(i).cuestionarioFinalPregunta, opcionesCuestionarioFinal, preguntasTutorial,
            ejercicios
          ));

          ejercicios = [];
          sonidos = [];
          opcionesCuestionarioFinal = [];
          preguntasTutorial = [];
          preguntaAux = [];
          numEjer = 1;
        }
      }
      this.juegosAsociar.next(juegos);
    });
  }


  async getJuegoAsociar(id): Promise<JuegoAsociar> {

    return await this.database.executeSql('SELECT * FROM juegoAsociar WHERE id = ?', [id]).then(async data => {

      let sonidos: string[] = [];
      let preguntas: PreguntaAsociar[] = [];
      let ejercicios: PreguntaAsociar[][] = [];
      let preguntaAux: PreguntaAsociar[] = [];
      let numEjer = 1;
      let preguntasTutorial: PreguntaAsociar[] = [];
      let opcionesCuestionarioFinal: OpcionCuestionarioFinal[] = [];

      //obtenemos las opciones del cuestionario final
      opcionesCuestionarioFinal = await this.getOpcionCuestionarioFinal(id);

      //obtenemos los sonidos
      sonidos = await this.getSonido(id);

      //obtenemos las preguntas del juego

      preguntas = await this.getPreguntaAsociar(id);

      for (let i = 0; i < preguntas.length; i++) {

        //ejercicios
        if (preguntas[i].numEjer != 0) {
          if (preguntas[i].numEjer == numEjer) {

            preguntaAux.push(preguntas[i]);
          }

          else {
            numEjer++;
            ejercicios.push(preguntaAux);

            preguntaAux = [];
            preguntaAux.push(preguntas[i]);

          }

          if (i == (preguntas.length - 1))
            ejercicios.push(preguntaAux);
        }

        //tutorial
        else {
          preguntasTutorial.push(preguntas[i]);

        }

      }

      return new JuegoAsociar(data.rows.item(0).id, data.rows.item(0).nombre,
        data.rows.item(0).portada, data.rows.item(0).tipo, data.rows.item(0).instrucciones, data.rows.item(0).tutorial,
        data.rows.item(0).descrip_tutorial, data.rows.item(0).efectos_sonido, sonidos, data.rows.item(0).refPositivo,
        data.rows.item(0).refNegativo, data.rows.item(0).resultadoNum, data.rows.item(0).resultadoPicto, data.rows.item(0).imgRefPositivo,
        data.rows.item(0).imgRefNegativo, data.rows.item(0).cuestionarioFinal, data.rows.item(0).cuestionarioFinalPregunta, opcionesCuestionarioFinal, preguntasTutorial, ejercicios)
    });
  }

  async deleteJuegoAsociar(id) {

    //primero eliminamos sus elementos vinculadas
    return await this.getJuegoAsociar(id).then(async data => {


      await this.deleteSonidosJuego(id).then(async _ => {

      });

      await this.deleteOpcionCuestionarioFinal(id).then(async _ => {

      });

      for (let i = 0; i < data.pregunta_tutorial.length; i++) {
        await this.deletePreguntaAsociar(data.pregunta_tutorial[i].id).then(async _ => {

        });
      }

      for (let i = 0; i < data.ejercicios.length; i++) {
        for (let j = 0; j < data.ejercicios[i].length; j++) {
          await this.deletePreguntaAsociar(data.ejercicios[i][j].id).then(async _ => {

          });
        }
      }

      //a continuación, borramos el ejercicio
      return this.database.executeSql('DELETE FROM juegoAsociar WHERE id = ?', [id]).then(_ => {
        this.loadJuegosAsociar();
      });

    });

  }


  async updateJuegoAsociar(juego: JuegoAsociar) {

    let ejercicios: PreguntaAsociar[][] = [];
    let preguntaAux: PreguntaAsociar[] = [];
    let numEjer = 1;
    let preguntasTutorial: PreguntaAsociar[] = [];

    //obtenemos las preguntas del juego

    await this.getPreguntaAsociar(juego.id).then(async preguntas => {

      console.log('en updateJuego preguntas.length ' + preguntas.length);

      for (let i = 0; i < preguntas.length; i++) {

        //ejercicios
        if (preguntas[i].numEjer != 0) {
          if (preguntas[i].numEjer == numEjer) {

            preguntaAux.push(preguntas[i]);
          }

          else {
            numEjer++;
            ejercicios.push(preguntaAux);

            preguntaAux = [];
            preguntaAux.push(preguntas[i]);

          }

          if (i == (preguntas.length - 1))
            ejercicios.push(preguntaAux);
        }

        //tutorial
        else {
          preguntasTutorial.push(preguntas[i]);

        }

      }

    });




    for (let i = 0; i < preguntasTutorial.length; i++) {
      let borrada = true;

      for (let j = 0; j < juego.pregunta_tutorial.length; j++) {

        if (preguntasTutorial[i].id == juego.pregunta_tutorial[j].id) {
          await this.updatePreguntaAsociar(juego.pregunta_tutorial[i]).then(async _ => { });
          borrada = false;
        }

      }

      if (borrada)
        await this.deletePreguntaAsociar(preguntasTutorial[i].id).then(async _ => { });
    }

    console.log('ejercicios.length: ' + ejercicios.length);
    console.log('juego.ejercicios.length: ' + juego.ejercicios.length);

    for (let i = 0; i < ejercicios.length; i++) {
      for (let j = 0; j < ejercicios.length; j++) {
        let borrada = true;

        for (let k = 0; k < juego.ejercicios.length; k++) {
          for (let l = 0; l < juego.ejercicios.length; l++) {

            if (ejercicios[i][j].id == juego.ejercicios[k][l].id) {
              await this.updatePreguntaAsociar(juego.ejercicios[k][l]).then(async _ => { });
              borrada = false;
            }
          }
        }

        if (borrada) {
          console.log(borrada);
          await this.deletePreguntaAsociar(ejercicios[i][j].id).then(async _ => { });
        }
      }
    }

    console.log('nomreee: ' + juego.nombre);

    let data = [juego.nombre, juego.portada, juego.tipo, juego.instrucciones, Number(juego.tutorial), juego.descrip_tutorial,
    Number(juego.efectos_sonido), Number(juego.refPositivo), Number(juego.refNegativo), Number(juego.resultadoNum),
    Number(juego.resultadoPicto), juego.imgRefPositivo, juego.imgRefNegativo, Number(juego.cuestionarioFinal), juego.cuestionarioFinalPregunta, juego.id];


    return await this.database.executeSql('UPDATE juegoAsociar SET nombre = ?, portada = ?, tipo = ?, instrucciones = ?, tutorial = ?, descrip_tutorial = ?, efectos_sonido = ?, refPositivo = ?, refNegativo = ?, resultadoNum = ?, resultadoPicto = ?, imgRefPositivo = ?, imgRefNegativo = ?, cuestionarioFinal = ?, cuestionarioFinalPregunta = ?  WHERE id = ?', data).then(async data => {
      await this.loadJuegosAsociar();
    })

  }






  getJuegosUnirPareja(): Observable<JuegoUnirPareja[]> {
    return this.juegosUnirPareja.asObservable();
  }

  addJuegoUnirPareja(nombre: string, portada: string, tipo: string, instrucciones: string, tutorial: boolean, descrip_tutorial: string, efectos_sonido: boolean, sonidos: string[], refPositivo: boolean, refNegativo: boolean, resultadoNum: boolean, resultadoPicto: boolean, imgRefPositivo: string, imgRefNegativo: string, cuestionarioFinal: boolean, cuestionarioFinalPregunta: string, opcionesCuestionarioFinal: OpcionCuestionarioFinal[], preguntasTutorial: PreguntaUnirPareja[], ejercicios: PreguntaUnirPareja[][]) {
    let data = [nombre, portada, tipo, instrucciones, Number(tutorial), descrip_tutorial, Number(efectos_sonido), Number(refPositivo), Number(refNegativo), Number(resultadoNum), Number(resultadoPicto), imgRefPositivo, imgRefNegativo, Number(cuestionarioFinal), cuestionarioFinalPregunta];
    return this.database.executeSql('INSERT INTO juegoUnirPareja (nombre, portada, tipo, instrucciones, tutorial, descrip_tutorial, efectos_sonido, refPositivo, refNegativo,  resultadoNum, resultadoPicto, imgRefPositivo, imgRefNegativo, cuestionarioFinal, cuestionarioFinalPregunta ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', data).then(async (data1) => {

      console.log('en addJuegoUnirColor +  opcionesCuestionarioFinal.length: ' + opcionesCuestionarioFinal.length);

      for (let i = 0; i < opcionesCuestionarioFinal.length; i++) {

        await this.addOpcionCuestionarioFinal(data1.insertId, opcionesCuestionarioFinal[i].img, opcionesCuestionarioFinal[i].texto).then(async dataOpciones => {

        });
      }

      console.log('en addJuegoUnirColor +  sonidos.length: ' + sonidos.length);

      for (let i = 0; i < sonidos.length; i++) {
        await this.addSonido(data1.insertId, sonidos[i]).then(async _ => {
        });
      }

      console.log('en addJuegoUnirColor +  preguntasTutorial.length: ' + preguntasTutorial.length);

      for (let i = 0; i < preguntasTutorial.length; i++) {
        await this.addPreguntasUnirPareja(data1.insertId, preguntasTutorial[i].img_1, preguntasTutorial[i].texto_1, preguntasTutorial[i].img_2, preguntasTutorial[i].texto_2, preguntasTutorial[i].numEjer).then(async _ => {

        });
      }

      console.log('en addJuegoUnirColor +  ejercicios.length: ' + ejercicios.length);

      for (let i = 0; i < ejercicios.length; i++) {
        for (let j = 0; j < ejercicios[i].length; j++) {
          await this.addPreguntasUnirPareja(data1.insertId, ejercicios[i][i].img_1, ejercicios[i][j].texto_1, ejercicios[i][j].img_2, ejercicios[i][j].texto_2, ejercicios[i][j].numEjer).then(async _ => {

          });
        }
      }

      this.loadJuegosUnirPareja();

    });

  }

  async loadJuegosUnirPareja() {
    return await this.database.executeSql('SELECT * FROM juegoUnirPareja', []).then(async data => {

      await this.loadPreguntasUnirPareja();
      let juegos: JuegoUnirPareja[] = [];
      let sonidos: string[] = [];
      let ejercicios: PreguntaUnirPareja[][] = [];
      let preguntas: PreguntaUnirPareja[] = [];
      let preguntaAux: PreguntaUnirPareja[] = [];
      let numEjer = 1;
      let preguntasTutorial: PreguntaUnirPareja[] = [];
      let opcionesCuestionarioFinal: OpcionCuestionarioFinal[] = [];


      if (data.rows.length > 0) {


        for (var i = 0; i < data.rows.length; i++) {


          sonidos = await this.getSonido(data.rows.item(i).id);

          preguntas = await this.getPreguntaUnirPareja(data.rows.item(i).id);

          console.log('en preguntas +  preguntas.length: ' + preguntas.length);

          opcionesCuestionarioFinal = await this.getOpcionCuestionarioFinal(data.rows.item(i).id);

          console.log('en opcionesCuestionarioFinal +  opcionesCuestionarioFinal.length: ' + opcionesCuestionarioFinal.length);
          console.log('en opcionesCuestionarioFinal +  opcionesCuestionarioFinal: ' + opcionesCuestionarioFinal);

          for (let i = 0; i < preguntas.length; i++) {

            //ejercicios
            if (preguntas[i].numEjer != 0) {
              if (preguntas[i].numEjer == numEjer) {

                preguntaAux.push(preguntas[i]);
              }

              else {
                numEjer++;
                ejercicios.push(preguntaAux);


                preguntaAux = [];
                preguntaAux.push(preguntas[i]);

              }

              if (i == (preguntas.length - 1)) {

                ejercicios.push(preguntaAux);

              }
            }

            //tutorial
            else {
              preguntasTutorial.push(preguntas[i]);

            }

          }

          juegos.push(new JuegoUnirPareja(data.rows.item(i).id, data.rows.item(i).nombre,
            data.rows.item(i).portada, data.rows.item(i).tipo, data.rows.item(i).instrucciones, data.rows.item(i).tutorial,
            data.rows.item(i).descrip_tutorial, data.rows.item(i).efectos_sonido, sonidos, data.rows.item(i).refPositivo,
            data.rows.item(i).refNegativo, data.rows.item(i).resultadoNum, data.rows.item(i).resultadoPicto, data.rows.item(i).imgRefPositivo,
            data.rows.item(i).imgRefNegativo, data.rows.item(i).cuestionarioFinal, data.rows.item(i).cuestionarioFinalPregunta, opcionesCuestionarioFinal, preguntasTutorial,
            ejercicios
          ));

          ejercicios = [];
          sonidos = [];
          opcionesCuestionarioFinal = [];
          preguntasTutorial = [];
          preguntaAux = [];
          numEjer = 1;
        }
      }
      this.juegosUnirPareja.next(juegos);
    });
  }


  async getJuegoUnirPareja(id): Promise<JuegoUnirPareja> {

    return await this.database.executeSql('SELECT * FROM juegoUnirPareja WHERE id = ?', [id]).then(async data => {

      let sonidos: string[] = [];
      let preguntas: PreguntaUnirPareja[] = [];
      let ejercicios: PreguntaUnirPareja[][] = [];
      let preguntaAux: PreguntaUnirPareja[] = [];
      let numEjer = 1;
      let preguntasTutorial: PreguntaUnirPareja[] = [];
      let opcionesCuestionarioFinal: OpcionCuestionarioFinal[] = [];

      //obtenemos las opciones del cuestionario final
      opcionesCuestionarioFinal = await this.getOpcionCuestionarioFinal(id);

      //obtenemos los sonidos
      sonidos = await this.getSonido(id);

      //obtenemos las preguntas del juego

      preguntas = await this.getPreguntaUnirPareja(id);

      for (let i = 0; i < preguntas.length; i++) {

        //ejercicios
        if (preguntas[i].numEjer != 0) {
          if (preguntas[i].numEjer == numEjer) {

            preguntaAux.push(preguntas[i]);
          }

          else {
            numEjer++;
            ejercicios.push(preguntaAux);

            preguntaAux = [];
            preguntaAux.push(preguntas[i]);

          }

          if (i == (preguntas.length - 1))
            ejercicios.push(preguntaAux);
        }

        //tutorial
        else {
          preguntasTutorial.push(preguntas[i]);

        }

      }

      return new JuegoUnirPareja(data.rows.item(0).id, data.rows.item(0).nombre,
        data.rows.item(0).portada, data.rows.item(0).tipo, data.rows.item(0).instrucciones, data.rows.item(0).tutorial,
        data.rows.item(0).descrip_tutorial, data.rows.item(0).efectos_sonido, sonidos, data.rows.item(0).refPositivo,
        data.rows.item(0).refNegativo, data.rows.item(0).resultadoNum, data.rows.item(0).resultadoPicto, data.rows.item(0).imgRefPositivo,
        data.rows.item(0).imgRefNegativo, data.rows.item(0).cuestionarioFinal, data.rows.item(0).cuestionarioFinalPregunta, opcionesCuestionarioFinal, preguntasTutorial, ejercicios)
    });
  }

  async deleteJuegoUnirPareja(id) {

    //primero eliminamos sus elementos vinculadas
    return await this.getJuegoUnirPareja(id).then(async data => {


      await this.deleteSonidosJuego(id).then(async _ => {

      });

      await this.deleteOpcionCuestionarioFinal(id).then(async _ => {

      });

      for (let i = 0; i < data.pregunta_tutorial.length; i++) {
        await this.deletePreguntaUnirPareja(data.pregunta_tutorial[i].id).then(async _ => {

        });
      }

      for (let i = 0; i < data.ejercicios.length; i++) {
        for (let j = 0; j < data.ejercicios[i].length; j++) {
          await this.deletePreguntaUnirPareja(data.ejercicios[i][j].id).then(async _ => {

          });
        }
      }

      //a continuación, borramos el ejercicio
      return this.database.executeSql('DELETE FROM juegoUnirPareja WHERE id = ?', [id]).then(_ => {
        this.loadJuegosUnirPareja();
      });

    });

  }


  async updateJuegoUnirPareja(juego: JuegoUnirPareja) {

    let ejercicios: PreguntaUnirPareja[][] = [];
    let preguntaAux: PreguntaUnirPareja[] = [];
    let numEjer = 1;
    let preguntasTutorial: PreguntaUnirPareja[] = [];

    //obtenemos las preguntas del juego

    await this.getPreguntaUnirPareja(juego.id).then(async preguntas => {

      console.log('en updateJuego preguntas.length ' + preguntas.length);

      for (let i = 0; i < preguntas.length; i++) {

        //ejercicios
        if (preguntas[i].numEjer != 0) {
          if (preguntas[i].numEjer == numEjer) {

            preguntaAux.push(preguntas[i]);
          }

          else {
            numEjer++;
            ejercicios.push(preguntaAux);

            preguntaAux = [];
            preguntaAux.push(preguntas[i]);

          }

          if (i == (preguntas.length - 1))
            ejercicios.push(preguntaAux);
        }

        //tutorial
        else {
          preguntasTutorial.push(preguntas[i]);

        }

      }

    });




    for (let i = 0; i < preguntasTutorial.length; i++) {
      let borrada = true;

      for (let j = 0; j < juego.pregunta_tutorial.length; j++) {

        if (preguntasTutorial[i].id == juego.pregunta_tutorial[j].id) {
          await this.updatePreguntaUnirPareja(juego.pregunta_tutorial[i]).then(async _ => { });
          borrada = false;
        }

      }

      if (borrada)
        await this.deletePreguntaUnirPareja(preguntasTutorial[i].id).then(async _ => { });
    }

    console.log('ejercicios.length: ' + ejercicios.length);
    console.log('juego.ejercicios.length: ' + juego.ejercicios.length);

    for (let i = 0; i < ejercicios.length; i++) {
      for (let j = 0; j < ejercicios.length; j++) {
        let borrada = true;

        for (let k = 0; k < juego.ejercicios.length; k++) {
          for (let l = 0; l < juego.ejercicios.length; l++) {

            if (ejercicios[i][j].id == juego.ejercicios[k][l].id) {
              await this.updatePreguntaUnirPareja(juego.ejercicios[k][l]).then(async _ => { });
              borrada = false;
            }
          }
        }

        if (borrada) {
          console.log(borrada);
          await this.deletePreguntaUnirPareja(ejercicios[i][j].id).then(async _ => { });
        }
      }
    }

    console.log('nomreee: ' + juego.nombre);

    let data = [juego.nombre, juego.portada, juego.tipo, juego.instrucciones, Number(juego.tutorial), juego.descrip_tutorial,
    Number(juego.efectos_sonido), Number(juego.refPositivo), Number(juego.refNegativo), Number(juego.resultadoNum),
    Number(juego.resultadoPicto), juego.imgRefPositivo, juego.imgRefNegativo, Number(juego.cuestionarioFinal), juego.cuestionarioFinalPregunta, juego.id];


    return await this.database.executeSql('UPDATE juegoUnirPareja SET nombre = ?, portada = ?, tipo = ?, instrucciones = ?, tutorial = ?, descrip_tutorial = ?, efectos_sonido = ?, refPositivo = ?, refNegativo = ?, resultadoNum = ?, resultadoPicto = ?, imgRefPositivo = ?, imgRefNegativo = ?, cuestionarioFinal = ?, cuestionarioFinalPregunta = ?  WHERE id = ?', data).then(async data => {
      await this.loadJuegosUnirPareja();
    })

  }




  getPreguntasUnirColor(): Observable<PreguntaUnir[]> {
    return this.preguntaUnirColor.asObservable();
  }

  async existePreguntasUnirColor(id): Promise<Boolean> {
    return await this.database.executeSql('SELECT EXISTS (SELECT * FROM preguntaUnirColor WHERE id = ?)', [id]).then(data => {
      return !!data;
    });
  }



  loadPreguntasUnirColor() {
    return this.database.executeSql('SELECT * FROM preguntaUnirColor', []).then(data => {
      let preguntas: PreguntaUnir[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaUnir(data.rows.item(i).id, data.rows.item(i).color, data.rows.item(i).texto_color,
            data.rows.item(i).asociada, data.rows.item(i).texto_asociada, data.rows.item(i).musica,
            data.rows.item(i).numEjer
          ));
        }
      }
      this.preguntaUnirColor.next(preguntas);
      return preguntas;
    });
  }


  addPreguntasUnirColor(idJuego, color, texto_color, asociada, texto_asociada, musica, numEjer) {

    let data = [idJuego, color, texto_color, asociada, texto_asociada, musica, numEjer];
    return this.database.executeSql('INSERT INTO preguntaUnirColor ( idJuego, color, texto_color, asociada, texto_asociada, musica, numEjer) VALUES (?, ?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadPreguntasUnirColor();

    });
  }

  getPreguntaUnirColor(idJuego): Promise<PreguntaUnir[]> {
    return this.database.executeSql('SELECT * FROM preguntaUnirColor WHERE idJuego = ?', [idJuego]).then(data => {

      let preguntas: PreguntaUnir[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaUnir(data.rows.item(i).id, data.rows.item(i).color, data.rows.item(i).texto_color,
            data.rows.item(i).asociada, data.rows.item(i).texto_asociada, data.rows.item(i).musica,
            data.rows.item(i).numEjer
          ));
        }
      }

      console.log('en getPreguntaUnirColor: ' + preguntas.length);

      return preguntas;
    });
  }

  getPreguntaTutorialUnirColor(idJuego): Promise<PreguntaUnir[]> {
    return this.database.executeSql('SELECT * FROM preguntaUnirColor WHERE idJuego = ? AND numEjer = 0', [idJuego]).then(data => {

      let preguntas: PreguntaUnir[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaUnir(data.rows.item(i).id, data.rows.item(i).color, data.rows.item(i).texto_color,
            data.rows.item(i).asociada, data.rows.item(i).texto_asociada, data.rows.item(i).musica,
            data.rows.item(i).numEjer
          ));
        }
      }

      return preguntas;
    });
  }

  deletePreguntaUnirColor(id) {

    return this.database.executeSql('DELETE FROM preguntaUnirColor WHERE id = ?', [id]).then(_ => {
      this.loadPreguntasUnirColor();
    });
  }

  updatePreguntaUnirColor(pregunta: PreguntaUnir) {

    let data = [pregunta.color, pregunta.texto_color, pregunta.asociada, pregunta.texto_asociada, pregunta.musica, pregunta.numEjer, pregunta.id];

    return this.database.executeSql('UPDATE preguntaUnirColor SET color = ?, texto_color = ?, asociada = ?, texto_asociada = ?, musica = ?, numEjer = ? WHERE id = ?', data).then(data => {
      this.loadPreguntasUnirColor();
    })

  }



  getPreguntasAsociar(): Observable<PreguntaAsociar[]> {
    return this.preguntaAsociar.asObservable();
  }

  loadPreguntasAsociar() {
    return this.database.executeSql('SELECT * FROM preguntaAsociar', []).then(data => {
      let preguntas: PreguntaAsociar[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaAsociar(data.rows.item(i).id, data.rows.item(i).img, data.rows.item(i).texto,
            data.rows.item(i).correcta, data.rows.item(i).tipo, data.rows.item(i).numEjer
          ));
        }
      }
      this.preguntaAsociar.next(preguntas);
      return preguntas;
    });
  }


  addPreguntasAsociar(idJuego, img, texto, tipo, correcta, numEjer) {

    let data = [idJuego, img, texto, tipo, correcta, numEjer];
    return this.database.executeSql('INSERT INTO preguntaUnirColor ( idJuego, img, texto, correcta, tipo, numEjer) VALUES (?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadPreguntasAsociar();

    });
  }

  getPreguntaAsociar(idJuego): Promise<PreguntaAsociar[]> {
    return this.database.executeSql('SELECT * FROM preguntaAsociar WHERE idJuego = ?', [idJuego]).then(data => {

      let preguntas: PreguntaAsociar[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaAsociar(data.rows.item(i).id, data.rows.item(i).img, data.rows.item(i).texto,
            data.rows.item(i).correcta, data.rows.item(i).tipo, data.rows.item(i).numEjer
          ));
        }
      }

      return preguntas;
    });
  }

  getPreguntaTutorialAsociar(idJuego): Promise<PreguntaAsociar[]> {
    return this.database.executeSql('SELECT * FROM preguntaAsociar WHERE idJuego = ? AND numEjer = 0', [idJuego]).then(data => {

      let preguntas: PreguntaAsociar[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaAsociar(data.rows.item(i).id, data.rows.item(i).img, data.rows.item(i).texto,
            data.rows.item(i).correcta, data.rows.item(i).tipo, data.rows.item(i).numEjer
          ));
        }
      }

      return preguntas;
    });
  }

  deletePreguntaAsociar(id) {

    return this.database.executeSql('DELETE FROM preguntaAsociar WHERE id = ?', [id]).then(_ => {
      this.loadPreguntasAsociar();
    });
  }

  updatePreguntaAsociar(pregunta: PreguntaAsociar) {

    let data = [pregunta.img, pregunta.texto, pregunta.opcionCorrecta, pregunta.tipo, pregunta.numEjer, pregunta.id];

    return this.database.executeSql('UPDATE preguntaAsociar SET img = ?, texto = ?, correcta = ?, tipo = ?, numEjer = ? WHERE id = ?', data).then(data => {
      this.loadPreguntasAsociar();
    })

  }


  getPreguntasBuscarIntruso(): Observable<PreguntaBuscarIntruso[]> {
    return this.preguntaAsociar.asObservable();
  }

  loadPreguntasBuscarIntruso() {
    return this.database.executeSql('SELECT * FROM preguntaBuscarIntruso', []).then(data => {
      let preguntas: PreguntaBuscarIntruso[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaBuscarIntruso(data.rows.item(i).id, data.rows.item(i).img, data.rows.item(i).texto,
            data.rows.item(i).intruso, data.rows.item(i).numEjer
          ));
        }
      }
      this.preguntaBuscarIntruso.next(preguntas);
      return preguntas;
    });
  }


  addPreguntasBuscarIntruso(idJuego, img, texto, intruso, numEjer) {

    let data = [idJuego, img, texto, intruso, numEjer];
    return this.database.executeSql('INSERT INTO preguntaBuscarIntruso ( idJuego, img, texto, intruso, numEjer) VALUES (?, ?, ?, ?, ?, )', data).then(data => {
      this.loadPreguntasBuscarIntruso();

    });
  }

  getPreguntaBuscarIntruso(idJuego): Promise<PreguntaBuscarIntruso[]> {
    return this.database.executeSql('SELECT * FROM preguntaBuscarIntruso WHERE idJuego = ?', [idJuego]).then(data => {

      let preguntas: PreguntaBuscarIntruso[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaBuscarIntruso(data.rows.item(i).id, data.rows.item(i).img, data.rows.item(i).texto,
            data.rows.item(i).intruso, data.rows.item(i).numEjer
          ));
        }
      }


      return preguntas;
    });
  }

  getPreguntaTutorialBuscarIntruso(idJuego): Promise<PreguntaBuscarIntruso[]> {
    return this.database.executeSql('SELECT * FROM preguntaBuscarIntruso WHERE idJuego = ? AND numEjer = 0', [idJuego]).then(data => {

      let preguntas: PreguntaBuscarIntruso[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaBuscarIntruso(data.rows.item(i).id, data.rows.item(i).img, data.rows.item(i).texto,
            data.rows.item(i).intruso, data.rows.item(i).numEjer
          ));
        }
      }

      return preguntas;
    });
  }

  deletePreguntaBuscarIntruso(id) {

    return this.database.executeSql('DELETE FROM preguntaBuscarIntruso WHERE id = ?', [id]).then(_ => {
      this.loadPreguntasBuscarIntruso();
    });
  }

  updatePreguntaBuscarIntruso(pregunta: PreguntaBuscarIntruso) {

    let data = [pregunta.img, pregunta.texto, pregunta.intruso, pregunta.numEjer, pregunta.id];

    return this.database.executeSql('UPDATE preguntaBuscarIntruso SET img = ?, texto = ?, intruso = ?, numEjer = ? WHERE id = ?', data).then(data => {
      this.loadPreguntasBuscarIntruso();
    })

  }



  getPreguntasUnirPareja(): Observable<PreguntaUnirPareja[]> {
    return this.preguntaAsociar.asObservable();
  }

  loadPreguntasUnirPareja() {
    return this.database.executeSql('SELECT * FROM preguntaUnirPareja', []).then(data => {
      let preguntas: PreguntaUnirPareja[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaUnirPareja(data.rows.item(i).id, data.rows.item(i).img_1, data.rows.item(i).texto_1,
            data.rows.item(i).img_2, data.rows.item(i).texto_2, data.rows.item(i).numEjer
          ));
        }
      }
      this.preguntaUnirPareja.next(preguntas);
      return preguntas;
    });
  }


  addPreguntasUnirPareja(idJuego, img_1, texto_1, img_2, texto_2, numEjer) {

    let data = [idJuego, img_1, texto_1, img_2, texto_2, numEjer];
    return this.database.executeSql('INSERT INTO preguntaUnirPareja ( idJuego, img_1, texto_1, img_2, texto_2, numEjer) VALUES (?, ?, ?, ?, ?, ?)', data).then(data => {
      this.loadPreguntasUnirPareja();

    });
  }

  getPreguntaUnirPareja(idJuego): Promise<PreguntaUnirPareja[]> {
    return this.database.executeSql('SELECT * FROM preguntaUnirPareja WHERE idJuego = ?', [idJuego]).then(data => {

      let preguntas: PreguntaUnirPareja[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaUnirPareja(data.rows.item(i).id, data.rows.item(i).img_1, data.rows.item(i).texto_1,
            data.rows.item(i).img_2, data.rows.item(i).texto_2, data.rows.item(i).numEjer
          ));
        }
      }


      return preguntas;
    });
  }

  getPreguntaTutorialUnirPareja(idJuego): Promise<PreguntaUnirPareja[]> {
    return this.database.executeSql('SELECT * FROM preguntaUnirPareja WHERE idJuego = ? AND numEjer = 0', [idJuego]).then(data => {

      let preguntas: PreguntaUnirPareja[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          preguntas.push(new PreguntaUnirPareja(data.rows.item(i).id, data.rows.item(i).img_1, data.rows.item(i).texto_1,
            data.rows.item(i).img_2, data.rows.item(i).texto_2, data.rows.item(i).numEjer
          ));
        }
      }

      return preguntas;
    });
  }

  deletePreguntaUnirPareja(id) {

    return this.database.executeSql('DELETE FROM preguntaUnirPareja WHERE id = ?', [id]).then(_ => {
      this.loadPreguntasUnirPareja();
    });
  }

  updatePreguntaUnirPareja(pregunta: PreguntaUnirPareja) {

    let data = [pregunta.img_1, pregunta.texto_1, pregunta.img_2, pregunta.texto_2, pregunta.numEjer, pregunta.id];

    return this.database.executeSql('UPDATE preguntaUnirPareja SET img_1 = ?, texto_1 = ?, img_2 = ?, texto_2 = ?, numEjer = ? WHERE id = ?', data).then(data => {
      this.loadPreguntasUnirPareja();
    })

  }





  getSonidos(): Observable<string[]> {
    return this.sonidos.asObservable();
  }

  async loadSonidos() {
    return await this.database.executeSql('SELECT * FROM sonido', []).then(async data => {
      let sonidos: string[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          sonidos.push(data.rows.item(i).audio);
        }
      }
      this.sonidos.next(sonidos);
      return sonidos;
    });
  }

  async addSonido(idJuego, audio) {

    let data = [idJuego, audio];
    console.log('data Audio ' + data);
    return await this.database.executeSql('INSERT INTO sonido ( idJuego, audio) VALUES (?, ?)', data).then(async data => {
      await this.loadSonidos();

    });
  }

  async getSonido(idJuego): Promise<string[]> {
    return await this.database.executeSql('SELECT * FROM sonido WHERE idJuego = ?', [idJuego]).then(async data => {

      let sonidos: string[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          sonidos.push(data.rows.item(i).audio);
        }
      }

      return sonidos;
    });
  }

  async deleteSonidosJuego(idJuego) {

    return await this.database.executeSql('DELETE FROM sonido WHERE idJuego = ?', [idJuego]).then(async _ => {
      await this.loadSonidos();
    });
  }

  async updateSonido(idJuego: number, audio: string) {

    let data = [audio, idJuego];

    return await this.database.executeSql('UPDATE sonido SET  audio = ? WHERE idJuego = ?', data).then(async data => {
      await this.loadSonidos();
    })

  }


  getOpcionesCuestionarioFinal(): Observable<OpcionCuestionarioFinal[]> {
    return this.opcionesCuestionarioFinal.asObservable();
  }

  loadOpcionesCuestionarioFinal() {
    return this.database.executeSql('SELECT * FROM opcionesCuestionarioFinal', []).then(data => {
      let opcionesCuestionarioFinal: OpcionCuestionarioFinal[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          opcionesCuestionarioFinal.push(new OpcionCuestionarioFinal(
            data.rows.item(i).id,
            data.rows.item(i).img,
            data.rows.item(i).texto
          ));
        }
      }
      this.opcionesCuestionarioFinal.next(opcionesCuestionarioFinal);
      return opcionesCuestionarioFinal;
    });
  }

  addOpcionCuestionarioFinal(idJuego, img, texto) {

    let data = [idJuego, img, texto];
    return this.database.executeSql('INSERT INTO opcionesCuestionarioFinal ( idJuego, img, texto) VALUES (?, ?, ?)', data).then(data => {
      this.loadOpcionesCuestionarioFinal();

    });
  }

  getOpcionCuestionarioFinal(idJuego): Promise<OpcionCuestionarioFinal[]> {
    return this.database.executeSql('SELECT * FROM opcionesCuestionarioFinal WHERE idJuego = ?', [idJuego]).then(data => {

      let opcionesCuestionarioFinal: OpcionCuestionarioFinal[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          opcionesCuestionarioFinal.push(new OpcionCuestionarioFinal(
            data.rows.item(i).id,
            data.rows.item(i).img,
            data.rows.item(i).texto
          ));
        }
      }

      return opcionesCuestionarioFinal;
    });
  }

  deleteOpcionCuestionarioFinal(idJuego) {

    return this.database.executeSql('DELETE FROM opcionesCuestionarioFinal WHERE idJuego = ?', [idJuego]).then(_ => {
      this.loadOpcionesCuestionarioFinal();
    });
  }

  updateOpcionCuestionarioFinal(idJuego: number, img: string, texto: string) {

    let data = [img, texto, idJuego];

    return this.database.executeSql('UPDATE opcionesCuestionarioFinal SET  img = ?, texto = ? WHERE idJuego = ?', data).then(data => {
      this.loadOpcionesCuestionarioFinal();
    })

  }

  getResultados(): Observable<Resultado[]> {
    return this.resultados.asObservable();
  }

  loadResultados() {
    return this.database.executeSql('SELECT * FROM sonido', []).then(data => {
      let sonidos: string[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          sonidos.push(data.rows.item(i).audio);
        }
      }
      this.sonidos.next(sonidos);
      return sonidos;
    });
  }

  addResultado(idJuego, audio) {

    let data = [idJuego, audio];
    console.log('data Audio ' + data);
    return this.database.executeSql('INSERT INTO sonido ( idJuego, audio) VALUES (?, ?)', data).then(data => {
      //this.loadSonidos();

    });
  }

  getResultado(idJuego): Promise<string[]> {
    return this.database.executeSql('SELECT * FROM sonido WHERE idJuego = ?', [idJuego]).then(data => {

      let sonidos: string[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          sonidos.push(data.rows.item(i).audio);
        }
      }

      return sonidos;
    });
  }

  deleteResultado(idJuego) {

    return this.database.executeSql('DELETE FROM sonido WHERE idJuego = ?', [idJuego]).then(_ => {
      this.loadSonidos();
    });
  }

  updateResultado(idJuego: number, audio: string) {

    let data = [audio, idJuego];

    return this.database.executeSql('UPDATE sonido SET  audio = ? WHERE idJuego = ?', data).then(data => {
      this.loadSonidos();
    })

  }


}

