import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { Message, MessageService } from 'primeng/api';
import { WebServiceUtilities } from '../../../../services/webservice.utilities';
import { API_BASE_Configuration } from '../../../../../api.constants';
import { ToastModule } from 'primeng/toast';

interface Scope {
  scope: any;
}

@Component({
  standalone: true,
  selector: 'TriNnovatorApp-resetpassworddialog',
  imports: [
    ButtonModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    ToastModule,
  ],
  templateUrl: './resetpassworddialog.component.html',
  styleUrl: './resetpassworddialog.component.scss',
  providers: [MessageService],
})
export class ResetPasswordDialogComponent {
  configurationScope: Scope[] | undefined;

  name: string | undefined;
  value: string = '';

  msgs: Message[] = [];

  constructor(private ref: DynamicDialogRef) {}

  onSubmit(data: MouseEvent) {}

  onCancel(data: MouseEvent) {
    this.ref.close(data);
  }
}
