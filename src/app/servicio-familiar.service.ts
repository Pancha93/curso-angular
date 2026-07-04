/**
 * ============================================================================
 * SERVICIO FAMILIAR - Estado Compartido entre Componentes
 * ============================================================================
 * 
 * Este servicio demuestra el PATRÓN DE ESTADO COMPARTIDO en Angular.
 * 
 * PROPÓSITO:
 * Permitir comunicación entre componentes que NO tienen relación padre-hijo.
 * 
 * CÓMO FUNCIONA:
 * 1. El servicio es SINGLETON (una sola instancia en toda la app)
 * 2. Múltiples componentes inyectan el mismo servicio
 * 3. Cuando un componente modifica el estado, otros pueden leerlo
 * 
 * VENTAJAS:
 * - Desacopla los componentes (no necesitan conocerse)
 * - Centraliza la lógica de negocio
 * - Facilita testing (mockear el servicio)
 * 
 * ALTERNATIVAS PARA ESTADO COMPLEJO:
 * - BehaviorSubject + Observable (programación reactiva)
 * - NgRx o NGXS (state management libraries)
 * - Signals (Angular 16+)
 * 
 * PATRÓN GETTER/SETTER:
 * - Encapsula las propiedades privadas
 * - Permite validación o lógica adicional al leer/escribir
 */

import { Injectable } from '@angular/core';

@Injectable({
  // providedIn: 'root' = Singleton a nivel de aplicación
  // Angular crea UNA instancia y la comparte con todos los componentes
  providedIn: 'root'
})
export class ServicioFamiliarService {

  // ============================================================================
  // ESTADO COMPARTIDO
  // ============================================================================
  
  /**
   * Propiedades privadas que almacenan el estado
   * El ? indica que pueden ser undefined (opcional)
   * 
   * Usar propiedades privadas + getters/setters es buena práctica:
   * - Encapsulación: controlas cómo se accede a los datos
   * - Validación: puedes agregar lógica en los setters
   */
  hermanoGrande?: string;
  hermanoChico?: string; 

  // ============================================================================
  // GETTERS - Leer estado
  // ============================================================================

  /**
   * Obtener el nombre del hermano grande
   * @returns El nombre o string vacío si no existe
   * 
   * || "" es el operador OR para valor por defecto
   * Evita retornar undefined
   */
  getHermanoGrande(): string {
    return this.hermanoGrande || "";
  }

  getHermanoChico(): string {
    return this.hermanoChico || "";
  }

  // ============================================================================
  // SETTERS - Modificar estado
  // ============================================================================

  /**
   * Establecer el nombre del hermano grande
   * @param nombre - Nuevo nombre a guardar
   * 
   * Aquí podrías agregar validación:
   *   if (nombre.length < 2) throw new Error('Nombre muy corto');
   */
  setHermanoGrande(nombre: string): void {
    this.hermanoGrande = nombre;
  }

  setHermanoChico(nombre: string): void {
    this.hermanoChico = nombre;
  }

  // ============================================================================
  // MÉTODOS DE NEGOCIO
  // ============================================================================

  /**
   * Método que ejecuta lógica de negocio
   * @param hermano - Nombre del hermano a saludar
   * 
   * Template literal: `${variable}` permite interpolar variables en strings
   */
  saludar(hermano: string): void {
    console.log(`Hola ${hermano}, ¿cómo estás?`);
  }

  /**
   * Método que retorna un mensaje
   * Podría acceder a una API o base de datos
   */
  preguntarPorHijo(): string {
    return "¿Cómo está tu hijo?";
  }

  /**
   * Constructor vacío
   * Los servicios normalmente no necesitan constructor complejo
   * La inyección de otros servicios iría aquí si fuera necesario
   */
  constructor() { }
}
