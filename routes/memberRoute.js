import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createMemberController, deleteMemberController, memberController, singleMemberController, updateMemberController } from '../controllers/memberController.js';

const router = express.Router()


//routes

//create member
router.post(
    "/create-member",
    requireSignIn,
    isAdmin,
    createMemberController
);

//update member
router.put(
    "/update-member/:id",
    requireSignIn,
    isAdmin,
    updateMemberController
);

//getAll member
router.get('/get-member', memberController)

//single member
router.get("/single-member/:slug", singleMemberController);

//delete member
router.delete(
    "/delete-member/:id",
    requireSignIn,
    isAdmin,
    deleteMemberController
);


export default router