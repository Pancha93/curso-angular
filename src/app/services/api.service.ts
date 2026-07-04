/**
 * ============================================================================
 * SERVICIO DE API REST (api.service.ts)
 * ============================================================================
 * 
 * Este servicio demuestra cómo consumir APIs REST en Angular usando HttpClient.
 * 
 * CONCEPTOS CLAVE:
 * 
 * 1. @Injectable({ providedIn: 'root' })
 *    - Hace que el servicio sea "inyectable" en cualquier componente
 *    - providedIn: 'root' = SINGLETON a nivel de aplicación
 *    - Angular crea UNA SOLA instancia y la comparte
 * 
 * 2. HttpClient
 *    - Cliente HTTP de Angular para hacer peticiones
 *    - Métodos: get(), post(), put(), patch(), delete()
 *    - Retorna Observables (programación reactiva)
 *    - Requiere importar HttpClientModule en app.config.ts
 * 
 * 3. Observable<T>
 *    - Representa un flujo de datos asíncronos
 *    - No se ejecuta hasta llamar .subscribe()
 *    - Permite usar operadores RxJS (map, filter, catchError, etc.)
 * 
 * 4. Genéricos en TypeScript: Observable<IProduct[]>
 *    - Indica que el Observable emitirá un array de IProduct
 *    - Proporciona tipado fuerte y autocompletado
 * 
 * OPERACIONES CRUD:
 * - Create: POST
 * - Read: GET
 * - Update: PUT/PATCH
 * - Delete: DELETE
 */

import { Injectable } from '@angular/core';
// HttpClient: Servicio de Angular para hacer peticiones HTTP
import { HttpClient } from '@angular/common/http';
// Observable: Tipo de RxJS para manejar operaciones asíncronas
import { Observable } from 'rxjs';
// Interface del modelo de datos
import { IProduct } from '../models/product.model';

/**
 * @Injectable marca la clase como un servicio que puede ser inyectado
 * providedIn: 'root' lo registra automáticamente como Singleton
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * URL base de la API
   * En producción, esto vendría de environment.ts:
   *   private apiUrl = environment.apiUrl;
   */
  private apiUrl = 'https://fakestoreapi.com/products';

  /**
   * Constructor - Inyección de HttpClient
   * Angular proporciona automáticamente la instancia de HttpClient
   */
  constructor(private http: HttpClient) { }

  /**
   * GET - Obtener todos los productos
   * 
   * @returns Observable<IProduct[]> - Flujo de datos con array de productos
   * 
   * Uso en componente:
   *   this.apiService.getProducts().subscribe(productos => { ... });
   */
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  /**
   * GET por ID - Obtener un producto específico
   * 
   * @param id - ID del producto a buscar
   * @returns Observable<IProduct> - Flujo con el producto encontrado
   * 
   * Template literals: `${this.apiUrl}/${id}` construye la URL dinámicamente
   */
  getProductById(id: number): Observable<IProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IProduct>(url);
  }

  /**
   * POST - Crear un nuevo producto
   * 
   * @param product - Objeto con los datos del nuevo producto
   * @returns Observable<IProduct> - El producto creado (con ID asignado)
   * 
   * El segundo parámetro de post() es el body de la petición
   */
  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, product);
  }

  /**
   * PUT - Actualizar un producto existente (reemplazo completo)
   * 
   * @param id - ID del producto a actualizar
   * @param product - Nuevos datos completos del producto
   * @returns Observable<IProduct> - El producto actualizado
   * 
   * Diferencia PUT vs PATCH:
   * - PUT: Reemplaza TODO el recurso
   * - PATCH: Actualiza solo los campos enviados
   */
  updateProduct(id: number, product: IProduct): Observable<IProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IProduct>(url, product);
  }

  /**
   * DELETE - Eliminar un producto
   * 
   * @param id - ID del producto a eliminar
   * @returns Observable<IProduct> - Confirmación de eliminación
   */
  deleteProduct(id: number): Observable<IProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<IProduct>(url);
  }
}
