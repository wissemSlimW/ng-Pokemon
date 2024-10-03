import express from "express";
import { createDatabase } from "./config/db";
import { pokemonRoutes } from "./routes/pokemon.route";
import { pokemonTypeRoutes } from "./routes/pokemonType.route";
import { teamRoutes } from "./routes/teams.route";
import { weaknessRoutes } from "./routes/weakness.route";

const app = express();
app.use(express.json());

app.use("/pokemonTypes", pokemonTypeRoutes);
app.use("/pokemon", pokemonRoutes);
app.use("/teams", teamRoutes);
app.use("/weaknesses", weaknessRoutes);
app.listen(3000, async () => {
  await createDatabase();
  console.log("Server is running on port 3000");
});
