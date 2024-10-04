import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'p-delete-dialog',
  standalone: true,
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  @Input() isOpen: boolean = false;
  @Input() text: string = '';
  @Output() confirmDeleteEmitter = new EventEmitter();
  @Output() closeEmitter = new EventEmitter();
  closeModal() {
    this.closeEmitter.emit();
  }
  handleDelete() {
    this.confirmDeleteEmitter.emit();
  }
}
