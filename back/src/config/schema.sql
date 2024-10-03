-- CREATE DATABASE pokemon;
CREATE TABLE
    IF NOT EXISTS pokemon_types (id SERIAL PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE
    IF NOT EXISTS pokemon (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        image TEXT NOT NULL,
        type INTEGER NOT NULL,
        power INTEGER NOT NULL,
        life INTEGER NOT NULL,
        CONSTRAINT fk_pokemon_type FOREIGN KEY (type) REFERENCES pokemon_types (id) ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS weaknesses (
        id SERIAL PRIMARY KEY,
        type1 INTEGER NOT NULL,
        type2 INTEGER NOT NULL,
        factor FLOAT NOT NULL,
        CONSTRAINT fk_weakness_type1 FOREIGN KEY (type1) REFERENCES pokemon_types (id) ON DELETE CASCADE,
        CONSTRAINT fk_weakness_type2 FOREIGN KEY (type2) REFERENCES pokemon_types (id) ON DELETE CASCADE
    );

CREATE TABLE
    IF NOT EXISTS teams (id SERIAL PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE
    IF NOT EXISTS pokemon_teams (
        id SERIAL PRIMARY KEY,
        team INTEGER NOT NULL,
        pokemon INTEGER NOT NULL,
        CONSTRAINT fk_pokemon_teams_team FOREIGN KEY (team) REFERENCES teams (id) ON DELETE CASCADE,
        CONSTRAINT fk_pokemon_teams_pokemon FOREIGN KEY (pokemon) REFERENCES pokemon (id) ON DELETE CASCADE
    );