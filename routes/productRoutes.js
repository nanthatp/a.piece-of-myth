import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, getProductController, getSingleProductController } from "../controllers/productController.js";
import  formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);
//routes
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", );

//delete rproduct
router.delete("/delete-product/:pid", );

//filter product
router.post("/product-filters", );

//product count
router.get("/product-count", );

//product per page
router.get("/product-list/:page", );

//search product
router.get("/search/:keyword", );

//similar product
router.get("/related-product/:pid/:cid", );

//category wise product
router.get("/product-category/:slug",);

//payments routes
//token
router.get("/braintree/token", );

//payments
router.post("/braintree/payment",  );

export default router;