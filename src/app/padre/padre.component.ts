import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HijoComponent } from "../hijo/hijo.component";
import { ServicioFamiliarService } from '../servicio-familiar.service';
import { EstiloHermanosDirective } from '../estilo-hermanos.directive';

@Component({
  selector: 'app-padre',
  standalone: true,
  imports: [CommonModule, HijoComponent, EstiloHermanosDirective],
  templateUrl: './padre.component.html',
  styleUrls: ['./padre.component.css']
})
export class PadreComponent implements OnInit {

  constructor(private servicioFamiliar: ServicioFamiliarService) { }
 
  nombre?: string;
  fecha?: Date = new Date();
  dolar?: number = 1600;
  pi?: number = Math.PI;
  factor?: number = 0.5;

  ngOnInit(): void {
    this.servicioFamiliar.setHermanoGrande("Juan");   
    this.nombre = this.servicioFamiliar.getHermanoGrande();  
  }

  saludar() {
    this.servicioFamiliar.saludar(this.servicioFamiliar.getHermanoChico());  
  }

  preguntarPorHijo() {
    console.log(this.servicioFamiliar.preguntarPorHijo());
  }


  valorContador: number = 0;

  incrementar() {
    this.valorContador++;
  }

  decrementar() {
    this.valorContador--;
  }

  mensajePadre = "Mensaje desde el padre";

  reciboMensajeHijo: string = "";

  recibirMensaje(event: string) {
    this.reciboMensajeHijo = event;
  }


}
