import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Id } from '../../../../shared/types/model';
import { Pokemon } from '../../../../shared/types/pokemon';
import { PokemonType } from '../../../../shared/types/pokemonType';
@Component({
  selector: 'p-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  imports: [],
})
export class CardComponent {
  @Input() pokemon: Pokemon = null! as Pokemon;
  @Input() type: PokemonType['name'] = '';
  @Output() deleteEmitter = new EventEmitter<Pokemon>();
  @Output() updateEmitter = new EventEmitter<Pokemon>();
  handleUpdate() {
    this.updateEmitter.emit(this.pokemon);
  }
  handleDelete() {
    this.deleteEmitter.emit(this.pokemon);
  }
}
