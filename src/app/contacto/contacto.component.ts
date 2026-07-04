/**
 * ============================================================================
 * COMPONENTE CONTACTO - Formularios en Angular (contacto.component.ts)
 * ============================================================================
 * 
 * Este componente demuestra los DOS TIPOS DE FORMULARIOS en Angular:
 * 
 * 1. FORMULARIOS DE PLANTILLA (Template-Driven Forms)
 *    - Lógica en el template HTML con directivas
 *    - Usa ngModel para two-way binding
 *    - Más simple para formularios pequeños
 *    - Requiere: FormsModule
 * 
 * 2. FORMULARIOS REACTIVOS (Reactive Forms)
 *    - Lógica en el componente TypeScript
 *    - Usa FormGroup, FormControl, FormBuilder
 *    - Más poder y control (validaciones complejas, dinámicos)
 *    - Requiere: ReactiveFormsModule
 * 
 * COMPARACIÓN:
 * | Característica      | Template-Driven | Reactive |
 * |---------------------|-----------------|----------|
 * | Validación          | HTML/Directivas | TypeScript |
 * | Testabilidad        | Difícil         | Fácil    |
 * | Formularios dinámicos| Complejo       | Simple   |
 * | Aprendizaje         | Fácil          | Medio    |
 * 
 * VALIDATORS (Validadores incorporados):
 * - Validators.required - Campo obligatorio
 * - Validators.minLength(n) - Mínimo n caracteres
 * - Validators.maxLength(n) - Máximo n caracteres
 * - Validators.email - Formato de email válido
 * - Validators.pattern(regex) - Expresión regular personalizada
 * - Validators.min(n) / max(n) - Valores numéricos mín/máx
 */

import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
// FormsModule: Para formularios template-driven (ngModel)
// FormBuilder, FormGroup, Validators, ReactiveFormsModule: Para formularios reactivos
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TipoDocumentoComponent } from '../tipo-documento/tipo-documento.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  // Importamos AMBOS módulos para demostrar los dos tipos de formularios
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TipoDocumentoComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  // ============================================================================
  // FORMULARIO DE PLANTILLA (Template-Driven)
  // ============================================================================
  
  /**
   * Objeto que almacena los datos del formulario template-driven
   * 
   * En el HTML se vincula con [(ngModel)]:
   *   <input [(ngModel)]="usuario.nombre" name="nombre">
   * 
   * IMPORTANTE: Cada input con ngModel DEBE tener un atributo 'name'
   * 
   * 'any' permite cualquier estructura, pero es mejor usar interface:
   *   public usuario: { nombre: string; email: string; tipoDocumento: string }
   */
  public usuario: any = {
    nombre: '',
    email: '',
    tipoDocumento: ''
  };

  /**
   * Método para enviar formulario template-driven
   * Se llama con (ngSubmit)="enviar()" en el form
   */
  enviar() {
    console.log(this.usuario);
  }

  // ============================================================================
  // FORMULARIO REACTIVO (Reactive Forms)
  // ============================================================================

  /**
   * FormGroup: Agrupa múltiples FormControls
   * Representa el formulario completo
   * 
   * Estructura:
   *   FormGroup {
   *     apellido: FormControl,
   *     correo: FormControl,
   *     tipoDocumento: FormControl
   *   }
   */
  public miFormulario: FormGroup;
  
  /**
   * Valor para precargar en el formulario
   * Simula un usuario ya autenticado
   */
  usuarioactivo: string = 'Calvo';

  /**
   * Constructor - Inyección de FormBuilder
   * 
   * FormBuilder es un servicio helper que simplifica la creación de formularios.
   * 
   * SIN FormBuilder (más verboso):
   *   this.miFormulario = new FormGroup({
   *     apellido: new FormControl('', [Validators.required]),
   *     correo: new FormControl('', [Validators.email])
   *   });
   * 
   * CON FormBuilder (más limpio):
   *   this.miFormulario = this.form.group({ ... });
   */
  constructor(private form: FormBuilder) {

    /**
     * Crear el FormGroup con FormBuilder
     * 
     * Sintaxis: form.group({ nombreControl: [valorInicial, [validadores]] })
     * 
     * - 'apellido': Control con valor inicial '' y validadores required + minLength
     * - 'correo': Control con valor inicial '' y validadores required + email
     */
    this.miFormulario = this.form.group({
      // [valorInicial, [array de validadores]]
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]]
    });

    /**
     * addControl(): Agregar controles dinámicamente
     * Útil cuando los campos dependen de condiciones
     */
    this.miFormulario.addControl('tipoDocumento', this.form.control('', Validators.required));

  }

  /**
   * ngOnInit - Configuración inicial del formulario
   * 
   * Demuestra cómo manipular FormControls programáticamente:
   * - get('nombre'): Obtener un control específico
   * - setValue(): Establecer valor
   * - disable(): Deshabilitar el campo
   * - enable(): Habilitar el campo
   * - reset(): Limpiar el formulario
   * 
   * El operador ?. (optional chaining) previene errores si el control no existe
   */
  ngOnInit(): void {
    // Precargar valor del apellido desde usuarioactivo
    this.miFormulario.get('apellido')?.setValue(this.usuarioactivo);
    // Deshabilitar el campo (el usuario no puede editarlo)
    this.miFormulario.get('apellido')?.disable();
  }

  /**
   * Método para enviar formulario reactivo
   * 
   * miFormulario.valid: boolean que indica si TODAS las validaciones pasan
   * miFormulario.value: Objeto con los valores actuales
   * miFormulario.errors: Objeto con los errores de validación
   */
  enviar2() {
    if (this.miFormulario.valid) {
      console.log(this.miFormulario);
      // En producción: this.apiService.enviarFormulario(this.miFormulario.value).subscribe(...)
    } else {
      console.log('Formulario no válido');
      // Marcar todos los campos como tocados para mostrar errores
      // this.miFormulario.markAllAsTouched();
    }
  }

  /**
   * Método helper para verificar errores de validación
   * 
   * @param controlName - Nombre del FormControl a verificar
   * @param errorName - Tipo de error a buscar ('required', 'minlength', 'email')
   * @returns true si el control tiene ese error Y ha sido tocado (touched)
   * 
   * USO EN TEMPLATE:
   *   <span *ngIf="hasError('correo', 'email')">Email inválido</span>
   * 
   * hasError() + touched evita mostrar errores antes de que el usuario interactue
   */
  hasError(controlName: string, errorName: string): boolean {
    return this.miFormulario.get(controlName)?.hasError(errorName) 
        && this.miFormulario.get(controlName)?.touched || false;  
  }
}
