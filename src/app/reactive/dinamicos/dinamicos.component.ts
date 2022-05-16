import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.min(3)]],
    favoritos: this.fb.array([
      [ 'CyberPunk' ],
      [ 'FIFA 2022' ]
    ], Validators.required)
  });

  nuevoFavorito: FormControl = this.fb.control('',  Validators.required);

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  agregarFavorito() {
    if(this.nuevoFavorito.invalid){
      return;
    }

    this.favoritosArr.push( this.fb.control( this.nuevoFavorito.value, Validators.required ));
    this.nuevoFavorito.reset();
  }

  borrar(index: number) {
    this.favoritosArr.removeAt(index);
  }

  guardar():void {
    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
