/**
 * ============================================================================
 * ARCHIVO DE RUTAS DE ANGULAR (app.routes.ts)
 * ============================================================================
 * 
 * Este archivo define el SISTEMA DE ENRUTAMIENTO de la aplicación Angular.
 * El Router de Angular permite la navegación entre diferentes vistas/componentes
 * sin recargar la página completa (Single Page Application - SPA).
 * 
 * CONCEPTOS CLAVE:
 * - Routes: Array de objetos que mapean URLs a componentes
 * - path: La URL que el usuario escribe en el navegador
 * - component: El componente que se renderiza cuando se accede a esa ruta
 * - redirectTo: Redirige automáticamente a otra ruta
 * - pathMatch: 'full' significa que la URL debe coincidir exactamente
 * - :parametro: Parámetros dinámicos en la URL (ej: /productos/electronics/1)
 * - '**': Wildcard que captura cualquier ruta no definida (ruta 404)
 * 
 * ORDEN IMPORTANTE: Las rutas se evalúan en orden, de arriba hacia abajo.
 * Por eso las rutas más específicas deben ir antes que las genéricas.
 */

import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';

/**
 * Definición del array de rutas de la aplicación.
 * Se exporta como constante para ser utilizado en app.config.ts
 */
export const routes: Routes = [
    // Ruta raíz: redirige a 'inicio' cuando el usuario accede a '/'
    // pathMatch: 'full' asegura que solo coincida con la ruta vacía exacta
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    
    // Ruta para el componente de inicio
    { path: 'inicio', component: InicioComponent },
    
    // Ruta con PARÁMETROS DINÁMICOS (:categoria y :id)
    // Ejemplo: /productos/electronics/1 -> categoria='electronics', id='1'
    // Los parámetros se acceden con ActivatedRoute en el componente
    { path: 'productos/:categoria/:id', component: DetalleProductoComponent },
    
    // Ruta simple para listar todos los productos
    { path: 'productos', component: ProductosComponent },
    
    // Ruta para el formulario de contacto
    { path: 'contacto', component: ContactoComponent },
    
    // WILDCARD ROUTE (**): Captura cualquier ruta no definida arriba
    // Útil para manejar errores 404 o redirigir a una página por defecto
    // SIEMPRE debe ser la ÚLTIMA ruta del array
    { path: '**', redirectTo: 'inicio' }
];
