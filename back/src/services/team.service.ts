import { poolQuery } from "../config/db";
import { PokemonTeam } from "../models/pokemonTeam";
import { Team } from "../models/team";
import {
  createInsertManyQuery,
  deleteManyQuery,
} from "../utils/createInsertManyquery";
import { BaseService } from "./base.service";

export class TeamService extends BaseService<Team> {
  async findAll(): Promise<Team[]> {
    const result = await poolQuery(
      "SELECT t.id AS id, t.name AS name,json_agg( json_build_object( 'id', p.id,'name', p.name,'image', p.image,'type', p.type,'power', p.power,'life', p.life)) AS pokemon FROM teams t LEFT JOIN pokemon_teams pt ON t.id = pt.team LEFT JOIN pokemon p ON pt.pokemon = p.id GROUP BY t.id, t.name;"
    );
    return result.rows;
  }
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
