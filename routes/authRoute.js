import  express  from "express";
import {registerController,loginController,testController, forgotPasswordController, updateProfileController, getAllOrdersController, orderStatusController, getOrdersController} from "../controllers/authController.js";
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";

//router object
const router=express.Router();
// The Router() function in Express is used to create a new router object. This object can be used to handle requests and send responses. Routers are a way to organize your Express application such that your primary app.js file is not cluttered with all of your routes.

//routing
//register method post
router.post('/register',registerController);

//login postttt
router.post('/login',loginController);

//forgot password //post
router.post('/forgot-password',forgotPasswordController)

//test route
router.get('/test',requireSignIN,isAdmin,testController);//any no of middleware function can be passed
//when n postman we have provided the jwt token as authorization in header section only then this route will be executed


//protected route auth if this send ok then only show dashboard otherwise not
router.get('/user-auth',requireSignIN,(req,res)=>{
    res.status(200).send({ok:true})
})

//for add delete category or product
router.get('/admin-auth',requireSignIN,isAdmin,(req,res) =>{
    res.status(200).send({ok:true});
})

//update profile
router.put("/profile", requireSignIN, updateProfileController);

//orders
router.get("/orders", requireSignIN, getOrdersController);

//all orders
router.get("/all-orders", requireSignIN, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIN,
  isAdmin,
  orderStatusController
);

export default router;