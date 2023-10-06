import memberModel from "../models/memberModel.js";
import slugify from "slugify";
//test ja
export  const createMemberController = async(req, res) => {
    try {
        const {name} = req.body
        if(!name) {
            return res.status(401).send({message:'Name is required'});
        }
        const existingMember = await memberModel.findOne({name})
        if(existingMember) {
            return res.status(200).send({
                success:true,
                message:'Member Already Exists'});
        }
        const member = await new memberModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'New Member Created',
            member,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Member'
        });
    }
};

//update member
export const updateMemberController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const member = await memberModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Member Updated Successfully",
            member,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating member",
        });
    }
};

//get all members
export  const memberController = async(req,res) => {
    try {
        const member = await memberModel.find({})
        res.status(200).send({
            success:true,
            message:'All Members List',
            member,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error while getting all Members'
        })
    }
};

//single member
export const singleMemberController = async (req, res) => {
    try {
        const member = await memberModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get SIngle Member SUccessfully",
            member,
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While getting Single Member",
        });
    }
};

//delete member
export const deleteMemberController = async (req, res) => {
    try {
        const { id } = req.params;
        await memberModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Member Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error while deleting member",
            error,
        });
    }
};