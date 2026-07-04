export const productos = [
    { id: 1, nombre: 'Lavandina', precio: 10, descripcion: 'Lavandina de alta calidad para limpieza y desinfección.' },
    { id: 2, nombre: 'Detergente', precio: 15, descripcion: 'Detergente eficaz para todo tipo de ropa.' },
    { id: 3, nombre: 'Jabon en polvo', precio: 20, descripcion: 'Jabon en polvo para limpieza profunda.' },
    { id: 4, nombre: 'Limpiador multiuso', precio: 12, descripcion: 'Limpiador multiuso para diversas superficies.' },
    { id: 5, nombre: 'Desinfectante', precio: 18}
];

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion?: string;
}