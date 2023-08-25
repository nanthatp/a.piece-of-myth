import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createArtistController, getArtistController, getSingleArtistController, artistPhotoController, deleteArtistController, updateArtistController} from '../controllers/artistController.js';
import formidable from "express-formidable";

const router = express.Router()


//routes

//create artist
router.post(
    "/create-artist",
    requireSignIn,
    isAdmin,
    formidable(),
    createArtistController
);

//update artist 
router.put(
    "/update-artist/:id",
    requireSignIn,
    isAdmin,
    formidable(),
    updateArtistController
);

//getAll artist
router.get('/get-artist', getArtistController)

//single artist
router.get("/get-artist/:slug", getSingleArtistController);

//delete artist
router.delete(
    "/delete-artist/:id",
    requireSignIn,
    isAdmin,
    deleteArtistController
);

//get photo-------//
router.get("/artist-photo/:pid", artistPhotoController);


export default router