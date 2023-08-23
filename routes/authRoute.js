import express from "express";
import {registerController, 
    testController, 
    updateProfileController,
    forgetPassword, 
    resetPassword,
    loginController, 
    getAllOrdersController, 
    getOrdersController, 
    orderStatusController, 
    getPreorderController,
    getAllPreOrdersByIdController,
    preorderStatusController,
    getAllPreOrdersController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//route object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);
export default router;

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
);

//get pre-order
router.get("/preorders", requireSignIn, getPreorderController)

//get all pre-order by id
router.get("/preorder-preproduct/:slug",isAdmin,getAllPreOrdersByIdController)

//all Pre-orders
router.get("/all-preorders", requireSignIn, isAdmin, getAllPreOrdersController);

// Pre-order status update
router.put(
    "/preorder-status/:preorderId",
    requireSignIn,
    isAdmin,
    preorderStatusController
);


// Forget Password

router.post("/forget-password", forgetPassword);
router.post("/forget-password/:id/:token", resetPassword);
