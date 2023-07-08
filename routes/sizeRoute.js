import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createSizeController, deleteSizeController, singleSizeController, sizeController, updateSizeController } from './../controllers/sizeController.js';

const router = express.Router()


//routes

//create size
router.post(
    "/create-size",
    requireSignIn,
    isAdmin,
    createSizeController
);

//update size
router.put(
    "/update-size/:id",
    requireSignIn,
    isAdmin,
    updateSizeController
);

//getAll siz
router.get('/get-size', sizeController)

//single size
router.get("/single-size/:slug", singleSizeController);

//delete size
router.delete(
    "/delete-size/:id",
    requireSignIn,
    isAdmin,
    deleteSizeController
);


export default router