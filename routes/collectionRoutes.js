import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {  updateCollectionController, singleCollectionController, deleteCollectionController, collectionController, createCollectionController } from '../controllers/collectionController.js';

const router = express.Router()


//routes

//create collection
router.post(
    "/create-collection",
    requireSignIn,
    isAdmin,
    createCollectionController
);

//update collection 
router.put(
    "/update-collection/:id",
    requireSignIn,
    isAdmin,
    updateCollectionController
);

//getAll collection
router.get('/get-collection', collectionController)

//single collection
router.get("/single-collection/:slug", singleCollectionController);

//delete collection
router.delete(
    "/delete-collection/:id",
    requireSignIn,
    isAdmin,
    deleteCollectionController
);


export default router