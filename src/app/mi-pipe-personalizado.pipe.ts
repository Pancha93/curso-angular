/**
 * ============================================================================
 * PIPE PERSONALIZADO (mi-pipe-personalizado.pipe.ts)
 * ============================================================================
 * 
 * Los PIPES transforman datos en los templates de Angular.
 * 
 * PIPES BUILT-IN DE ANGULAR:
 * - {{ fecha | date:'dd/MM/yyyy' }}     -> Formatear fechas
 * - {{ precio | currency:'USD' }}        -> Formatear moneda
 * - {{ texto | uppercase }}              -> Mayúsculas
 * - {{ texto | lowercase }}              -> Minúsculas
 * - {{ numero | number:'1.2-2' }}        -> Formatear números
 * - {{ objeto | json }}                  -> Mostrar JSON
 * - {{ array | slice:0:5 }}              -> Cortar arrays
 * - {{ valor | async }}                  -> Desenvolver Observables/Promises
 * 
 * CREAR PIPES PERSONALIZADOS:
 * Cuando necesitas transformaciones específicas que no existen.
 * 
 * CONCEPTOS CLAVE:
 * 
 * - @Pipe: Decorador que marca la clase como pipe
 * - name: Nombre para usar en templates: {{ valor | miPipePersonalizado }}
 * - PipeTransform: Interface que obliga a implementar transform()
 * - transform(): Recibe el valor y devuelve el valor transformado
 * 
 * PIPES PUROS vs IMPUROS:
 * - pure: true (default) - Solo se ejecuta cuando cambia la referencia del valor
 * - pure: false - Se ejecuta en cada ciclo de detección de cambios (menos eficiente)
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  // name: Nombre para usar el pipe en templates
  // Uso: {{ 'texto' | miPipePersonalizado }}
  name: 'miPipePersonalizado',
  
  // standalone: true permite importar el pipe directamente
  standalone: true
  
  // pure: true (default) - Pipe puro, optimizado para rendimiento
  // pure: false - Pipe impuro, se ejecuta más frecuentemente
})
export class MiPipePersonalizadoPipe implements PipeTransform {

  /**
   * Método transform - OBLIGATORIO por PipeTransform
   * 
   * @param value - El valor a transformar (lo que viene antes del |)
   * @param args - Parámetros opcionales del pipe
   * @returns El valor transformado
   * 
   * EJEMPLO DE USO:
   *   {{ 'hola mundo' | miPipePersonalizado }}
   *   Resultado: 'HOLA MUNDO'
   * 
   * CON PARÁMETROS (si los implementas):
   *   {{ 'texto' | miPipePersonalizado:'param1':'param2' }}
   * 
   * TIPADO:
   * - value: string | undefined - Puede recibir undefined
   * - return: unknown - Tipo genérico (podría ser más específico: string)
   */
  transform(value: string | undefined): unknown {
    // Operador ternario: si value existe, convertir a mayúsculas, sino retornar ''
    // Esto previene errores si el valor es null o undefined
    return value ? value.toUpperCase() : '';
  }

}
