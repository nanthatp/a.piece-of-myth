import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req,res)  => {
    try {
        const {name, slug, description, price, category,  quantity, artist, member, size, sizepostcard, shipping} = req.fields;
        const {photo} = req.files;
        
        //alidation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})
            case !price:
                return res.status(500).send({error:'Price is required'})
            case !category:
                return res.status(500).send({error:'Category is required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is required'})
            case !artist:
                return res.status(500).send({error:'Artist is required'})
            case !member:
                return res.status(500).send({error:'Member is required'})
            // case !size:
            //     return res.status(500).send({error:'Size is required'})
            // case !sizepostcard:
            //     return res.status(500).send({error:'Size of postcard is required'})
            case photo && photo.size > 150000000000:
                return res.status(500).send({error:'Photo is requiredand less than 1.5mb'})
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success:true,
            message:'Product created successfully',
            products,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in  creating product'
        });
    }
};

//get all product
export const getProductController = async(req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            count_total : products.length,
            message:'AllProduct',
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting product',
            error: error.message
        });
    }
};

//get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
        });
    }
};

// get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);

        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Erorr while getting photo",
            error,
        });
    }
};

//delete productcontroller
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};

//upate producta
export const updateProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category,  quantity, artist, member, size, sizepostcard, shipping} = req.fields;
        const {photo} = req.files;
        
        //alidation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})
            case !price:
                return res.status(500).send({error:'Price is required'})
            case !category:
                return res.status(500).send({error:'Category is required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is required'})
            case !artist:
                return res.status(500).send({error:'Artist is required'})
            case !member:
                return res.status(500).send({error:'Member is required'})
            // case !size:
            //     return res.status(500).send({error:'Size is required'})
            // case !sizepostcard:
            //     return res.status(500).send({error:'Size of postcard is required'})
            case photo && photo.size > 150000000000:
                return res.status(500).send({error:'Photo is requiredand less than 1.5 mb'})
        }
        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:'Product Updated Successfully',
            products,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Update product'
        });
    }
};




