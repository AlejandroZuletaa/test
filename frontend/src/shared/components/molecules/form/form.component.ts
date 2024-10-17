import { GatewayService } from '@services/gateway.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '@atoms/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInterface } from '@interface/userModel';
import { ModalControllerService } from '@services/modal-controller.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  form: FormGroup; // Grupo de controles de formulario

  // Definición de los campos del formulario
  fields = [
    {
      label: 'Nombre',
      type: 'text',
      id: 'name',
      formControl: 'name',
      validation: [Validators.required],
      errorMessage: 'El nombre es requerido.',
    },
    {
      label: 'Correo Electrónico',
      type: 'email',
      id: 'email',
      formControl: 'email',
      validation: [Validators.required, Validators.email],
      errorMessage: 'El correo es requerido y debe ser un correo válido.',
    },
    {
      label: 'Teléfono',
      type: 'text',
      id: 'phone',
      formControl: 'phone',
      validation: [Validators.required, Validators.pattern(/^\d{10}$/)],
      errorMessage: 'El teléfono es requerido y debe tener 10 dígitos.',
    },
    {
      label: 'Edad',
      type: 'text',
      id: 'age',
      formControl: 'age',
      validation: [Validators.required, Validators.min(1)],
      errorMessage: 'La edad es requerida y debe ser mayor a 0.',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private GatewayService: GatewayService,
    private ModalControllerService: ModalControllerService
  ) {
    this.form = this.fb.group({}); // Inicializa el formulario
    // Añade controles al formulario basándose en la definición de campos
    this.fields.forEach((field) => {
      this.form.addControl(
        field.formControl,
        this.fb.control('', field.validation)
      );
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.form.valid) {
      // Verifica si el formulario es válido
      const user: UserInterface = {
        id: Math.floor(Math.random() * 10000), // Genera un ID aleatorio
        name: this.form.value.name,
        email: this.form.value.email,
        phone: this.form.value.phone,
        age: this.form.value.age,
      };

      this.GatewayService.addUser(user); // Envía el usuario al servicio
      this.ModalControllerService.closeModal(); // Cierra el modal
      this.form.reset(); // Limpia el formulario después de enviar
    }
  }

  // Método para acceder a los controles del formulario
  get f() {
    return this.form.controls;
  }
}
