import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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


  producto?: IProduct;
  productos: IProduct[] = [];
  color: string = '';
  color2: string = '';
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.apiService.getProductById(+params['id']).subscribe(
        (product: IProduct) => {
          this.producto = product;
          this.loading = false;
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
          this.loading = false;
        }
      );
      });     
    }

}
