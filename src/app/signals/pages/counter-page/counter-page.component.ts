import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  // Signal ayuda a que Angular conozca de forma quirúrugica
  // donde se está usando el counter
  public counter=signal(10);
  // Esta señal es de SOLO LECTURA, NO nos deja cambiarlo con update, set...
  public squareCounter=computed( () => this.counter() * this.counter());

  increaseBy(value:number){
    // Primera forma de hacerlo
    // this.counter.set(this.counter() + value);

    // Segunda forma (current es el valor actual)
    this.counter.update(current => current + value);
  }
  decreaseBy(value:number){
    this.counter.update(current => current +value);
  }
}
