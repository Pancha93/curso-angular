/**
 * ============================================================================
 * COMPONENTE DE INICIO - Lista de Tareas (inicio.component.ts)
 * ============================================================================
 * 
 * Este componente demuestra varios conceptos importantes de Angular 17+:
 * 
 * 1. INYECCIÓN DE DEPENDENCIAS con inject()
 *    - inject() es la forma moderna (Angular 14+) de inyectar servicios
 *    - Alternativa al constructor injection: constructor(private service: Service)
 *    - Ventaja: Más limpio y funciona fuera del constructor
 * 
 * 2. CICLO DE VIDA DEL COMPONENTE (Lifecycle Hooks)
 *    - ngOnInit(): Se ejecuta una vez, después de inicializar las propiedades
 *    - Ideal para: cargar datos, suscripciones, configuración inicial
 *    - Otros hooks: ngOnChanges, ngDoCheck, ngOnDestroy, etc.
 * 
 * 3. TWO-WAY DATA BINDING (Enlace bidireccional)
 *    - [(ngModel)]="nuevaTarea" sincroniza el input con la variable
 *    - Requiere importar FormsModule
 *    - Combina [property] binding + (event) binding
 * 
 * 4. NUEVA SINTAXIS DE CONTROL DE FLUJO (Angular 17+)
 *    - @for: Reemplaza *ngFor - NO requiere CommonModule
 *    - @if: Reemplaza *ngIf - NO requiere CommonModule
 *    - @switch: Reemplaza *ngSwitch - NO requiere CommonModule
 *    - @empty: Nuevo bloque para mostrar contenido cuando una lista está vacía
 *    
 *    VENTAJAS de la nueva sintaxis:
 *    - Mejor rendimiento (built-in, sin directivas)
 *    - 'track' obligatorio mejora re-renderizado de listas
 *    - Variables implícitas: $index, $first, $last, $even, $odd
 */

import { Component, inject, OnInit } from '@angular/core';
// FormsModule: Habilita el two-way data binding con [(ngModel)]
// NOTA: CommonModule YA NO es necesario para @for, @if, @switch (Angular 17+)
import { FormsModule } from '@angular/forms';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  // imports: Solo FormsModule para [(ngModel)]
  // @for, @if, @switch son built-in y no requieren imports
  imports: [FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
// implements OnInit: TypeScript interface que obliga a implementar ngOnInit()
export class InicioComponent implements OnInit {

  // PROPIEDADES DEL COMPONENTE
  // Array que almacena las tareas - se muestra en el template con @for
  listaTareas: string[] = [];
  
  // Variable vinculada al input con [(ngModel)] - two-way binding
  nuevaTarea: string = '';

  /**
   * INYECCIÓN DE DEPENDENCIAS usando inject()
   * 
   * Forma moderna (Angular 14+):
   *   private tareasService = inject(TareasService);
   * 
   * Forma clásica (también válida):
   *   constructor(private tareasService: TareasService) { }
   * 
   * Angular crea automáticamente una instancia del servicio (Singleton)
   * y la "inyecta" donde se necesite.
   */
  private tareasService = inject(TareasService);

  /**
   * ngOnInit - HOOK DEL CICLO DE VIDA
   * 
   * Se ejecuta UNA SOLA VEZ después de que Angular:
   * 1. Crea el componente
   * 2. Inicializa las propiedades con @Input()
   * 
   * Ideal para: cargar datos iniciales, configuraciones
   * NO usar el constructor para esto (el constructor es para inyección)
   */
  ngOnInit() {
    // Carga las tareas desde el servicio (que usa localStorage)
    this.listaTareas = this.tareasService.getTareas();
  }

  /**
   * Método para agregar una nueva tarea
   * Se llama desde el template con (click)="agregarTarea()"
   */
  agregarTarea() {
    this.tareasService.agregarTarea(this.nuevaTarea);
    this.nuevaTarea = ''; // Limpia el input después de agregar
    this.listaTareas = this.tareasService.getTareas(); // Recarga la lista
  }

  /**
   * Método para eliminar una tarea por su índice
   * Se llama con (click)="eliminarTarea(i)" donde i viene del *ngFor
   */
  eliminarTarea(index: number) {
    this.tareasService.eliminarTarea(index);
    this.listaTareas = this.tareasService.getTareas(); // Recarga la lista
  }
}
