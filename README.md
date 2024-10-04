Project Setup

This guide will walk you through setting up and running the project locally.

**Prerequisites

-Docker installed and running

-Node.js installed

-Angular CLI installed


**Database Setup


The project uses PostgreSQL for the database. You can launch a PostgreSQL instance using Docker:

-Pull and run the Docker image.

-After the instance is running, configure the database connection string in the backend by editing back/config/db.ts.

**Backend Setup


To install and start the backend server:

-Navigate to the back folder: 

  cd back
  
-Install the dependencies:

  npm install
  
-Start the backend server:

  npm start
  
===>The server will run on http://localhost:3000.



**Frontend Setup


To install and start the frontend application:

-Navigate to the frontend folder:

  cd frontend
  
-Install the dependencies:

  npm install
  
-Start the frontend server:

ng serve -o

===>The application will open in your browser at http://localhost:4200.


**Requirement 4 


database schema basicly exsit inside the file "back/config/schema.sql.
here is the setup

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


** requirement 5


PostgreSQL function that gets a list of all teams odered by team power (team power equal to the sum of all team members powers)

===>
CREATE OR REPLACE FUNCTION get_teams_ordered_by_power()
RETURNS TABLE (
    id INTEGER,
    name TEXT,
    total_power INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id AS id,
        t.name AS name,
        SUM(p.power) AS total_power
    FROM 
        teams t
    JOIN 
        pokemon_teams pt ON t.id = pt.team
    JOIN 
        pokemon p ON pt.pokemon = p.id
    GROUP BY 
        t.id
    ORDER BY 
        total_power DESC;
END;
$$ LANGUAGE plpgsql; 

