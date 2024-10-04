import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'p-add-card',
  standalone: true,
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.css',
  imports: [],
})
export class AddCardComponent {
  @Output() clickEmitter = new EventEmitter();
  handleClick() {
    this.clickEmitter.emit();
  }
}
