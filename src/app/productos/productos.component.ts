import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { productos } from './productos.mok';
import { IProduct } from '../models/product.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  //Productos desde el archivo de mock
  // productsList: IProduct[] = productos;

// Productos desde la Api
  productsList: IProduct[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.productsList = products;
        console.log('Productos obtenidos desde la API:', this.productsList);
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );

}
}
