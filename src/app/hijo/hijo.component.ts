/**
 * ============================================================================
 * COMPONENTE HIJO - @Input y @Output (hijo.component.ts)
 * ============================================================================
 * 
 * Este componente demuestra la COMUNICACIÓN HIJO -> PADRE en Angular:
 * 
 * DECORADORES DE COMUNICACIÓN:
 * 
 * 1. @Input() - Recibir datos del padre
 *    - Declara una propiedad que el padre puede establecer
 *    - Se usa con property binding: <app-hijo [recibeHijo]="valor"></app-hijo>
 *    - El hijo RECIBE datos, es de solo lectura conceptualmente
 * 
 * 2. @Output() + EventEmitter - Enviar datos al padre
 *    - Declara un evento que el padre puede escuchar
 *    - EventEmitter<T> emite valores del tipo T
 *    - Se usa con event binding: <app-hijo (enviarMensaje)="metodo($event)"></app-hijo>
 *    - emit() dispara el evento con el valor
 * 
 * FLUJO DE DATOS EN ANGULAR:
 * - Datos hacia abajo: @Input() (padre -> hijo)
 * - Eventos hacia arriba: @Output() (hijo -> padre)
 * - Este patrón se llama "One-way data flow" (flujo unidireccional)
 */

import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
// Pipe personalizado para transformar texto a mayúsculas
import { MiPipePersonalizadoPipe } from '../mi-pipe-personalizado.pipe';

@Component({
  selector: 'app-hijo',
  standalone: true,
  // Importamos FormsModule para [(ngModel)] y el pipe personalizado
  imports: [FormsModule, MiPipePersonalizadoPipe],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.css'
})
export class HijoComponent {

  // ============================================================================
  // @Input() - RECIBIR DATOS DEL PADRE
  // ============================================================================
  
  /**
   * @Input() marca esta propiedad como "entrada" desde el padre
   * 
   * En el template del padre:
   *   <app-hijo [recibeHijo]="mensajePadre"></app-hijo>
   * 
   * Cuando mensajePadre cambia, Angular actualiza automáticamente recibeHijo
   * 
   * OPCIONES AVANZADAS:
   * - @Input('alias') propiedad: string;  // Usar nombre diferente en el template
   * - @Input({ required: true }) propiedad!: string;  // Hacer obligatorio
   * - @Input({ transform: booleanAttribute }) activo = false;  // Transformar
   */
  @Input() recibeHijo: string = "";

  // ============================================================================
  // @Output() - ENVIAR DATOS AL PADRE
  // ============================================================================
  
  /**
   * @Output() + EventEmitter crea un evento personalizado
   * 
   * EventEmitter<string> significa que emitirá valores de tipo string
   * 
   * En el template del padre:
   *   <app-hijo (enviarMensaje)="recibirMensaje($event)"></app-hijo>
   * 
   * $event contiene el valor emitido (this.mensajeHijo en este caso)
   */
  @Output() enviarMensaje = new EventEmitter<string>();
  
  /**
   * EventEmitter<void> para eventos sin datos
   * Solo notifica que algo ocurrió, sin enviar información
   */
  @Output() incrementarContadorDesdeHijo = new EventEmitter<void>();
  @Output() decrementarContadorDesdeHijo = new EventEmitter<void>();

  /**
   * Propiedad local del hijo
   * Se vincula al input con [(ngModel)] para two-way binding
   */
  mensajeHijo: string = "";

  /**
   * Método que emite el evento hacia el padre
   * 
   * emit(valor) dispara el evento con el valor especificado
   * El padre lo recibe en $event de su handler
   */
  enviarMensajeAlPadre() {
    // Emite el contenido de mensajeHijo hacia el padre
    this.enviarMensaje.emit(this.mensajeHijo);
  }

  /**
   * Métodos que emiten eventos sin datos (void)
   * El padre ejecuta sus propios métodos en respuesta
   */
  incrementar() {
    this.incrementarContadorDesdeHijo.emit(); // No necesita parámetro
  }

  decrementar() {
    this.decrementarContadorDesdeHijo.emit();
  }

}
