import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
    path: '',
    redirectTo: 'homepage-tutor',
    pathMatch: 'full'
  },
  {
    path: 'homepage-tutor',
    children: [
      {
        path: '',
        loadChildren: () => import('./interfaz-tutor/homepage-tutor/homepage-tutor.module').then( m => m.HomepageTutorPageModule)
      },
      {
        path: 'alumno/:alumnoId',
        children:[
          {
            path: '',
            loadChildren: () => import('./interfaz-tutor/perfil-alumno/perfil-alumno.module').then( m => m.PerfilAlumnoPageModule)
          },
          
          {
            path: 'configuracion',
            loadChildren: () => import('./interfaz-tutor/configuracion-alumno/configuracion-alumno.module').then( m => m.ConfiguracionAlumnoPageModule)
          },
          

        ]
        
      },
      
    ]
  },
  {
    path: 'crear-alumno',
    loadChildren: () => import('./interfaz-tutor/crear-alumno/crear-alumno.module').then( m => m.CrearAlumnoPageModule)
  },
  {
    path: 'juegos',
    children:[
      {
        path: '',
        loadChildren: () => import('./interfaz-tutor/juegos/juegos.module').then( m => m.JuegosPageModule)
      },
      {
        path: ':tipojuego',
        children: [
          {
            path: '',
            loadChildren: () => import('./interfaz-tutor/juego-tipo/juego-tipo.module').then( m => m.JuegoTipoPageModule)

          },
          
          {
            path: 'crear-juego',
            loadChildren: () => import('./interfaz-tutor/crear-juego/crear-juego.module').then( m => m.CrearJuegoPageModule)
          },
          {
            path: 'crear-juego-asociar-imagen',
            loadChildren: () => import('./interfaz-tutor/crear-juego-asociar-imagen/crear-juego-asociar-imagen.module').then( m => m.CrearJuegoAsociarImagenPageModule)
          },
          {
            path: 'crear-juego-buscar-intruso',
            loadChildren: () => import('./interfaz-tutor/crear-juego-buscar-intruso/crear-juego-buscar-intruso.module').then( m => m.CrearJuegoBuscarIntrusoPageModule)
          },
          {
            path: 'crear-juego-unir-pareja',
            loadChildren: () => import('./interfaz-tutor/crear-juego-unir-pareja/crear-juego-unir-pareja.module').then( m => m.CrearJuegoUnirParejaPageModule)
          },

          {
            path: 'juego/:juegoId',
            children: [

              {
                path: '',
                loadChildren: () => import('./interfaz-tutor/juego/juego.module').then( m => m.JuegoPageModule)
              },

              {
                path: 'configuracion-juego',
                loadChildren: () => import('./interfaz-tutor/configuracion-juego/configuracion-juego.module').then( m => m.ConfiguracionJuegoPageModule)
              },

            ]
          
          
          },


        ]
        
      },

    ]
    
  },
  
  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () => import('./interfaz-alumno/login/login.module').then( m => m.LoginPageModule)
      },

      {
        path: 'alumno/:alumnoId',
        children: [
          {
            path: '',
            loadChildren: () => import('./interfaz-alumno/homepage/homepage.module').then( m => m.HomepagePageModule)
          },
          
          {
            path: 'juego-unir-color/:juegoId',
            loadChildren: () => import('./interfaz-alumno/juegos/juego-unir-color/juego-unir-color.module').then( m => m.JuegoUnirColorPageModule)
          },

          {
            path: 'perfil',
            loadChildren: () => import('./interfaz-alumno/perfil/perfil.module').then( m => m.PerfilPageModule)
          },
          {
            path: 'resultados',
            loadChildren: () => import('./interfaz-alumno/resultados/resultados.module').then( m => m.ResultadosPageModule)
          },
        ]
      },
    ]

  },
  {
    path: 'confirmar-modo-tutor',
    loadChildren: () => import('./interfaz-alumno/confirmar-modo-tutor/confirmar-modo-tutor.module').then( m => m.ConfirmarModoTutorPageModule)
  },
  
  
  {
    path: 'preguntas-unir-color',
    loadChildren: () => import('./interfaz-tutor/preguntas-unir-color/preguntas-unir-color.module').then( m => m.PreguntasUnirColorPageModule)
  },
  {
    path: 'opcion-cuestionario-final',
    loadChildren: () => import('./interfaz-tutor/opcion-cuestionario-final/opcion-cuestionario-final.module').then( m => m.OpcionCuestionarioFinalPageModule)
  },
  {
    path: 'juego-buscar-intruso',
    loadChildren: () => import('./interfaz-alumno/juegos/juego-buscar-intruso/juego-buscar-intruso.module').then( m => m.JuegoBuscarIntrusoPageModule)
  },
  
  {
    path: 'juego-unir-pareja',
    loadChildren: () => import('./interfaz-alumno/juegos/juego-unir-pareja/juego-unir-pareja.module').then( m => m.JuegoUnirParejaPageModule)
  },
  {
    path: 'juego-asociar-emocion',
    loadChildren: () => import('./interfaz-alumno/juegos/juego-asociar-emocion/juego-asociar-emocion.module').then( m => m.JuegoAsociarEmocionPageModule)
  },
  {
    path: 'juego-asociar-frase',
    loadChildren: () => import('./interfaz-alumno/juegos/juego-asociar-frase/juego-asociar-frase.module').then( m => m.JuegoAsociarFrasePageModule)
  },
  {
    path: 'asociar-imagen',
    loadChildren: () => import('./interfaz-alumno/juegos/asociar-imagen/asociar-imagen.module').then( m => m.AsociarImagenPageModule)
  },
  
  {
    path: 'preguntas-unir-pareja',
    loadChildren: () => import('./interfaz-tutor/preguntas-unir-pareja/preguntas-unir-pareja.module').then( m => m.PreguntasUnirParejaPageModule)
  },
  
  {
    path: 'preguntas-buscar-intruso',
    loadChildren: () => import('./interfaz-tutor/preguntas-buscar-intruso/preguntas-buscar-intruso.module').then( m => m.PreguntasBuscarIntrusoPageModule)
  },
  {
    path: 'preguntas-asociar',
    loadChildren: () => import('./interfaz-tutor/preguntas-asociar/preguntas-asociar.module').then( m => m.PreguntasAsociarPageModule)
  }
  
  

  
  
  
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
