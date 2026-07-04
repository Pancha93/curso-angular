import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { PadreComponent } from "./padre/padre.component";
import { HermanoComponent } from "./hermano/hermano.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, PadreComponent, HermanoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cursoAngular';
  subtitle = 'Bienvenidos a mi curso de Angular';
}
