/**
 * ============================================================================
 * COMPONENTE DE PRODUCTOS (productos.component.ts)
 * ============================================================================
 * 
 * Este componente demuestra el CONSUMO DE APIs REST en Angular:
 * 
 * 1. PATRÓN SERVICIO-COMPONENTE
 *    - El componente NO hace llamadas HTTP directamente
 *    - Delega la lógica de datos al ApiService
 *    - Separación de responsabilidades (Single Responsibility Principle)
 * 
 * 2. PROGRAMACIÓN REACTIVA con RxJS
 *    - Los métodos HTTP devuelven Observable<T>
 *    - .subscribe() se usa para "escuchar" la respuesta
 *    - Permite manejar datos asíncronos de forma elegante
 * 
 * 3. MANEJO DE ERRORES
 *    - El segundo parámetro de subscribe maneja errores
 *    - Importante para UX: mostrar mensajes al usuario
 * 
 * 4. INTERFACES TypeScript (IProduct)
 *    - Tipado fuerte para los datos
 *    - Autocompletado y detección de errores en desarrollo
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// RouterLink permite crear enlaces a otras rutas desde el template
import { RouterLink } from '@angular/router';
// Datos mock para desarrollo sin API (comentado, pero útil para testing)
import { productos } from './productos.mok';
// Interface que define la estructura de un producto
import { IProduct } from '../models/product.model';
// Servicio que maneja las llamadas HTTP a la API
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  /**
   * DATOS MOCK vs API REAL
   * 
   * Opción 1 - Datos mock (para desarrollo rápido sin backend):
   * productsList: IProduct[] = productos;
   * 
   * Opción 2 - Datos desde API (producción):
   * Se inicializa vacío y se llena en ngOnInit
   */
  productsList: IProduct[] = [];

  /**
   * INYECCIÓN DE DEPENDENCIAS vía Constructor
   * 
   * Forma clásica de inyectar servicios:
   * - 'private' crea automáticamente una propiedad de clase
   * - Angular proporciona la instancia del servicio (Singleton)
   * 
   * Equivalente moderno con inject():
   *   private apiService = inject(ApiService);
   */
  constructor(private apiService: ApiService) { }

  /**
   * ngOnInit - Carga inicial de datos
   * 
   * PATRÓN OBSERVABLE:
   * 1. apiService.getProducts() retorna un Observable<IProduct[]>
   * 2. .subscribe() "activa" la petición HTTP
   * 3. El callback recibe los datos cuando llegan
   * 
   * SINTAXIS DE SUBSCRIBE:
   * .subscribe(
   *   (datos) => { // Éxito: procesar datos },
   *   (error) => { // Error: manejar fallo }
   * )
   * 
   * NOTA: En Angular moderno se prefiere:
   * .subscribe({
   *   next: (datos) => { ... },
   *   error: (err) => { ... },
   *   complete: () => { ... }
   * })
   */
  ngOnInit(): void {
    this.apiService.getProducts().subscribe(
      (products: IProduct[]) => {
        // Callback de éxito: se ejecuta cuando llegan los datos
        this.productsList = products;
        console.log('Productos obtenidos desde la API:', this.productsList);
      },
      (error) => {
        // Callback de error: se ejecuta si falla la petición
        console.error('Error al obtener los productos:', error);
      }
    );
  }
}
