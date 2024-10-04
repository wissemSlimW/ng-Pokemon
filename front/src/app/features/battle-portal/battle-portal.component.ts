import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Team } from '../../shared/types/team';
import { TeamSelectorComponent } from './tabs/team-selector/team-selector.component';
import { BattlePhase, Winner } from './types/type';
import { Id } from '../../shared/types/model';
import { getItem } from '../../shared/utils/getItem';
import { BattleArenaComponent } from './tabs/battle-arena/battle-arena.component';
import { BattleOutcomeComponent } from './tabs/battle-outcome/battle-outcome.component';

@Component({
  selector: 'p-battle-portal',
  standalone: true,
  templateUrl: './battle-portal.component.html',
  styleUrl: './battle-portal.component.css',
  imports: [
    TeamSelectorComponent,
    BattleArenaComponent,
    BattleOutcomeComponent,
  ],
})
export class BattlePortalComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService
      .getAll<Team>('teams')
      .subscribe((res) => (this.teams = res));
  }
  phase: BattlePhase = 'TeamSelect';
  result: Team | undefined;
  teams: Team[] = [];
  firstTeam: Team = null! as Team;
  secondTeam: Team = null! as Team;
  firstPlayer: number = 0;
  secondPlayer: number = 0;
  round: number = 1;
  selectFirstTeam(id: Id) {
    this.firstTeam = getItem({ list: this.teams, field: 'id', value: id })!;
  }
  selectSecondTeam(id: Id) {
    this.secondTeam = getItem({ list: this.teams, field: 'id', value: id })!;
  }
  nextPhase(phase: BattlePhase) {
    this.phase = phase;
  }
  checkResult(props: { phase: BattlePhase; winner: Winner; rounds: number }) {
    this.phase = props.phase;
    this.round = props.rounds;
    switch (props.winner) {
      case 'Team1':
        this.result = this.firstTeam;
        break;
      case 'Team2':
        this.result = this.secondTeam;
        break;
      default:
        this.result = undefined;
        break;
    }
  }
}
