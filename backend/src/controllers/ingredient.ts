import { Request, Response } from "express";
import Ingredient from "../model/ingredient";

export default class IngredientController {

    public async getAll(req: Request, res: Response) {
        const ingredient = await Ingredient.find({ archive: { $ne: true } });
        res.json(ingredient)
    }    

    public async get(req: Request, res: Response) {
        const ingredient = await Ingredient.findOne({
        _id: req.params.ingredientId
        });
        res.json(ingredient)
    }
    
    public async create(req: Request, res: Response) {
		const body = req.body;
		const newIngredientRequest = new Ingredient({
			name: body.name,
			description: body.description
		} as any);
		newIngredientRequest.save();
        res.json(newIngredientRequest);
    }


    public async update(req: Request, res: Response) {
        const id = req.params.IngredientId;
		const body = req.body;
        const response = await Ingredient.update({ _id: id }, body);
        res.json(response);
    }


    public async delete(req: Request, res: Response) {
        const id = req.params.ingredientId;
        const response = await Ingredient.update({ _id: id }, { archive: true });
        res.json(response);
    }
}    


