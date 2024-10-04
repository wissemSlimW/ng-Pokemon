import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Team } from '../../../../shared/types/team';
import { Weakness } from '../../../../shared/types/weakness';

@Component({
  selector: 'p-battle-outcome',
  standalone: true,
  templateUrl: './battle-outcome.component.html',
  styleUrl: './battle-outcome.component.css',
  imports: [CommonModule],
})
export class BattleOutcomeComponent {
  weaknesses: Weakness[] = [];
  @Input() team: Team | undefined;
  @Input() rounds: number = 1;
}
