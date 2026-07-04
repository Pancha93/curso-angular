/**
 * ============================================================================
 * DIRECTIVA DE ATRIBUTO PERSONALIZADA (estilo-hermanos.directive.ts)
 * ============================================================================
 * 
 * Las DIRECTIVAS son clases que modifican el comportamiento de elementos DOM.
 * 
 * TIPOS DE DIRECTIVAS EN ANGULAR:
 * 
 * 1. DIRECTIVAS DE COMPONENTE (@Component)
 *    - Directivas con template (los componentes son directivas especiales)
 * 
 * 2. DIRECTIVAS ESTRUCTURALES (*ngIf, *ngFor, *ngSwitch)
 *    - Modifican la ESTRUCTURA del DOM (agregan/eliminan elementos)
 *    - Se identifican por el asterisco (*)
 * 
 * 3. DIRECTIVAS DE ATRIBUTO (esta directiva)
 *    - Modifican APARIENCIA o COMPORTAMIENTO de elementos existentes
 *    - Se usan como atributos HTML: <div appEstiloHermanos></div>
 *    - Ejemplos built-in: [ngClass], [ngStyle]
 * 
 * CONCEPTOS CLAVE:
 * 
 * - @Directive: Decorador que marca la clase como directiva
 * - selector: '[appEstiloHermanos]' - Los corchetes indican que es un atributo
 * - ElementRef: Referencia al elemento DOM donde se aplica la directiva
 * - nativeElement: El elemento DOM real (HTMLElement)
 */

import { Directive, ElementRef } from '@angular/core';

@Directive({
  // selector con corchetes [] significa que se usa como ATRIBUTO
  // Uso en HTML: <div appEstiloHermanos></div>
  selector: '[appEstiloHermanos]',
  
  // standalone: true permite usar la directiva sin declararla en un módulo
  standalone: true
})
export class EstiloHermanosDirective {

  /**
   * Constructor - Inyección de ElementRef
   * 
   * ElementRef es un wrapper del elemento DOM donde se aplica la directiva.
   * 
   * @param element - Referencia al elemento DOM
   * 
   * ACCESO AL DOM:
   * - element.nativeElement: El elemento HTML real
   * - Permite manipular estilos, clases, atributos, etc.
   * 
   * ADVERTENCIA DE SEGURIDAD:
   * Manipular nativeElement directamente puede ser riesgoso (XSS).
   * Para operaciones seguras, usar Renderer2:
   *   constructor(private el: ElementRef, private renderer: Renderer2) {
   *     this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'lightblue');
   *   }
   */
  constructor(private element: ElementRef) { 
    // Aplicar estilo de fondo cuando la directiva se inicializa
    // nativeElement.style permite acceder a los estilos CSS del elemento
    this.element.nativeElement.style.backgroundColor = 'lightblue';
  }
 
}
