import express from "express";
// import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categorycontroller.js";
import { isAdmin, requireSignIN } from "../middlewares/authMiddleware.js";

const Router=express.Router();

Router.post('/create-category',requireSignIN,isAdmin,createCategoryController);

Router.put('/update-category/:id',requireSignIN,isAdmin,updateCategoryController);

Router.get('/get-category',categoryController);

Router.get('/single-category/:slug',singleCategoryController);

Router.delete('/delete-category/:id',requireSignIN,isAdmin,deleteCategoryController);



export default Router;