import { Component, OnInit, inject } from '@angular/core';
import { ServicioFamiliarService } from '../servicio-familiar.service';
import { EstiloHermanosDirective } from '../estilo-hermanos.directive';

@Component({
  selector: 'app-hermano',
  standalone: true,
  imports: [EstiloHermanosDirective],
  templateUrl: './hermano.component.html',
  styleUrls: ['./hermano.component.css']
})
export class HermanoComponent  implements OnInit {

   //constructor(private servicioFamiliar: ServicioFamiliarService) { }
   
   // Inyección de dependencias utilizando la función inject
   private servicioFamiliar = inject(ServicioFamiliarService);

  nombre?: string;

  ngOnInit(): void {
    this.servicioFamiliar.setHermanoChico("Predro");   
    this.nombre = this.servicioFamiliar.getHermanoChico();
  }   

  saludar() {
    this.servicioFamiliar.saludar(this.servicioFamiliar.getHermanoGrande());
  }

  preguntarPorHijo() {
    console.log(this.servicioFamiliar.preguntarPorHijo());
  }

}
