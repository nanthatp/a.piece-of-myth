import collectiongroupModel from "../models/collectiongroupModel.js";
import slugify from "slugify";

export  const createCollectiongroupController = async(req, res) => {
    try {
        const {name} = req.body
        if(!name) {
            return res.status(401).send({message:'Name is required'});
        }
        const existingCollection = await collectiongroupModel.findOne({name})
        if(existingCollection) {
            return res.status(200).send({
                success:true,
                message:'Collection group Already Exists'});
        }
        const collectiongroup = await new collectiongroupModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'New Collection group Created',
            collectiongroup,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Collection group'
        });
    }
};

//update collection group
export const updateCollectiongroupController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const collectiongroup = await collectiongroupModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Collection group Updated Successfully",
            collectiongroup,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating collection group",
        });
    }
};

//get all categories
export const collectiongroupController = async (req, res) => {
    try {
        const collectiongroup = await collectiongroupModel.find({});
        res.status(200).send({
            success: true,
            message: "All Collection group List",
            collectiongroup,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all collection group",
        });
    }
};

//single collection
export const singleCollectiongroupController = async (req, res) => {
    try {
        const collectiongroup = await collectiongroupModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get SIngle Collection group SUccessfully",
            collectiongroup,
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single Collection group",
        });
    }
};

//delete collection
export const deleteCollectiongroupController = async (req, res) => {
    try {
        const { id } = req.params;
        await collectiongroupModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Collection group Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting collection group",
            error,
        });
    }
};