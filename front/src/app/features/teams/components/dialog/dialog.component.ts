import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../shared/services/api.service';
import { Pokemon } from '../../../../shared/types/pokemon';
import { Team } from '../../../../shared/types/team';
import { getItem } from '../../../../shared/utils/getItem';
import { Id } from '../../../../shared/types/model';

@Component({
  selector: 'p-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  imports: [FormsModule],
})
export class DialogComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService
      .getAll<Pokemon>('pokemon')
      .subscribe((res) => (this.pokemon = res));
  }

  @Input() team: Team | undefined;
  @Input() pokemon: Pokemon[] = [];

  @Output() confirmAddEmitter = new EventEmitter<Team>();
  @Output() closeEmitter = new EventEmitter();
  handleSubmit() {
    this.confirmAddEmitter.emit(this.team);
  }
  handleClose() {
    this.closeEmitter.emit();
  }
  getImage(index: number) {
    const id = this.team?.pokemonIds![index];
    return getItem({ list: this.pokemon, field: 'id', value: id })?.image;
  }
  checkSelected(id: Id) {
    return !!this.team?.pokemonIds?.find((p) => p === id);
  }
  addPokemon(data: Pokemon) {
    if (this.team?.pokemonIds?.length! < 6) {
      this.team?.pokemonIds?.push(data.id!);
      this.team?.pokemon?.push(data);
    }
  }
  removePokemon(index: number) {
    this.team?.pokemonIds?.splice(index, 1);
    this.team?.pokemon?.splice(index, 1);
  }
}
