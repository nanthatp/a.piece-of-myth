import express from "express";
import { bannerFileController, createBannerController, deleteBannerController, getBannerController, getSingleBannerController, updateBannerController } from "../controllers/bannerController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//-------create-banner-------//
router.post(
    "/create-banner",
    requireSignIn,
    isAdmin,
    formidable(),
    createBannerController
);
//-------update-banner-------//
router.put(
    "/update-banner/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateBannerController
);

//get banners-------//
router.get("/get-banner", getBannerController);

//single banner-------//
router.get("/get-banner/:slug", getSingleBannerController);

//get file-------//
router.get("/banner-photo/:pid",bannerFileController);

//------delete banner-------//
router.delete("/delete-banner/:pid", deleteBannerController);


export default router;