import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit{

  // miFormulario: FormGroup = new FormGroup({
  //   nombre      : new FormControl('RTX 4080ti'),
  //   precio      : new FormControl('0'),
  //   existencias : new FormControl('5')
  // });

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)] ],
    precio: ['', [Validators.required, Validators.min(0)] ],
    existencias: ['', [Validators.required, Validators.min(0)] ]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Se debe de enviar todos los campos si se quiere inicializar con el setValue. con el reset no hace falta.
    this.miFormulario.reset({
      nombre: 'preoducto',
      precio: 123
    });
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }

  guardar():void {
    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    this.miFormulario.reset();
  }

}
