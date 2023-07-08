import sizeModel from "../models/sizeModel.js";
import slugify from "slugify";

export  const createSizeController = async(req, res) => {
    try {
        const {name} = req.body
        if(!name) {
            return res.status(401).send({message:'Name is required'});
        }
        const existingSize = await sizeModel.findOne({name})
        if(existingSize) {
            return res.status(200).send({
                success:true,
                message:'Size Already Exists'});
        }
        const size = await new sizeModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'New Size Created',
            size,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Size'
        });
    }
};

//update size
export const updateSizeController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const size = await sizeModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Size Updated Successfully",
            size,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating size",
        });
    }
};

//get all sizes
export  const sizeController = async(req,res) => {
    try {
        const size = await sizeModel.find({})
        res.status(200).send({
            success:true,
            message:'All Sizes List',
            size,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting all sizes'
        })
    }
};

//single size
export const singleSizeController = async (req, res) => {
    try {
        const size = await sizeModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get SIngle Size SUccessfully",
            size,
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single size",
        });
    }
};

//delete size
export const deleteSizeController = async (req, res) => {
    try {
        const { id } = req.params;
        await sizeModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Size Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting Size",
            error,
        });
    }
};