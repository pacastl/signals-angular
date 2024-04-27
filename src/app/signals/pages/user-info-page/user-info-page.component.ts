import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit{

  private usersService=inject(UsersServiceService);
  public userId=signal(1);

  // Los datos del ususario (si no existe es undefined)
  public currentUser=signal<User | undefined>(undefined);
  public userWasFound=signal(true);
  // Consejo: Poner el valor de retorno cuando no está claro
  public fullName=computed<string>( () => {
    if(!this.currentUser()) return 'Usuario no encontrado';

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  })

    // Para hacer la petiicón htp encaunto se monta el componente
    ngOnInit(): void {
      this.loadUser(this.userId());
    }

    loadUser(id:number){
      // No hay usuario, entonces no hace nada
      if(id <=0 ) return;
      //IMP :es síncrono
      this.userId.set(id);
      // Hacemos ver que le cambio de usuario es más rápido con esa línea
      this.currentUser.set(undefined);

      this.usersService.getUserById(id)
      .subscribe({
        // user => {
        // Como no me interesa el valor anterior  uso set y no update
        // this.currentUser.set(user);
        next:(user) =>{
          this.currentUser.set(user);
          // Tenemos el ususario entonces,lo ponemos a true
          this.userWasFound.set(true);
        },
        // Caso de error
        error: () => {
          this.userWasFound.set(false),
          // Limpiamos la info del usuario porque ya no está
          this.currentUser.set(undefined)}
      });
    }
}
