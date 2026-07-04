/**
 * ============================================================================
 * COMPONENTE DETALLE PRODUCTO - Parámetros de Ruta (detalle-producto.component.ts)
 * ============================================================================
 * 
 * Este componente demuestra cómo trabajar con PARÁMETROS DE RUTA en Angular.
 * 
 * RUTA CON PARÁMETROS (definida en app.routes.ts):
 *   { path: 'productos/:categoria/:id', component: DetalleProductoComponent }
 * 
 * EJEMPLO DE URL:
 *   /productos/electronics/1
 *   - :categoria = 'electronics'
 *   - :id = '1'
 * 
 * CONCEPTOS CLAVE:
 * 
 * 1. ActivatedRoute
 *    - Servicio que da acceso a la información de la ruta activa
 *    - params: Observable de los parámetros de ruta
 *    - queryParams: Observable de los query strings (?key=value)
 *    - snapshot: Versión síncrona (no reactiva) de los params
 * 
 * 2. route.params.subscribe()
 *    - Escucha cambios en los parámetros de ruta
 *    - Importante cuando el componente se reutiliza con diferentes params
 *    - Sin subscribe, usar route.snapshot.params['id'] (una sola lectura)
 * 
 * 3. Operador + (conversión a número)
 *    - +params['id'] convierte el string '1' a number 1
 *    - Alternativa: parseInt(params['id'], 10)
 *    - Number(params['id']) también funciona
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// ActivatedRoute: Servicio para acceder a los parámetros de la ruta actual
import { ActivatedRoute } from '@angular/router';
// Datos mock (no usados actualmente, pero útiles para desarrollo sin API)
import { Producto, productos } from '../productos/productos.mok';
import { IProduct } from '../models/product.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  // ============================================================================
  // PROPIEDADES DEL COMPONENTE
  // ============================================================================

  /**
   * Producto actual a mostrar
   * El ? indica que puede ser undefined (mientras carga)
   */
  producto?: IProduct;
  
  /**
   * Array para almacenar productos (si fuera necesario)
   */
  productos: IProduct[] = [];
  
  /**
   * Propiedades para estilos dinámicos (ejemplos de property binding)
   */
  color: string = '';
  color2: string = '';
  
  /**
   * Flag para mostrar indicador de carga
   * Buena práctica UX: mostrar feedback mientras se cargan datos
   */
  loading: boolean = true;

  /**
   * Constructor - Inyección de dependencias
   * 
   * @param route - ActivatedRoute para acceder a parámetros de URL
   * @param apiService - Servicio para llamadas HTTP
   */
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  /**
   * ngOnInit - Cargar producto cuando el componente se inicializa
   * 
   * FLUJO:
   * 1. Suscribirse a cambios en los parámetros de ruta
   * 2. Cuando llegan parámetros, llamar a la API
   * 3. Cuando llegan datos, actualizar el componente
   * 
   * OBSERVABLES ANIDADOS:
   * - route.params es un Observable
   * - apiService.getProductById() es otro Observable
   * - Aquí se anidan con subscribe() (funciona pero hay mejores formas)
   * 
   * MEJOR PRÁCTICA con operadores RxJS:
   *   this.route.params.pipe(
   *     switchMap(params => this.apiService.getProductById(+params['id']))
   *   ).subscribe(product => this.producto = product);
   */
  ngOnInit(): void {
    // Suscribirse a cambios en los parámetros de la URL
    this.route.params.subscribe(params => {
      // +params['id'] convierte el string a número
      // Llamar a la API con el ID del producto
      this.apiService.getProductById(+params['id']).subscribe(
        (product: IProduct) => {
          // Éxito: guardar el producto y quitar el loading
          this.producto = product;
          this.loading = false;
        },
        (error) => {
          // Error: loguear y quitar el loading
          console.error('Error al obtener el producto:', error);
          this.loading = false;
        }
      );
    });     
  }

}
