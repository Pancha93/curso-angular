import { Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-tipo-documento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TipoDocumentoComponent),
      multi: true,
    },
  ],
})
export class TipoDocumentoComponent implements ControlValueAccessor {
  tipos: string[] = ['Cédula', 'Pasaporte', 'Licencia', 'Otro'];

  value: string | null = '';
  isDisabled: boolean = false;

  private onChange = (v: any) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    this.value = obj;
    console.log('writeValue called, nuevo valor:', this.value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  select(value: any) {
    this.value = value;
    console.log('select() seleccionado:', value);
    this.onChange(this.value);
  }
}
