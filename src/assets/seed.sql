CREATE TABLE IF NOT EXISTS alumno(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT,fotoPerfil TEXT);


 
CREATE TABLE IF NOT EXISTS juegoUnirCol(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT,portada TEXT, tipo TEXT,
instrucciones TEXT, tutorial BIT, descrip_tutorial TEXT, efectos_sonido BIT, refPositivo BIT, refNegativo BIT, 
resultadoNum BIT, resultadoPicto BIT, imgRefPositivo TEXT, imgRefNegativo TEXT, cuestionarioFinal BIT, cuestionarioFinalPregunta TEXT);

CREATE TABLE IF NOT EXISTS juegoUnirPareja(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT,portada TEXT, tipo TEXT,
instrucciones TEXT, tutorial BIT, descrip_tutorial TEXT, efectos_sonido BIT, refPositivo BIT, refNegativo BIT, 
resultadoNum BIT, resultadoPicto BIT, imgRefPositivo TEXT, imgRefNegativo TEXT, cuestionarioFinal BIT, cuestionarioFinalPregunta TEXT);

CREATE TABLE IF NOT EXISTS juegoUnirAsociar(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT,portada TEXT, tipo TEXT,
instrucciones TEXT, tutorial BIT, descrip_tutorial TEXT, efectos_sonido BIT, refPositivo BIT, refNegativo BIT, 
resultadoNum BIT, resultadoPicto BIT, imgRefPositivo TEXT, imgRefNegativo TEXT, cuestionarioFinal BIT, cuestionarioFinalPregunta TEXT);


CREATE TABLE IF NOT EXISTS juegoUnirBuscarIntruso(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT,portada TEXT, tipo TEXT,
instrucciones TEXT, tutorial BIT, descrip_tutorial TEXT, efectos_sonido BIT, refPositivo BIT, refNegativo BIT, 
resultadoNum BIT, resultadoPicto BIT, imgRefPositivo TEXT, imgRefNegativo TEXT, cuestionarioFinal BIT, cuestionarioFinalPregunta TEXT);


CREATE TABLE IF NOT EXISTS alumno_juega_juego(id INTEGER PRIMARY KEY AUTOINCREMENT,idAlumno INTEGER,idJuego INTEGER, idPersonJuego INTEGER,
FOREIGN KEY (idAlumno) REFERENCES alumno(id), FOREIGN KEY (idJuego) REFERENCES juego(id));

CREATE TABLE IF NOT EXISTS sonido(id INTEGER PRIMARY KEY AUTOINCREMENT, idJuego INTEGER, audio TEXT, FOREIGN KEY (idJuego) REFERENCES juego(id));

CREATE TABLE IF NOT EXISTS preguntaUnirColor(id INTEGER PRIMARY KEY AUTOINCREMENT, idJuego INTEGER, color TEXT, texto_color TEXT,
asociada TEXT, texto_asociada TEXT, musica TEXT, numEjer INTEGER, FOREIGN KEY (idJuego) REFERENCES juego(id));

CREATE TABLE IF NOT EXISTS preguntaAsociar(id INTEGER PRIMARY KEY AUTOINCREMENT, idJuego INTEGER, img TEXT, texto TEXT,
correcta BIT, tipo TEXT, numEjer INTEGER, FOREIGN KEY (idJuego) REFERENCES juego(id));

CREATE TABLE IF NOT EXISTS preguntaUnirPareja(id INTEGER PRIMARY KEY AUTOINCREMENT, idJuego INTEGER, img_1 TEXT, texto_1 TEXT,
img_2 TEXT, texto_2 TEXT, numEjer INTEGER, FOREIGN KEY (idJuego) REFERENCES juego(id));

CREATE TABLE IF NOT EXISTS preguntaBuscarIntruso(id INTEGER PRIMARY KEY AUTOINCREMENT, idJuego INTEGER, img TEXT, texto TEXT,
intruso BIT, numEjer INTEGER, FOREIGN KEY (idJuego) REFERENCES juego(id));

CREATE TABLE IF NOT EXISTS resultados(id INTEGER PRIMARY KEY AUTOINCREMENT, idJuego INTEGER, idAlumno INTEGER, fecha DATE,
incorrectas INTEGER, correctas INTEGER, FOREIGN KEY (idJuego) REFERENCES juego(id), FOREIGN KEY (idAlumno) REFERENCES alumno(id));

CREATE TABLE IF NOT EXISTS opcionesCuestionarioFinal(id INTEGER PRIMARY KEY AUTOINCREMENT, idJuego INTEGER, img TEXT, texto TEXT, FOREIGN KEY (idJuego) REFERENCES juego(id));

CREATE TABLE IF NOT EXISTS respuestasCuestionarioFinal(id INTEGER PRIMARY KEY AUTOINCREMENT, idJuego INTEGER, idAlumno INTEGER, fecha DATE, respuestaTexto TEXT, respuestaImg TEXT, FOREIGN KEY (idJuego) REFERENCES juego(id), FOREIGN KEY (idAlumno) REFERENCES alumno(id));