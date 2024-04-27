import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}
@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  // Esto sería de la manera tradicional
  // public menuItems:MenuItem[]=[
  //   {title: 'Contador',route: 'counter'},
  //   {title: 'Usuario',route: 'user-info'},
  //   {title: 'Mutaciones',route: 'properties'},
  // ]

  // Con señales hay muchos beneficios por debajo, en el tema de
  // rendericaciones, mayor velocidad de notificación

  public menuItems = signal<MenuItem[]>(
    [
      { title: 'Contador', route: 'counter' },
      { title: 'Usuario', route: 'user-info' },
      { title: 'Mutaciones', route: 'properties' },
    ]);
}
