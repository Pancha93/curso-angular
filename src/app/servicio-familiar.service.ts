import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioFamiliarService {

  hermanoGrande?: string ;
  hermanoChico?: string ; 

  getHermanoGrande(): string {
    return this.hermanoGrande || "";
  }

  getHermanoChico(): string {
    return this.hermanoChico || "";
  }

setHermanoGrande(nombre: string) {
    this.hermanoGrande = nombre;
  }

  setHermanoChico(nombre: string) {
    this.hermanoChico = nombre;
  }

  saludar(hermano: string){
    console.log(`Hola ${hermano}, ¿cómo estás?`);
  }

  preguntarPorHijo(): string {
    return "¿Cómo está tu hijo?";
  }

  constructor() { }
}
