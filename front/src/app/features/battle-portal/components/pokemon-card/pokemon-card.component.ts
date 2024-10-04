import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../shared/types/pokemon';

@Component({
  selector: 'p-pokemon-card',
  standalone: true,
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon = null! as Pokemon;
  @Input() playerHealth: Pokemon['life'] = null! as Pokemon['life'];
}
