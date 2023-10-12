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
    getAllPreOrdersByPreProductIdController,
    preorderStatusController,
    getAllPreOrdersController,
    getAllOrdersConByNot_ProccessStatustroller,
    getAllOrdersConByProccessingStatustroller,
    getAllOrdersConByShippedStatustroller,
    getAllOrdersConByDeliverdStatustroller,
    getAllOrdersConByCancelStatustroller,
    getAllPreOrdersByPreProductIdNot_ProcessController,
    getAllPreOrdersByPreProductIdProcessingController,
    getAllPreOrdersByPreProductIdShippedController,
    getAllPreOrdersByPreProductIdDeliverdController,
    getAllPreOrdersByPreProductIdCancelController} from '../controllers/authController.js'
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

//all orders By "Not_Process"
router.get("/all-not_process-orders", requireSignIn, isAdmin, getAllOrdersConByNot_ProccessStatustroller);

//all orders By "Processing"
router.get("/all-processing-orders", requireSignIn, isAdmin, getAllOrdersConByProccessingStatustroller);

//all orders By "shipped"
router.get("/all-shipped-orders", requireSignIn, isAdmin, getAllOrdersConByShippedStatustroller);

//all orders By "Deliverd"
router.get("/all-deliverd-orders", requireSignIn, isAdmin, getAllOrdersConByDeliverdStatustroller);

//all orders By "cancel"
router.get("/all-cancel-orders", requireSignIn, isAdmin, getAllOrdersConByCancelStatustroller);

// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
);

//get pre-order
router.get("/preorders", requireSignIn, getPreorderController)

//get all pre-order by Preproduct id
router.get("/preorder-preproduct/:preproduct", requireSignIn,isAdmin,getAllPreOrdersByPreProductIdController)

//get all pre-order by Preproduct id "Not_Process"
router.get("/preorder-preproduct-not_process/:preproduct", requireSignIn,isAdmin,getAllPreOrdersByPreProductIdNot_ProcessController)

//get all pre-order by Preproduct id "Processing"
router.get("/preorder-preproduct-processing/:preproduct", requireSignIn,isAdmin,getAllPreOrdersByPreProductIdProcessingController)

//get all pre-order by Preproduct id "Shipped"
router.get("/preorder-preproduct-shipped/:preproduct", requireSignIn,isAdmin,getAllPreOrdersByPreProductIdShippedController)

//get all pre-order by Preproduct id "deliverd"
router.get("/preorder-preproduct-deliverd/:preproduct", requireSignIn,isAdmin,getAllPreOrdersByPreProductIdDeliverdController)

//get all pre-order by Preproduct id "cancel"
router.get("/preorder-preproduct-cancel/:preproduct", requireSignIn,isAdmin,getAllPreOrdersByPreProductIdCancelController)


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
