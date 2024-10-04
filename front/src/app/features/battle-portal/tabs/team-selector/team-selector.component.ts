import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Team } from '../../../../shared/types/team';
import { Id } from '../../../../shared/types/model';
import { BattlePhase } from '../../types/type';

@Component({
  selector: 'p-team-selector',
  standalone: true,
  templateUrl: './team-selector.component.html',
  styleUrl: './team-selector.component.css',
  imports: [],
})
export class TeamSelectorComponent {
  @Input() teams: Team[] = [];
  firstTeamId: Id = null! as Id;
  secondTeamId: Id = null! as Id;
  @Output() selectFirstTeam = new EventEmitter<Id>();
  @Output() selectSecondTeam = new EventEmitter<Id>();
  @Output() nextPhase = new EventEmitter<BattlePhase>();
  selectFirst(id: Id) {
    this.firstTeamId = id;
    this.selectFirstTeam.emit(id);
  }
  selectSecond(id: Id) {
    this.secondTeamId = id;
    this.selectSecondTeam.emit(id);
  }
  handleStart() {
    if (!this.firstTeamId || !this.secondTeamId) {
      window.alert('You need to select a team from both sides');
    } else this.nextPhase.emit('Battle');
  }
  getTeamPower(team: Team) {
    return team.pokemon?.reduce((acc, cur) => acc + cur.power, 0);
  }
}
