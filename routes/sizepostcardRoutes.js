import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createSizepostcardController, deletesizepostcardController, singleSizepostcardController, sizepostcardController, updateSizepostcardController } from '../controllers/sizepostcardController.js';

const router = express.Router()


//routes

//create sizepostcard
router.post(
    "/create-sizepostcard",
    requireSignIn,
    isAdmin,
    createSizepostcardController
);

//update sizepostcard
router.put(
    "/update-sizepostcard/:id",
    requireSignIn,
    isAdmin,
    updateSizepostcardController
);

//getAll sizepostcard
router.get('/get-sizepostcard', sizepostcardController)

//single sizepostcard
router.get("/single-sizepostcard/:slug", singleSizepostcardController);

//delete sizepostcard
router.delete(
    "/delete-sizepostcard/:id",
    requireSignIn,
    isAdmin,
    deletesizepostcardController
);


export default router