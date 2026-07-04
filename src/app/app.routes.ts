import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: '', component: InicioComponent },
    { path: 'productos/:categoria/:id', component: DetalleProductoComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: '**', redirectTo: 'inicio' }
];
