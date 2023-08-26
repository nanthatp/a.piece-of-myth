import collectionModel from "../models/collectionModel.js";
import slugify from "slugify";

export  const createCollectionController = async(req, res) => {
    try {
        const {name} = req.body
        if(!name) {
            return res.status(401).send({message:'Name is required'});
        }
        const existingCollection = await collectionModel.findOne({name})
        if(existingCollection) {
            return res.status(200).send({
                success:true,
                message:'Collection Already Exists'});
        }
        const collection = await new collectionModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'New Collection Created',
            collection,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Collection'
        });
    }
};

//update collection
export const updateCollectionController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const collection = await collectionModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Collection Updated Successfully",
            collection,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating collection",
        });
    }
};

//get all categories
export const collectionController = async (req, res) => {
    try {
        const collection = await collectionModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            collection,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting all categories",
        });
    }
};

//single collection
export const singleCollectionController = async (req, res) => {
    try {
        const collection = await collectionModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get SIngle Collection SUccessfully",
            collection,
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single Collection",
        });
    }
};

//delete collection
export const deleteCollectionController = async (req, res) => {
    try {
        const { id } = req.params;
        await collectionModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Collection Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting collection",
            error,
        });
    }
};