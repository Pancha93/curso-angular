/**
 * ============================================================================
 * COMPONENTE HERMANO - Comunicación vía Servicio (hermano.component.ts)
 * ============================================================================
 * 
 * Este componente demuestra la COMUNICACIÓN ENTRE HERMANOS usando un servicio.
 * 
 * PROBLEMA: ¿Cómo comunicar componentes que NO tienen relación padre-hijo?
 * 
 * SOLUCIÓN: Servicio compartido (Singleton)
 * - Ambos hermanos inyectan el mismo servicio
 * - El servicio mantiene el estado compartido
 * - Un hermano escribe, el otro lee
 * 
 * COMPARACIÓN DE INYECCIÓN DE DEPENDENCIAS:
 * 
 * 1. Vía Constructor (forma clásica):
 *    constructor(private servicioFamiliar: ServicioFamiliarService) { }
 * 
 * 2. Vía inject() (forma moderna Angular 14+):
 *    private servicioFamiliar = inject(ServicioFamiliarService);
 * 
 * Ambas formas son válidas. inject() es más flexible porque:
 * - Funciona fuera del constructor
 * - Permite inyección condicional
 * - Código más limpio en componentes con muchas dependencias
 */

import { Component, OnInit, inject } from '@angular/core';
import { ServicioFamiliarService } from '../servicio-familiar.service';
import { EstiloHermanosDirective } from '../estilo-hermanos.directive';

@Component({
  selector: 'app-hermano',
  standalone: true,
  // Importamos la directiva para usarla como atributo en el template
  imports: [EstiloHermanosDirective],
  templateUrl: './hermano.component.html',
  styleUrls: ['./hermano.component.css']
})
export class HermanoComponent implements OnInit {

  /**
   * INYECCIÓN CON inject() - Forma moderna
   * 
   * Comentado debajo está la forma tradicional vía constructor.
   * Ambas obtienen la MISMA instancia del servicio (Singleton).
   * 
   * IMPORTANTE: inject() solo funciona en:
   * - Propiedades de clase (como aquí)
   * - Constructores
   * - Factory providers
   * 
   * NO funciona en métodos regulares de clase.
   */
  //constructor(private servicioFamiliar: ServicioFamiliarService) { }
  private servicioFamiliar = inject(ServicioFamiliarService);

  nombre?: string;

  /**
   * ngOnInit - Configuración inicial
   * 
   * Este hermano se registra como "Pedro" en el servicio.
   * El otro hermano (PadreComponent) se registra como "Juan".
   * 
   * Como comparten el mismo servicio, pueden "verse" mutuamente.
   */
  ngOnInit(): void {
    // Registrar este hermano en el servicio compartido
    this.servicioFamiliar.setHermanoChico("Predro");   
    // Leer su propio nombre desde el servicio
    this.nombre = this.servicioFamiliar.getHermanoChico();
  }   

  /**
   * Saludar al otro hermano
   * Obtiene el nombre del hermano grande del servicio compartido
   */
  saludar() {
    // getHermanoGrande() retorna el nombre que PadreComponent guardó
    this.servicioFamiliar.saludar(this.servicioFamiliar.getHermanoGrande());
  }

  preguntarPorHijo() {
    console.log(this.servicioFamiliar.preguntarPorHijo());
  }

}
