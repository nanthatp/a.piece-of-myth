import express from "express";
import { getOrdersController, registerController, testController, updateProfileController } from '../controllers/authController.js'
import { loginController } from "../controllers/authController.js";
import { forgotPasswordController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
} from "../controllers/authController.js";
//route object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || POST
router.post("/login", loginController);

//forgotPassword || Post
router.post("/forgot-password", forgotPasswordController)

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
