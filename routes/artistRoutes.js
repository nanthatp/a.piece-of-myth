import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { artistController, createArtistController, deleteArtistController, singleArtistController, updateArtistController } from '../controllers/artistController.js';


const router = express.Router()


//routes

//create artist
router.post(
    "/create-artist",
    requireSignIn,
    isAdmin,
    createArtistController
);

//update artist 
router.put(
    "/update-artist/:id",
    requireSignIn,
    isAdmin,
    updateArtistController
);

//getAll artist
router.get('/get-artist', artistController)

//single artist
router.get("/single-artist/:slug", singleArtistController);

//delete artist
router.delete(
    "/delete-artist/:id",
    requireSignIn,
    isAdmin,
    deleteArtistController
);


export default router