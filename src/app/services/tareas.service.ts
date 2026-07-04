/**
 * ============================================================================
 * SERVICIO DE TAREAS CON LOCALSTORAGE (tareas.service.ts)
 * ============================================================================
 * 
 * Este servicio demuestra:
 * 
 * 1. PERSISTENCIA LOCAL con localStorage
 *    - localStorage guarda datos en el navegador del usuario
 *    - Los datos persisten incluso al cerrar el navegador
 *    - Solo almacena strings (usar JSON.stringify/parse para objetos)
 *    - Límite aprox. 5MB por dominio
 * 
 * 2. PATRÓN REPOSITORIO
 *    - Encapsula la lógica de acceso a datos
 *    - Los componentes no saben cómo/dónde se guardan los datos
 *    - Facilita cambiar la fuente de datos (localStorage -> API -> DB)
 * 
 * 3. SERVICIO SINGLETON
 *    - providedIn: 'root' garantiza una única instancia
 *    - Todos los componentes comparten el mismo estado
 * 
 * DIFERENCIAS CON ApiService:
 * - TareasService: Datos locales (localStorage) - Síncrono
 * - ApiService: Datos remotos (HTTP) - Asíncrono (Observables)
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Singleton: una instancia para toda la aplicación
})
export class TareasService {

  /**
   * Clave para identificar los datos en localStorage
   * localStorage funciona como un diccionario clave-valor
   */
  private localStorageKey = 'listaTareas';

  /**
   * Obtener todas las tareas desde localStorage
   * 
   * @returns string[] - Array de tareas
   * 
   * EXPLICACIÓN DEL CÓDIGO:
   * 1. localStorage.getItem() devuelve string | null
   * 2. 'as string' es un type assertion de TypeScript
   * 3. || '[]' proporciona un valor por defecto si es null
   * 4. JSON.parse() convierte el string JSON a un array JavaScript
   */
  getTareas(): string[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) as string || '[]');
  }

  /**
   * Agregar una nueva tarea
   * 
   * @param tarea - Texto de la nueva tarea
   * 
   * PROCESO:
   * 1. Obtener tareas existentes
   * 2. Agregar la nueva al array (push)
   * 3. Guardar el array actualizado en localStorage
   * 
   * JSON.stringify() convierte el array a string para localStorage
   */
  agregarTarea(tarea: string): void {
    const tareas = this.getTareas();
    tareas.push(tarea);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
  }

  /**
   * Eliminar una tarea por su índice
   * 
   * @param index - Posición de la tarea en el array (0-based)
   * 
   * splice(index, 1): Elimina 1 elemento en la posición 'index'
   * - Primer parámetro: posición donde empezar
   * - Segundo parámetro: cantidad de elementos a eliminar
   */
  eliminarTarea(index: number): void {
    const tareas = this.getTareas();
    tareas.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(tareas));
  }

}
