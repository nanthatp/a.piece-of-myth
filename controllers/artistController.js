import artistModel from "../models/artistModel.js";
import slugify from "slugify";
import fs from "fs";

export const createArtistController = async (req,res)  => {
    try {
        const {name, slug, member, } = req.fields;
        const {photo} = req.files;
        
        //alidation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !member:
                return res.status(500).send({error:'Member is required'})
            case photo && photo.size > 150000000000:
                return res.status(500).send({error:'Photo is required and less than 1.5mb'})
        }
        const artists = new artistModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            artists.photo.data = fs.readFileSync(photo.path);
            artists.photo.contentType = photo.type;
        }
        await artists.save();
        res.status(201).send({
            success:true,
            message:'Artist created successfully',
            artists,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in  creating artist'
        });
    }
};

//get all artist
export const getArtistController = async(req, res) => {
    try {
        const artists = await artistModel.find({}).select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            count_total : artists.length,
            message:'AllArtist',
            artists,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting artist',
            error: error.message
        });
    }
};

//get single artist
export const getSingleArtistController = async (req, res) => {
    try {
        const artist = await artistModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
        res.status(200).send({
            success: true,
            message: "Single Artist Fetched",
            artist,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting Single Artist",
            error,
        });
    }
};

// get photo
export const artistPhotoController = async (req, res) => {
    try {
        const artist = await artistModel.findById(req.params.pid).select("photo");
        if (artist.photo.data) {
            res.set("Content-type", artist.photo.contentType);
            return res.status(200).send(artist.photo.data);

        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error,
        });
    }
};

//delete artist 
export const deleteArtistController = async (req, res) => {
    try {
        await artistModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Artist Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting Artist",
            error,
        });
    }
};

//update artist
export const updateArtistController = async (req, res) => {
    try {
        const {name, slug, member, } = req.fields;
        const {photo} = req.files;
        
        //alidation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !member:
                return res.status(500).send({error:'Member is required'})
            case photo && photo.size > 150000000000:
                return res.status(500).send({error:'Photo is required and less than 1.5mb'})
        }
        const artists = await artistModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );

        if (photo) {
            artists.photo.data = fs.readFileSync(photo.path);
            artists.photo.contentType = photo.type;
        }
        await artists.save();
        res.status(201).send({
            success:true,
            message:'Artist Update successfully',
            artists,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in  Update Artist'
        });
    }
};
