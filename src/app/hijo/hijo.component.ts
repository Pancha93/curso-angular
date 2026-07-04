import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MiPipePersonalizadoPipe } from '../mi-pipe-personalizado.pipe';


@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [FormsModule, MiPipePersonalizadoPipe],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.css'
})
export class HijoComponent {

  // Decorador @Input para recibir datos desde el componente padre
  @Input() recibeHijo: string = "";

  @Output() enviarMensaje = new EventEmitter<string>();
  @Output() incrementarContadorDesdeHijo = new EventEmitter<void>();
  @Output() decrementarContadorDesdeHijo = new EventEmitter<void>();

  mensajeHijo: string = "";

  enviarMensajeAlPadre() {
    this.enviarMensaje.emit(this.mensajeHijo);
  }

  incrementar() {
    this.incrementarContadorDesdeHijo.emit();
  }

  decrementar() {
    this.decrementarContadorDesdeHijo.emit();
  }


}
