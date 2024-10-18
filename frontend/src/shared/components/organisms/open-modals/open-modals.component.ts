import { Component } from '@angular/core';
import { ModalComponent } from '@atoms/modal/modal.component';
import { FormComponent } from '@molecules/form/form.component';


@Component({
  selector: 'app-open-modals',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './open-modals.component.html',
  styleUrl: './open-modals.component.scss',
})
export class OpenModalsComponent {
  srcImg: string = 'imagenes/register.svg';
  altImg:string = 'Image register user'
}
