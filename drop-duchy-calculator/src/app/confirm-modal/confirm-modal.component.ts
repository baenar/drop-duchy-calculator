import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() proceed = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();
  }

  onProceed() {
    this.proceed.emit();
  }
}
