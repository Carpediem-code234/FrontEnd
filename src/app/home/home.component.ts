import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  navigateToServices() {
    console.log('Navegando a servicios');
    // Esta función se llamará cuando se haga clic en el botón
  }
}
