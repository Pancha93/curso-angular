import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareasService } from '../services/tareas.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaTareas: string[] = [];
  nuevaTarea: string = '';

  private tareasService = inject(TareasService);

  ngOnInit() {
    this.listaTareas = this.tareasService.getTareas();
  }

  agregarTarea() {
    this.tareasService.agregarTarea(this.nuevaTarea);
    this.nuevaTarea = '';
    this.listaTareas = this.tareasService.getTareas();
  }

  eliminarTarea(index: number) {
    this.tareasService.eliminarTarea(index);
    this.listaTareas = this.tareasService.getTareas();
  }
}
