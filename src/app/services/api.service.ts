import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://fakestoreapi.com/products'; // URL de la API

  constructor(private http: HttpClient) { }

  // Método para obtener todos los productos
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  // Método para obtener un producto por su ID
  getProductById(id: number): Observable<IProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IProduct>(url);
  }

  // Método para crear un nuevo producto
  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, product);
  }

  // Método para actualizar un producto existente
  updateProduct(id: number, product: IProduct): Observable<IProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<IProduct>(url, product);
  }

  // Método para eliminar un producto
  deleteProduct(id: number): Observable<IProduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<IProduct>(url);
  }
}
