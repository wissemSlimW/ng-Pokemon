import { Request, Response, Router } from "express";
import { PokemonController } from "../controllers/pokemon.controller";
import { PokemonService } from "../services/pokemon.service";

export const pokemonRoutes = Router();
const service = new PokemonService("pokemon");
const controller = new PokemonController(service);
pokemonRoutes.get("/:id", (req: Request, res: Response) => {
  controller.findOne(req, res);
});
pokemonRoutes.get("/", (req: Request, res: Response) => {
  controller.findAll(req, res);
});
pokemonRoutes.post("/", (req: Request, res: Response) => {
  controller.create(req, res);
});
pokemonRoutes.put("/:id", (req: Request, res: Response) => {
  controller.update(req, res);
});
pokemonRoutes.delete("/:id", (req: Request, res: Response) => {
  controller.delete(req, res);
});
