import { poolQuery } from "../config/db";
import { PokemonTeam } from "../models/pokemonTeam";
import { Team } from "../models/team";
import {
    createInsertManyQuery,
    deleteManyQuery,
} from "../utils/createInsertManyquery";
import { BaseService } from "./base.service";

export class TeamService extends BaseService<Team> {
  async create(data: Team) {
    const { pokemonIds, ..._data } = data;
    const team: Team = await super.create(_data);
    await poolQuery(
      createInsertManyQuery<PokemonTeam>(
        "pokemon_teams",
        ["team", "pokemon"],
        pokemonIds!.map((p) => ({
          team: team.id,
          pokemon: p,
        }))
      )
    );
    return { ...team, pokemonIds };
  }

  async update(id: number, data: Team) {
    const { pokemonIds, ..._data } = data;
    const newTeam = await super.update(id, _data);
    await poolQuery(
      deleteManyQuery<PokemonTeam>("pokemon_teams", "team", [id]),
      [id]
    );
    await poolQuery(
      createInsertManyQuery<PokemonTeam>(
        "pokemon_teams",
        ["team", "pokemon"],
        pokemonIds!.map((p) => ({ team: id, pokemon: p }))
      )
    );
    return { ...newTeam, pokemonIds };
  }
}
