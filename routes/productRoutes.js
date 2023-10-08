import express from "express";
import {
    brainTreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCollectionController,
    productArtistController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    realtedProductController,
    searchProductController,
    updateProductController,
    productBystatusController,
    productFilterStatusController,
    getProductInvisibleController,
    getProductVisibleController,
    deleteInvisibleProductController
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//-------create-product-------//
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);
//-------update-product-------//
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

//get products-------//
router.get("/get-product", getProductController);

//get product by visible status
router.get("/get-visible-product", getProductVisibleController);

//get product by invisible status
router.get("/get-invisible-product", getProductInvisibleController);

//single product-------//
router.get("/get-product/:slug", getSingleProductController);

//get photo-------//
router.get("/product-photo/:pid", productPhotoController);

//------delete product-------//
router.delete("/delete-product/:pid", deleteProductController);

//------delete all Invisible product-------//
router.delete("/delete-all-invisible-product", deleteInvisibleProductController);

//-------filter product-------//
router.post("/product-filters", productFiltersController);

//-------filter product-------//
router.post("/product-filter-status", productFilterStatusController);

//-------product count-------//
router.get("/product-count", productCountController);

//-------product per page-------//
router.get("/product-list/:page", productListController);

//-------search product-------//
router.get("/search/:keyword", searchProductController);

//-------similar product-------//
router.get("/related-product/:pid/:cid", realtedProductController);

//-------category wise product-------//
router.get("/product-category/:slug", productCategoryController);

//-------collection wise product-------//
router.get("/product-collection/:slug", productCollectionController);

//-------artist wise product-------//
router.get("/product-artist/:slug", productArtistController);

//--------get Pre-order product by status-------------//
router.get("/get-preorder-by-status/:status", requireSignIn,isAdmin,productBystatusController)

// payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;