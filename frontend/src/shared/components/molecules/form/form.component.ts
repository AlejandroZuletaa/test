import { GatewayService } from '@services/gateway.service';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
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
export class FormComponent implements OnInit {
  @Input() userData?: UserInterface; // Datos del usuario a editar (opcional)
  form: FormGroup; // Grupo de controles de formulario

  // Definición de los campos del formulario
  fields = [
    {
      label: 'name',
      type: 'text',
      id: 'Name',
      formControl: 'Name',
      validation: [Validators.required],
      errorMessage: 'El nombre es requerido.',
    },
    {
      label: 'Email',
      type: 'email',
      id: 'Email',
      formControl: 'Email',
      validation: [Validators.required, Validators.email],
      errorMessage: 'El correo es requerido y debe ser un correo válido.',
    },
    {
      label: 'Phone',
      type: 'text',
      id: 'Phone',
      formControl: 'Phone',
      validation: [Validators.required, Validators.pattern(/^\d{10}$/)],
      errorMessage: 'El teléfono es requerido y debe tener 10 dígitos.',
    },
    {
      label: 'Age',
      type: 'text',
      id: 'Age',
      formControl: 'Age',
      validation: [Validators.required, Validators.min(1)],
      errorMessage: 'La edad es requerida y debe ser mayor a 0.',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private gatewayService: GatewayService,
    private modalControllerService: ModalControllerService,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit() {
    // Inicializa el formulario
    this.fields.forEach((field) => {
      this.form.addControl(
        field.formControl,
        this.fb.control('', field.validation)
      );
    });

    // Si hay datos de usuario, carga los valores en el formulario
    if (this.userData) {
      this.form.patchValue({
        Name: this.userData.Name,
        Email: this.userData.Email,
        Phone: this.userData.Phone,
        Age: this.userData.Age,
      });
    }
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.form.valid) {
      const user: UserInterface = this.userData
        ? { ...this.userData, ...this.form.value } // Actualiza los datos
        : { id: Math.floor(Math.random() * 10000), ...this.form.value }; // Nuevo usuario

      if (this.userData) {
        this.gatewayService.updateUser(user); // Lógica para actualizar
      } else {
        this.gatewayService.addUser(user); // Lógica para agregar
      }

      this.modalControllerService.closeModal();
      this.form.reset();
    }
  }

  // Método para acceder a los controles del formulario
  get f() {
    return this.form.controls;
  }
}
