import artistModel from "../models/artistModel.js";
import slugify from "slugify";

export  const createArtistController = async(req, res) => {
    try {
        const {name} = req.body
        if(!name) {
            return res.status(401).send({message:'Artist is required'});
        }
        const existingArtist = await artistModel.findOne({name})
        if(existingArtist) {
            return res.status(200).send({
                success:true,
                message:'Artist Already Exists'});
        }
        const artist = await new artistModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'New Artist Created',
            artist,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Artist'
        });
    }
};

//update artist
export const updateArtistController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const artist = await artistModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Artist Updated Successfully",
            artist,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating artist",
        });
    }
};

//get all artists
export  const artistController = async(req,res) => {
    try {
        const artist = await artistModel.find({})
        res.status(200).send({
            success:true,
            message:'All Artists List',
            artist,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting all artists'
        })
    }
};

//single artist
export const singleArtistController = async (req, res) => {
    try {
        const artist = await artistModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get SIngle Artist SUccessfully",
            artist,
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single Artist",
        });
    }
};
//delete artist
export const deleteArtistController = async (req, res) => {
    try {
        const { id } = req.params;
        await artistModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Artist Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting artist",
            error,
        });
    }
};