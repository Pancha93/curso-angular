import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TipoDocumentoComponent } from '../tipo-documento/tipo-documento.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TipoDocumentoComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

 //formulario de plantilla con ngModel

  public usuario: any = {
    nombre: '',
    email: '',
    tipoDocumento: ''
  };

  enviar() {
    console.log(this.usuario);
  }

  //formulario reactivo con FormGroup y FormControl

  public miFormulario: FormGroup;
  usuarioactivo: string = 'Calvo';

  constructor(private form: FormBuilder) {

    this.miFormulario = this.form.group({
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]]
    });

    // agregar control para tipo de documento (reactivo)
    this.miFormulario.addControl('tipoDocumento', this.form.control('', Validators.required));

  }

  //ngOnInit para cargar el valor del apellido y deshabilitar el campo suponiendo que el usuario ya tiene un apellido asignado y no se puede modificar.
   ngOnInit(): void {
    this.miFormulario.get('apellido')?.setValue(this.usuarioactivo);
    this.miFormulario.get ('apellido')?.disable();
  }

  enviar2() {
    if (this.miFormulario.valid) {
      console.log(this.miFormulario);
    } else {
      console.log('Formulario no válido');
    }

}

  hasError(controlName: string, errorName: string) {
    return this.miFormulario.get(controlName)?.hasError(errorName) && this.miFormulario.get(controlName)?.touched;  
  }
}
