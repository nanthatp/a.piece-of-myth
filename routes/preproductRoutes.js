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
        preproductBystatusController,
        preproductCollectionBySlugController,
        getPreProductVisibleController,
        getPreProductInvisibleController,
        deleteInvisiblePreProductController,
        preorderNot_ProcessStatusExport,
        preorderProcessingStatusExport,
        preorderShippedStatusExport,
        preorderDeliverdStatusExport,
        preorderCancelStatusExport} from "../controllers/preproductController.js";
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

//get Visible Pre-order products-------//
router.get("/get-visible-preproduct", getPreProductVisibleController);

//get Invisible Pre-order products-------//
router.get("/get-invisible-preproduct", getPreProductInvisibleController);

//single product-------//
router.get("/get-preproduct/:slug", getSinglePreProductController);

//get photo-------//
router.get("/preproduct-photo/:pid", PreproductPhotoController);

//------delete Pre-Order product-------//
router.delete("/delete-preproduct/:pid", deletePreProductController);

//------delete all Invisible product-------//
router.delete("/delete-all-invisible-preproduct", deleteInvisiblePreProductController);

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

router.get("/preproduct-collection-by-slug/:slug", preproductCollectionBySlugController);

//-------export Pre-order product-------//
router.get("/preorder-export/:preproduct", preorderExport)

//-------export Pre-order product-------//
router.get("/preorder-export-not-process/:preproduct", preorderNot_ProcessStatusExport)

//-------export Pre-order product-------//
router.get("/preorder-export-processing/:preproduct", preorderProcessingStatusExport)

//-------export Pre-order product-------//
router.get("/preorder-export-shipped/:preproduct", preorderShippedStatusExport)

//-------export Pre-order product-------//
router.get("/preorder-export-deliverd/:preproduct", preorderDeliverdStatusExport)

//-------export Pre-order product-------//
router.get("/preorder-export-cancel/:preproduct", preorderCancelStatusExport)

//--------get Pre-order product by status-------------//
router.get("/get-preorder-by-status/:status", requireSignIn,isAdmin,preproductBystatusController)

// payments routes
//token
router.get("/braintreepreorder/token", braintreeTokenForPreOrederController);

//payments
router.post("/braintreepreoder/payment", requireSignIn, brainTreePaymentForPreOrederController);

export default router;