import { Pokemon } from "./pokemon";

export interface Team {
  id: number;
  name: string;
  pokemonIds?: number[];
  pokemon?: Pokemon[];
}
