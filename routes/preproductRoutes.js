import express from "express";
import { createPreProductController, 
        updatePreProductController,
        getPreProductController,
        getSinglePreProductController,
        PreproductPhotoController,
        deletePreProductController,
        PreproductFiltersController,
        PreproductCountController,
        PreproductListController,
        braintreeTokenForPreOrederController,
        brainTreePaymentForPreOrederController,
        searchPreProductController,
        realtedPreProductController,
        preproductCategoryController,
        preproductArtistController,
        preProductCollectionController,
        preorderExport,
        preproductBystatusController} from "../controllers/preproductController.js";
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

//single product-------//
router.get("/get-preproduct/:slug", getSinglePreProductController);

//get photo-------//
router.get("/preproduct-photo/:pid", PreproductPhotoController);

//------delete product-------//
router.delete("/delete-preproduct/:pid", deletePreProductController);

//-------filter product-------//
router.post("/preproduct-filters", PreproductFiltersController);

//-------product count-------//
router.get("/preproduct-count", PreproductCountController);

//-------product per page-------//
router.get("/preproduct-list/:page", PreproductListController);

//-------search product-------//
router.get("/search/:keyword", searchPreProductController);

//-------similar product-------//
router.get("/related-preproduct/:pid/:cid", realtedPreProductController);

//-------category wise product-------//
router.get("/preproduct-category/:slug", preproductCategoryController);

//-------artist wise product-------//
router.get("/preproduct-artist/:slug", preproductArtistController);

//-------collection wise product-------//
router.get("/preproduct-collection/:collectiongroup", preProductCollectionController);

//-------export Pre-order product-------//
router.get("/preorder-export/:preproduct", preorderExport)

//--------get Pre-order product by status-------------//
router.get("/get-preorder-by-status/:status", requireSignIn,isAdmin,preproductBystatusController)

// payments routes
//token
router.get("/braintreepreorder/token", braintreeTokenForPreOrederController);

//payments
router.post("/braintreepreoder/payment", requireSignIn, brainTreePaymentForPreOrederController);

export default router;