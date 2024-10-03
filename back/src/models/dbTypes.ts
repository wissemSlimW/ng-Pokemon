import { Pokemon } from "./pokemon";
import { PokemonTeam } from "./pokemonTeam";
import { PokemonType } from "./pokemonType";
import { Team } from "./team";
import { Weakness } from "./weakness";

export type Db = {
  pokemon: Pokemon;
  teams: Team;
  pokemon_types: PokemonType;
  weaknesses: Weakness;
  pokemon_teams: PokemonTeam;
};
