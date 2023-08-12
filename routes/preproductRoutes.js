import express from "express";
import { createPreProductController, 
        updatePreProductController,
        getPreProductController } from "../controllers/preproductController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//-------create-preproduct-------//
router.post(
    "/create-preproduct",
    requireSignIn,
    isAdmin,
    formidable(),
    createPreProductController
);

//-------update-Preproduct-------//
router.put(
    "/update-preproduct/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updatePreProductController
);

//get Pre-order products-------//
router.get("/get-preproduct", getPreProductController);
//เดี๋ยวมาใส่ต่อ
export default router;