import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.css']
})
export class InfoModalComponent {
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
