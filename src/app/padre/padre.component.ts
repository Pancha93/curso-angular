/**
 * ============================================================================
 * COMPONENTE PADRE - Comunicación entre Componentes (padre.component.ts)
 * ============================================================================
 * 
 * Este componente demuestra las FORMAS DE COMUNICACIÓN EN ANGULAR:
 * 
 * 1. PADRE -> HIJO: @Input()
 *    - El padre pasa datos al hijo mediante property binding
 *    - <app-hijo [recibeHijo]="mensajePadre"></app-hijo>
 * 
 * 2. HIJO -> PADRE: @Output() + EventEmitter
 *    - El hijo emite eventos que el padre escucha
 *    - <app-hijo (enviarMensaje)="recibirMensaje($event)"></app-hijo>
 * 
 * 3. ENTRE HERMANOS: Servicio compartido
 *    - ServicioFamiliarService actúa como intermediario
 *    - Ambos hermanos inyectan el mismo servicio (Singleton)
 * 
 * PIPES EN EL TEMPLATE:
 * Este componente usa pipes para formatear datos:
 * - {{ fecha | date:'dd/MM/yyyy' }} - Formatear fechas
 * - {{ dolar | currency:'COP' }} - Formatear moneda
 * - {{ pi | number:'1.2-4' }} - Formatear números (1 entero mín, 2-4 decimales)
 * - {{ factor | percent }} - Formatear como porcentaje
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importamos el componente hijo para usarlo en el template
import { HijoComponent } from "../hijo/hijo.component";
// Servicio para comunicación entre componentes hermanos
import { ServicioFamiliarService } from '../servicio-familiar.service';
// Directiva personalizada de atributo
import { EstiloHermanosDirective } from '../estilo-hermanos.directive';

@Component({
  selector: 'app-padre',
  standalone: true,
  // Importamos HijoComponent para poder usar <app-hijo> en el template
  // EstiloHermanosDirective para usar appEstiloHermanos como atributo
  imports: [CommonModule, HijoComponent, EstiloHermanosDirective],
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.css']
})
export class PadreComponent implements OnInit {

  /**
   * Inyección de dependencias vía constructor
   * El servicio es Singleton: la misma instancia se comparte con HermanoComponent
   */
  constructor(private servicioFamiliar: ServicioFamiliarService) { }
 
  // ============================================================================
  // PROPIEDADES PARA DEMOSTRAR PIPES
  // ============================================================================
  
  nombre?: string;                    // Nombre obtenido del servicio
  fecha?: Date = new Date();          // Para pipe date
  dolar?: number = 1600;              // Para pipe currency
  pi?: number = Math.PI;              // Para pipe number
  factor?: number = 0.5;              // Para pipe percent

  /**
   * ngOnInit - Hook del ciclo de vida
   * Se ejecuta después de inicializar el componente
   */
  ngOnInit(): void {
    // Guardar datos en el servicio compartido
    this.servicioFamiliar.setHermanoGrande("Juan");   
    // Leer datos del servicio
    this.nombre = this.servicioFamiliar.getHermanoGrande();  
  }

  /**
   * Método que usa el servicio para comunicarse con el hermano
   * Demuestra cómo compartir datos entre componentes sin relación padre-hijo
   */
  saludar() {
    this.servicioFamiliar.saludar(this.servicioFamiliar.getHermanoChico());  
  }

  preguntarPorHijo() {
    console.log(this.servicioFamiliar.preguntarPorHijo());
  }

  // ============================================================================
  // COMUNICACIÓN CON EL COMPONENTE HIJO
  // ============================================================================

  /**
   * Contador controlado por el padre pero modificable desde el hijo
   * Demuestra cómo el hijo puede afectar el estado del padre
   */
  valorContador: number = 0;

  /**
   * Métodos llamados desde el hijo mediante @Output()
   * El hijo emite eventos que ejecutan estos métodos
   */
  incrementar() {
    this.valorContador++;
  }

  decrementar() {
    this.valorContador--;
  }

  /**
   * @Input() PADRE -> HIJO
   * Este mensaje se pasa al hijo con [recibeHijo]="mensajePadre"
   */
  mensajePadre = "Mensaje desde el padre";

  /**
   * @Output() HIJO -> PADRE
   * Almacena el mensaje recibido desde el hijo
   */
  reciboMensajeHijo: string = "";

  /**
   * Método que escucha el evento del hijo
   * Se vincula con (enviarMensaje)="recibirMensaje($event)"
   * 
   * @param event - El mensaje enviado por el hijo (string emitido por EventEmitter)
   */
  recibirMensaje(event: string) {
    this.reciboMensajeHijo = event;
  }

}
