import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  // Forma antigua de inyectar
   // constructor( private fb: FormBuilder ) {}

  // nueva forma de inyectar
  private fb=inject(FormBuilder);

  public color:string= 'green';

  public myForm: FormGroup=this.fb.group({
    // Hacemos varias validaciones (que3 sea requerido, que tenga 6 caracteres y que sea un email)
    name: ['', [ Validators.required, Validators.minLength(6), Validators.email ] ]
  });

  changeColor() {
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }

}
