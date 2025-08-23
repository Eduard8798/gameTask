import SuperheroModel from "../models/SuperheroModel.js";
import SuperheroService from "../Service/SuperheroService.js"

class SuperheroController {
    async create(req, res) {
        try {
           const superhero = await SuperheroService.createHero(req,res)
            return res.json(superhero)
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }

    async getAll(req, res) {
        try {
            let { page , limit  } = req.query;

            page = Number(page);
            limit = Number(limit);

            if (isNaN(page) || page < 1) page = 1;
            if (isNaN(limit) || limit < 1) limit = 5;

            const heroes = await SuperheroModel.find()
                .skip((page - 1) * limit)
                .limit(limit);

            return res.json(heroes);
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    }




    async getOne(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                return res.status(400).json({message: 'id not specified '})
            }
            const superhero = await SuperheroModel.findById(id)
            return res.json(superhero)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async update(req, res) {
        try {
            const superhero = await SuperheroService.updateHero(req,res)
            return res.json(superhero)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                return res.status(400).json({message: 'id not specified '})
            }
            const superhero = await SuperheroModel.findOneAndDelete(id)
            return res.json(superhero)
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

export default new SuperheroController();
