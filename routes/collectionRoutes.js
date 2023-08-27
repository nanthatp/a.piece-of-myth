import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {  updateCollectiongroupController, singleCollectiongroupController, deleteCollectiongroupController, collectiongroupController, createCollectiongroupController } from '../controllers/collectionController.js';

const router = express.Router()


//routes

//create collection group
router.post(
    "/create-collectiongroup",
    requireSignIn,
    isAdmin,
    createCollectiongroupController
);

//update collection group
router.put(
    "/update-collectiongroup/:id",
    requireSignIn,
    isAdmin,
    updateCollectiongroupController
);

//getAll collection group
router.get('/get-collectiongroup', collectiongroupController)

//single collection group
router.get("/single-collectiongroup/:slug", singleCollectiongroupController);

//delete collection group
router.delete(
    "/delete-collectiongroup/:id",
    requireSignIn,
    isAdmin,
    deleteCollectiongroupController
);


export default router