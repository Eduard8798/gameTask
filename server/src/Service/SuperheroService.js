import SuperheroModel from "../models/SuperheroModel.js";
import cloudinary from "./cloudinary.js";

class SuperheroService {
    async createHero(req, res) {
        try {

            console.log('body', req.body);
            console.log('files', req.files);
            const {nickname, real_name, origin_description, superpowers, catch_phrase} = req.body;

            const uploadedImages = [];


            for (let file of req.files) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "superhero_app",
                });

                uploadedImages.push(
                    result.secure_url
                );
            }

            const superhero = await SuperheroModel.create({
                nickname,
                real_name,
                origin_description,
                superpowers,
                catch_phrase,
                images: uploadedImages,
            });

            res.status(201).json(superhero);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
    async updateHero(req, res) {
        try {
            const { _id, nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;

            if (!_id) {
                return res.status(400).json({ message: "id not specified" });
            }


            const hero = await SuperheroModel.findById(_id);
            if (!hero) {
                return res.status(404).json({ message: "Hero not found" });
            }


            hero.nickname = nickname;
            hero.real_name = real_name;
            hero.origin_description = origin_description;
            hero.superpowers = superpowers;
            hero.catch_phrase = catch_phrase;


            if (req.files && req.files.length > 0) {
                const uploadedImages = [];
                for (let file of req.files) {
                    const result = await cloudinary.uploader.upload(file.path, {
                        folder: "superhero_app",
                    });
                    uploadedImages.push(result.secure_url);
                }
                hero.images = uploadedImages;
            }

            const updatedHero = await hero.save();
            return res.json(updatedHero);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

}

export default new SuperheroService();
