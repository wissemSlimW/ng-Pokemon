import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteDialogComponent } from '../../../../shared/components/delete-dialog/delete-dialog.component';
import { Team } from '../../../../shared/types/team';

@Component({
  selector: 'p-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  imports: [],
})
export class CardComponent {
  @Input() team: Team = null! as Team;

  getPower() {
    return this.team.pokemon?.reduce((acc, cur) => acc + cur.power, 0);
  }
  @Output() deleteEmitter = new EventEmitter<Team>();
  @Output() updateEmitter = new EventEmitter<Team>();
  handleUpdate() {
    this.updateEmitter.emit(this.team);
  }
  handleDelete() {
    this.deleteEmitter.emit(this.team);
  }
}
