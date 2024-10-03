import { Pool } from "pg";
import fs from "fs";
import path from "path";
import { Db } from "../models/dbTypes";
import { PokemonType } from "../models/pokemonType";
import { POKEMON, POKEMON_TYPES, TEAMS, WEAKNESSES } from "./seed.data";
import { Pokemon } from "../models/pokemon";
import { Weakness } from "../models/weakness";
import { createInsertManyQuery } from "../utils/createInsertManyquery";
import { Team } from "../models/team";
import { PokemonTeam } from "../models/pokemonTeam";

const adminPool = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "postgres", // Connect to default 'postgres' database to create the new one
});

// Function to create the 'pokemon' database if it doesn't exist
export const createDatabase = async () => {
  try {
    const client = await adminPool.connect();
    console.log("Connected to 'postgres' database");
    const checkDbQuery = `
        SELECT 1 FROM pg_database WHERE datname = 'pokemon';
      `;
    const result = await client.query(checkDbQuery);
    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE pokemon;`);
      await db();
      await seedDb();
    } else {
      console.log("Database 'pokemon' already exists");
    }
    client.release();
  } catch (err) {
    console.error("Error creating the database", err);
  }
};
const pool = new Pool({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "pokemon",
});

const seedDb = async () => {
  pool
    .connect()
    .then(async (client) => {
      await client.query(
        createInsertManyQuery<Omit<PokemonType, "id">>(
          "pokemon_types",
          ["name"],
          POKEMON_TYPES
        )
      );
      await client.query(
        createInsertManyQuery<Omit<Pokemon, "id">>(
          "pokemon",
          ["name", "image", "life", "power", "type"],
          POKEMON
        )
      );
      await client.query(
        createInsertManyQuery<Omit<Weakness, "id">>(
          "weaknesses",
          ["factor", "type1", "type2"],
          WEAKNESSES
        )
      );
      const result = await client.query(
        createInsertManyQuery<Omit<Team, "id">>("teams", ["name"], TEAMS)
      );
      result.rows.forEach(async (team: Team, i: number) => {
        await client.query(
          createInsertManyQuery<Omit<PokemonTeam, "id">>(
            "pokemon_teams",
            ["team", "pokemon"],
            TEAMS[i]!.pokemonIds!.map((id) => ({
              team: team.id,
              pokemon: id,
            }))
          )
        );
      });
      console.log("database seeded");
      client.release();
    })
    .catch((err) => console.log(err));
};
// seeding tables
export const db = () =>
  pool
    .connect()
    .then((client) => {
      console.log("connected");
      const filePath = path.join(__dirname, "schema.sql");
      const sql = fs.readFileSync(filePath, "utf8");
      client
        .query(sql)
        .then((res) => {
          console.log("db initialized");
        })
        .catch((err) => console.log(err));
      client.release();
    })
    .catch((err) => console.log(err));

export const poolQuery = (text: string, params?: any) =>
  pool.query(text, params);
