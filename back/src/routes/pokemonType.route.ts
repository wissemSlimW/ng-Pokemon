import { Request, Response, Router } from "express";
import { PokemonTypeController } from "../controllers/pokemonType.controller";
import { PokemonTypeService } from "../services/pokemonType.service";

export const pokemonTypeRoutes = Router();
const service = new PokemonTypeService("pokemon_types");
const controller = new PokemonTypeController(service);
pokemonTypeRoutes.get("/:id", (req: Request, res: Response) => {
  controller.findOne(req, res);
});
pokemonTypeRoutes.get("/", (req: Request, res: Response) => {
  controller.findAll(req, res);
});
pokemonTypeRoutes.post("/", (req: Request, res: Response) => {
  controller.create(req, res);
});
pokemonTypeRoutes.put("/:id", (req: Request, res: Response) => {
  controller.update(req, res);
});
pokemonTypeRoutes.delete("/:id", (req: Request, res: Response) => {
  controller.delete(req, res);
});
