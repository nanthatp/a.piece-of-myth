import sizepostcardModel from "../models/sizepostcardModel.js";
import slugify from "slugify";

export  const createSizepostcardController = async(req, res) => {
    try {
        const {name} = req.body
        if(!name) {
            return res.status(401).send({message:'Name is required'});
        }
        const existingSizepostcard = await sizepostcardModel.findOne({name})
        if(existingSizepostcard) {
            return res.status(200).send({
                success:true,
                message:'Size of postcard Already Exists'});
        }
        const sizepostcard = await new sizepostcardModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'New Sizepostcard Created',
            sizepostcard,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Sizepostcard'
        });
    }
};

//update sizepostcard
export const updateSizepostcardController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const sizepostcard = await sizepostcardModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Size of postcard Updated Successfully",
            sizepostcard,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating sizepostcard",
        });
    }
};

//get all sizepostcards
export  const sizepostcardController = async(req,res) => {
    try {
        const sizepostcard = await sizepostcardModel.find({})
        res.status(200).send({
            success:true,
            message:'All Size of postcards List',
            sizepostcard,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting all Size of Postcard'
        })
    }
};

//single sizepostcard
export const singleSizepostcardController = async (req, res) => {
    try {
        const sizepostcard = await sizepostcardModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get SIngle Size of postcard SUccessfully",
            sizepostcard,
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single Size of postcard",
        });
    }
};

//delete sizepostcard
export const deletesizepostcardController = async (req, res) => {
    try {
        const { id } = req.params;
        await sizepostcardModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Size of postcard Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting Size of postcard",
            error,
        });
    }
};