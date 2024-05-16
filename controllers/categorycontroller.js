import slugify from "slugify";
import categorymodel from "../models/categorymodel.js";

export const createCategoryController=async(req,res) =>{
try {
    const {name}=req.body
    if(!name){
        return res.status(401).send({message:"name is required"})
    }

    const existingCategory=await categorymodel.findOne({name});
    if(existingCategory){
        return res.status(200).send({
            success:true,
            message:"category already exist"
        })
    }

    const category=await new categorymodel({name,slug:slugify(name)}).save();
    return res.status(201).send({
        success:true,
        message:'Category created success',
        category
    })

} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"error in category"
    })
}



}


export const updateCategoryController=async(req,res) =>{
    try{
        const {name}=req.body;
        const {id}=req.params;
        // The line const { id } = req.params; is extracting the id parameter from the request parameters.

        const category=await categorymodel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});//ye new true kyu karte h
        return res.status(201).send({
            success:true,
            message:'Category updated success',
            category
        })
    }catch(error){
        console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:"error in update-category"
    })
    }

}


export const categoryController=async(req,res) =>{
    try {
        const category=await categorymodel.find({});
        return res.status(201).send({
            success:true,
            message:'all categories list',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error in get-category"
        })
    }
}

export const singleCategoryController=async(req,res) =>{
try {
    
    const category=await categorymodel.findOne({slug:req.params.slug});
    // Define a route with a parameter 'slug'
// app.get('/category/:slug', getCategoryController);
// In this example, the route /category/:slug expects a parameter slug in the URL. When a request is made to this route, Express will parse the URL and make the value of slug available in req.params.
    return res.status(201).send({
        success:true,
        message:'get single category',
        category
    })
    
} catch (error) {
    console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error in single-category"
        })
}
}

export const deleteCategoryController=async(req,res) =>{
    try {
        const {id}=req.params;
        await categorymodel.findByIdAndDelete(id);
        return res.status(201).send({
            success:true,
            message:'delete single category',
           
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"error in delete single-category"
        })
        
    }
}