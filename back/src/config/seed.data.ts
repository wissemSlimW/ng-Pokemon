import { Pokemon } from "../models/pokemon";
import { PokemonType } from "../models/pokemonType";
import { Team } from "../models/team";
import { Weakness } from "../models/weakness";
import { randomize } from "../utils/randomize";

export const POKEMON_TYPES: Omit<PokemonType, "id">[] = [
  { name: "fire" },
  { name: "water" },
  { name: "grass" },
];
export const POKEMON: Omit<Pokemon, "id">[] = [
  //fire
  {
    name: "Charizard",
    image: "https://img.pokemondb.net/artwork/large/charizard.jpg",
    life: 78,
    power: 84,
    type: 1,
  },
  {
    name: "	Vulpix",
    image: "https://img.pokemondb.net/artwork/large/vulpix.jpg",
    life: 38,
    power: 41,
    type: 1,
  },
  {
    name: "	Rapidash",
    image: "https://img.pokemondb.net/artwork/large/rapidash.jpg",
    life: 65,
    power: 100,
    type: 1,
  },
  {
    name: "Cyndaquil",
    image: "https://img.pokemondb.net/artwork/large/cyndaquil.jpg",
    life: 39,
    power: 52,
    type: 1,
  },
  {
    name: "Charmander",
    image: "https://img.pokemondb.net/artwork/large/charmander.jpg",
    life: 39,
    power: 52,
    type: 1,
  },
  //water
  {
    name: "Squirtle",
    image: "https://img.pokemondb.net/artwork/large/squirtle.jpg",
    life: 44,
    power: 48,
    type: 2,
  },
  {
    name: "	Blastoise",
    image: "https://img.pokemondb.net/artwork/large/blastoise.jpg",
    life: 79,
    power: 83,
    type: 2,
  },
  {
    name: "	Poliwrath",
    image: "https://img.pokemondb.net/artwork/large/poliwrath.jpg",
    life: 90,
    power: 95,
    type: 2,
  },
  {
    name: "Slowpoke",
    image: "https://img.pokemondb.net/artwork/large/slowpoke.jpg",
    life: 90,
    power: 65,
    type: 2,
  },
  {
    name: "Staryu",
    image: "https://img.pokemondb.net/artwork/large/staryu.jpg",
    life: 30,
    power: 45,
    type: 2,
  },
  //grass
  {
    name: "Bulbasaur",
    image: "https://img.pokemondb.net/artwork/large/bulbasaur.jpg",
    life: 45,
    power: 49,
    type: 3,
  },
  {
    name: "Ivysaur",
    image: "https://img.pokemondb.net/artwork/large/ivysaur.jpg",
    life: 60,
    power: 62,
    type: 3,
  },
  {
    name: "Mega Venusaur",
    image: "https://img.pokemondb.net/artwork/large/venusaur.jpg",
    life: 80,
    power: 100,
    type: 3,
  },
  {
    name: "Vileplume",
    image: "https://img.pokemondb.net/artwork/large/vileplume.jpg",
    life: 75,
    power: 80,
    type: 3,
  },
  {
    name: "Meganium",
    image: "https://img.pokemondb.net/artwork/large/meganium.jpg",
    life: 80,
    power: 82,
    type: 3,
  },
];
export const WEAKNESSES: Omit<Weakness, "id">[] = [
  { type1: 1, type2: 1, factor: 1 },
  { type1: 1, type2: 2, factor: 2 },
  { type1: 1, type2: 3, factor: 0.5 },
  { type1: 2, type2: 1, factor: 0.5 },
  { type1: 2, type2: 2, factor: 1 },
  { type1: 2, type2: 3, factor: 2 },
  { type1: 3, type2: 1, factor: 2 },
  { type1: 3, type2: 2, factor: 0.5 },
  { type1: 3, type2: 3, factor: 1 },
];

export const TEAMS: Omit<Team, "id">[] = [
  "Kings",
  "Slayers",
  "Distroyers",
  "Conquerors",
].map((name) => ({
  name,
  pokemonIds: Array(6)
    .fill("")
    .map(() => randomize(15) + 1),
}));
