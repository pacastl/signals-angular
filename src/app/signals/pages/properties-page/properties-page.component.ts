import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnDestroy,OnInit{


  public counter = signal(10);
  public user = signal<User>({
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  });

  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }` );

  public userChangeEffect= effect ( () => {
    // Se ejecuta cuando el component se crea por primera vez
    // y cada vez que cambia
    console.log( `${ this.user().first_name } - ${ this.counter() } ` );

  });


  // Keyof es para que no nos pasen una propiedad que no existe
  onFieldUpdated(field: keyof User, value: string) {
    // Es potencialmente inseguro,
    // porque pueden mandar un campo que no exista
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    // Otra forma de hacer lo mismo
    // this.user.update( current => ({
    //   ...current,
    //    [field]:value
    // }))

    // Ya no es inseguro porque solo afecta a campos que existen
    // en el usuario con este código
    this.user.update(current => {

      switch (field) {
        case 'email':
          current.email = value;
          break;
        case 'avatar':
          current.avatar = value;
          break;
        case 'first_name':
          current.first_name = value;
          break;
        case 'last_name':
          current.last_name = value;
          break;

        case 'id':
          current.id=Number(value);
          break;
      }
      return current;
    })

  }

  ngOnDestroy(): void {
    // this.userChangeEffect.destroy();
  }
  // Para demostrar que el efecto se limpia solo sin necesidad de destruirlo a mano
  ngOnInit(): void {
    setInterval( () => {
      this.counter.update( current => current +1);

      // if(this.counter() == 15)
      // this.userChangeEffect.destroy();
    },1000)
  }

  increaseBy(value: number) {
    this.counter.update( current => current + value);
  }

}
