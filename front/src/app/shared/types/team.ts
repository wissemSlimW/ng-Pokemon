import { Model } from './model';
import { Pokemon } from './pokemon';

export interface Team extends Model {
  name: string;
  pokemonIds?: number[];
  pokemon?: Pokemon[];
}
