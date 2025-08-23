import Router from 'express'
import SuperheroController from "../Controllers/SuperheroController.js";
import multer from "multer";
const router = new Router();

const upload = multer({ dest: "uploads/" });

router.post('/heroes',upload.any(),SuperheroController.create)
router.get('/heroes',SuperheroController.getAll)
router.get('/heroes/:id',SuperheroController.getOne)
router.put('/heroes',upload.any(),SuperheroController.update)
router.delete('/heroes/:id',SuperheroController.delete)

export default router;
