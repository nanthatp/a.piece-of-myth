import bannerModel from "../models/bannerModel.js";
import artistModel from "../models/artistModel.js";
import collectiongroupModel from "../models/collectiongroupModel.js";
import slugify from "slugify";
import fs from "fs";

export const createBannerController = async (req,res)  => {
    try {
        const {name, slug, artist, collectiongroup} = req.fields;
        const {file} = req.files;
        
        //alidation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !artist:
                return res.status(500).send({error:'Artist is required'})
            case !collectiongroup:
                return res.status(500).send({error:'Collection Group is required'})
            case !file:
                return res.status(500).send({error:'File is required'})
        }
        const banners = new bannerModel({ ...req.fields, slug: slugify(name) });
        if (file) {
            banners.file.data = fs.readFileSync(file.path);
            banners.file.contentType = file.type;
        }
        await banners.save();
        res.status(201).send({
            success:true,
            message:'Banner created successfully',
            banners,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in  creating banner'
        });
    }
};

//get all banner
export const getBannerController = async(req, res) => {
    try {
        const banners = await bannerModel.find({}).select("-file").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            count_total : banners.length,
            message:'AllBanner',
            banners,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting banner',
            error: error.message
        });
    }
};

//get single banner
export const getSingleBannerController = async (req, res) => {
    try {
        const banner = await bannerModel
            .findOne({ slug: req.params.slug })
            .select("-file")
            .populate("artist")
        res.status(200).send({
            success: true,
            message: "Single Banner Fetched",
            banner,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single banner",
            error,
        });
    }
};

// get file
export const bannerFileController = async (req, res) => {
    try {
        const banner = await bannerModel.findById(req.params.pid).select("file");
        if (banner.file.data) {
            res.set("Content-type", banner.file.contentType);
            return res.status(200).send(banner.file.data);

        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting file",
            error,
        });
    }
};

//delete banner 
export const deleteBannerController = async (req, res) => {
    try {
        await bannerModel.findByIdAndDelete(req.params.pid).select("-file");
        res.status(200).send({
            success: true,
            message: "Banner Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting banner",
            error,
        });
    }
};

//update banner
export const updateBannerController = async (req, res) => {
    try {
        const {name, slug,  artist, collectiongroup} = req.fields;
        const {file} = req.files;
        
        //alidation
        switch(true){
            case !name:
                return res.status(500).send({error:'Name is required'})
            case !artist:
                return res.status(500).send({error:'Artist is required'})
            case !collectiongroup:
                return res.status(500).send({error:'Collection Group is required'})
            case file :
                return res.status(500).send({error:'File is required'})
        }
        const banners = await bannerModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if(file){
            banners.file.data = fs.readFileSync(file.path)
            banners.file.contentType = file.type
        }
        await banners.save()
        res.status(201).send({
            success:true,
            message:'Banner Updated Successfully',
            banners,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Update banner'
        });
    }
};
