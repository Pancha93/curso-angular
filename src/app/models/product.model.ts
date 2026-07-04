/**
 * ============================================================================
 * MODELO DE DATOS - Interfaces y Enums en TypeScript (product.model.ts)
 * ============================================================================
 * 
 * Este archivo define la ESTRUCTURA DE DATOS usando características de TypeScript.
 * 
 * ¿POR QUÉ USAR INTERFACES?
 * 1. Tipado fuerte: Detecta errores en tiempo de desarrollo
 * 2. Autocompletado: El IDE sugiere propiedades disponibles
 * 3. Documentación: El código se autodocumenta
 * 4. Refactoring: Cambios se propagan automáticamente
 * 
 * INTERFACE vs CLASS vs TYPE:
 * - interface: Solo define forma/estructura, no genera código JavaScript
 * - class: Genera código JS, puede tener métodos e implementaciones
 * - type: Similar a interface, pero más flexible para tipos complejos
 * 
 * CONVENCIÓN DE NOMBRES:
 * - IProduct: La "I" indica que es una Interface (opcional pero común)
 * - ProductModel: Alternativa sin prefijo
 * - Product: También válido y cada vez más usado
 */

/**
 * Interface principal del Producto
 * 
 * Define la estructura que debe tener cualquier objeto de tipo producto.
 * Todos los campos son OBLIGATORIOS (sin ?).
 * 
 * USO:
 *   const producto: IProduct = { id: 1, title: '...', ... };
 *   function getProduct(): IProduct { ... }
 *   productos: IProduct[] = [];  // Array de productos
 */
export interface IProduct {
    id:          number;      // Identificador único
    title:       string;      // Nombre del producto
    price:       number;      // Precio (número decimal)
    description: string;      // Descripción detallada
    category:    Category;    // Categoría (usa el enum definido abajo)
    image:       string;      // URL de la imagen
    rating:      Rating;      // Objeto anidado con calificación
}

/**
 * ENUM - Enumeración de Categorías
 * 
 * Los enums definen un conjunto FIJO de valores posibles.
 * 
 * VENTAJAS:
 * - Evita errores de tipeo: Category.Electronics vs "electroincs"
 * - Autocompletado: El IDE muestra opciones disponibles
 * - Refactoring seguro: Cambiar el valor actualiza todo el código
 * 
 * STRING ENUM (como este):
 *   - Valores legibles en JSON/APIs
 *   - Fácil debugging
 * 
 * NUMERIC ENUM (alternativa):
 *   enum Category { Electronics = 0, Jewelery = 1 }
 *   - Más eficiente en memoria
 *   - Menos legible
 */
export enum Category {
    Electronics = "electronics",
    Jewelery = "jewelery",
    MenSClothing = "men's clothing",
    WomenSClothing = "women's clothing",
}

/**
 * Interface anidada para Rating
 * 
 * Demuestra cómo las interfaces pueden contener otras interfaces.
 * IProduct.rating es de tipo Rating.
 * 
 * CAMPOS:
 * - rate: Calificación promedio (ej: 4.5)
 * - count: Número de reseñas (ej: 120)
 */
export interface Rating {
    rate:  number;    // Calificación (0-5)
    count: number;    // Cantidad de reseñas
}
