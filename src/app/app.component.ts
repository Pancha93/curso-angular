/**
 * ============================================================================
 * COMPONENTE RAÍZ DE ANGULAR (app.component.ts)
 * ============================================================================
 * 
 * Este es el COMPONENTE PRINCIPAL de la aplicación Angular.
 * Es el primer componente que se carga y actúa como contenedor de toda la app.
 * 
 * CONCEPTOS CLAVE DE COMPONENTES:
 * - Un componente es una clase TypeScript decorada con @Component
 * - Cada componente tiene: template (HTML), estilos (CSS) y lógica (TS)
 * - Los componentes son reutilizables y encapsulan funcionalidad
 * 
 * DECORADOR @Component:
 * - selector: Nombre del tag HTML para usar este componente (<app-root>)
 * - standalone: true = componente independiente (Angular 14+), no necesita NgModule
 * - imports: Módulos/componentes que este componente necesita
 * - templateUrl: Ruta al archivo HTML del componente
 * - styleUrls: Array de rutas a archivos CSS del componente
 */

import { Component } from '@angular/core';
// RouterOutlet: Directiva que muestra el componente de la ruta activa
// RouterLink: Directiva para crear enlaces de navegación sin recargar la página
import { RouterOutlet, RouterLink } from '@angular/router';
import { PadreComponent } from "./padre/padre.component";
import { HermanoComponent } from "./hermano/hermano.component";

@Component({
  // El selector define cómo se usa este componente en HTML: <app-root></app-root>
  selector: 'app-root',
  
  // standalone: true indica que es un componente independiente
  // No requiere ser declarado en un NgModule (patrón moderno de Angular)
  standalone: true,
  
  // imports: Array de dependencias que el componente necesita
  // - RouterOutlet: Para mostrar componentes según la ruta
  // - RouterLink: Para navegación declarativa en el template
  // - PadreComponent y HermanoComponent: Componentes hijos
  imports: [RouterOutlet, RouterLink, PadreComponent, HermanoComponent],
  
  // templateUrl: Referencia al archivo HTML externo
  templateUrl: './app.component.html',
  
  // styleUrls: Array de archivos CSS (puede tener múltiples)
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // PROPIEDADES DEL COMPONENTE
  // Estas variables están disponibles en el template HTML mediante interpolación: {{ title }}
  title = 'cursoAngular';
  subtitle = 'Bienvenidos a mi curso de Angular';
}
