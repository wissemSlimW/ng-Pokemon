import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { Team } from '../../../../shared/types/team';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../shared/services/api.service';
import { Weakness } from '../../../../shared/types/weakness';
import { BattlePhase, Winner } from '../../types/type';

@Component({
  selector: 'p-battle-arena',
  standalone: true,
  templateUrl: './battle-arena.component.html',
  styleUrl: './battle-arena.component.css',
  imports: [AvatarComponent, PokemonCardComponent, CommonModule],
})
export class BattleArenaComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService
      .getAll<Weakness>('weaknesses')
      .subscribe((res) => (this.weaknesses = res));
  }
  weaknesses: Weakness[] = [];
  @Input() firstTeam: Team = null! as Team;
  @Input() secondTeam: Team = null! as Team;
  @Input() phase: BattlePhase = 'Battle';
  winner: Winner;
  @Output() nextPhase = new EventEmitter<{
    phase: BattlePhase;
    winner: Winner;
    rounds: number;
  }>();
  checkResult() {
    this.nextPhase.emit({
      phase: 'Result',
      winner: this.winner,
      rounds: this.round,
    });
  }

  firstPlayer: number = 0;
  secondPlayer: number = 0;
  firstPlayerHp: number = this.firstTeam?.pokemon?.[0].life || 0;
  secondPlayerHp: number = this.secondTeam?.pokemon?.[0].life || 0;
  round: number = 1;
  handleRoundOutcome() {
    this.round++;
    const fact1 = this.weaknesses.find(
      (w) =>
        w.type1 === this.firstTeam.pokemon?.[this.firstPlayer].type &&
        w.type2 === this.secondTeam.pokemon?.[this.secondPlayer].type
    )?.factor;
    const fact2 = this.weaknesses.find(
      (w) =>
        w.type1 === this.secondTeam.pokemon?.[this.secondPlayer].type &&
        w.type2 === this.firstTeam.pokemon?.[this.firstPlayer].type
    )?.factor;
    this.firstPlayerHp =
      this.firstPlayerHp -
      this.secondTeam.pokemon![this.secondPlayer].power * fact1!;
    this.secondPlayerHp =
      this.secondPlayerHp -
      this.firstTeam.pokemon![this.firstPlayer].power * fact2!;
    if (this.firstPlayerHp <= 0) {
      this.firstPlayer++;
      this.firstPlayerHp = this.firstTeam.pokemon?.[this.firstPlayer]?.life!;
    }
    if (this.secondPlayerHp <= 0) {
      this.secondPlayer++;
      this.secondPlayerHp = this.secondTeam.pokemon?.[this.secondPlayer]?.life!;
    }
    if (
      this.firstPlayer === this.firstTeam.pokemon!.length &&
      this.secondPlayer === this.secondTeam.pokemon!.length
    ) {
      this.winner = 'Draw';
      this.phase = 'Result';
      this.checkResult();
    }
    if (
      this.firstPlayer === this.firstTeam.pokemon!.length &&
      this.secondPlayer < this.secondTeam.pokemon!.length
    ) {
      this.winner = 'Team2';
      this.phase = 'Result';
      this.checkResult();
    }
    if (
      this.firstPlayer < this.firstTeam.pokemon!.length &&
      this.secondPlayer === this.secondTeam.pokemon!.length
    ) {
      this.winner = 'Team1';
      this.phase = 'Result';
      this.checkResult();
    }
  }
}
