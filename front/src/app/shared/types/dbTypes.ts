import { Pokemon } from './pokemon';
import { PokemonType } from './pokemonType';
import { Team } from './team';
import { Weakness } from './weakness';

export type Db = {
  pokemon: Pokemon;
  teams: Team;
  pokemonTypes: PokemonType;
  weaknesses: Weakness;
};
