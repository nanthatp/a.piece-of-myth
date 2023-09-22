import categoryModel from "../models/categoryModel.js";
import collectionModel from "../models/collectiongroupModel.js";
import preproductModel from "../models/preproductModel.js";
import artistModel from "../models/artistModel.js";

import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";

import braintree from "braintree";
import preorderModel from "../models/preorder.Model.js";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });

  export const createPreProductController = async (req,res)  => {
    try {
        const {name, slug, description, price, category, artist, member,until,collectiongroup} = req.fields;
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
            case !artist:
                return res.status(500).send({error:'Artist is required'})
            case !member:
                return res.status(500).send({error:'Member is required'})
            case !until:
                return res.status(500).send({error:'Until time is required'})
            case !collectiongroup:
                return res.status(500).send({error:'collectiongroup time is required'})
            case photo && photo.size > 150000000000:
                return res.status(500).send({error:'Photo is requiredand less than 1.5mb'})
        }
        const preproducts = new preproductModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            preproducts.photo.data = fs.readFileSync(photo.path);
            preproducts.photo.contentType = photo.type;
        }
        await preproducts.save();
        res.status(201).send({
            success:true,
            message:'Pre-order products created successfully',
            preproducts,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in  creating Pre-order product'
        });
    }
};

//get all Pre-order product
export const getPreProductController = async(req, res) => {
    try {
        const preproducts = await preproductModel.find({}).select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            count_total : preproducts.length,
            message:'AllPreProduct',
            preproducts,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting Pre-order product',
            error: error.message
        });
    }
};

//get single Pre-order product
export const getSinglePreProductController = async (req, res) => {
    try {
        const preproduct = await preproductModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single PreProduct Fetched",
            preproduct,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single Preproduct",
            error,
        });
    }
};

// get photo
export const PreproductPhotoController = async (req, res) => {
    try {
        const preproduct = await preproductModel.findById(req.params.pid).select("photo");
        if (preproduct.photo.data) {
            res.set("Content-type", preproduct.photo.contentType);
            return res.status(200).send(preproduct.photo.data);

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

//delete Pre-order product 
export const deletePreProductController = async (req, res) => {
    try {
        await preproductModel.findByIdAndDelete(req.params.pid).select("-photo");
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

//update Pre-order product
export const updatePreProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, artist, member, shipping, until,collectiongroup} = req.fields;
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
            case !artist:
                return res.status(500).send({error:'Artist is required'})
            case !member:
                return res.status(500).send({error:'Member is required'})
            case !until:
                return res.status(500).send({error:'Until is required'})
            case !collectiongroup:
                return res.status(500).send({error:'Collection is required'})
            case photo && photo.size > 150000000000:
                return res.status(500).send({error:'Photo is requiredand less than 1.5 mb'})
        }
        const preproducts = await preproductModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if(photo){
            preproducts.photo.data = fs.readFileSync(photo.path)
            preproducts.photo.contentType = photo.type
        }
        await preproducts.save()
        res.status(201).send({
            success:true,
            message:'Pre-order Product Updated Successfully',
            preproducts,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Update Pre-order product'
        });
    }
};

// filters
export const PreproductFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const preproducts = await preproductModel.find(args);
        res.status(200).send({
        success: true,
        preproducts,
    });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Filtering Pre-order Products",
            error,
    });
    }
};

// product count
export const PreproductCountController = async (req, res) => {
    try {
    const total = await preproductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
        success: true,
        total,
    });
    } catch (error) {
    console.log(error);
    res.status(400).send({
        message: "Error in Pre-order product count",
        error,
        success: false,
    });
    }
};

// Pre-order product list base on page
export const PreproductListController = async (req, res) => {
    try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const preproducts = await preproductModel
        .find({})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
    res.status(200).send({
        success: true,
        preproducts,
    });
    } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        message: "error in per page ctrl",
        error,
    });
    }
};

// search pre-order product
export const searchPreProductController = async (req, res) => {
    try {
    const { keyword } = req.params;
    const resutls = await preproductModel
        .find({
        $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
        ],
        })
        .select("-photo");
    res.json(resutls);
    } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        message: "Error In Search Pre-order Product API",
        error,
    });
    }
};

// similar Pre-Order products
export const realtedPreProductController = async (req, res) => {
    try {
    const { pid, cid } = req.params;
    const preproducts = await preproductModel
        .find({
        category: cid,
        _id: { $ne: pid },
        })
        .select("-photo")
        .limit(3)
        .populate("category");
    res.status(200).send({
        success: true,
        preproducts,
    });
    } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        message: "error while geting related Pre-order product",
        error,
    });
    }
};

// get Pre-order product by category
export const PreproductCategoryController = async (req, res) => {
    try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const preproducts = await preproductModel.find({ category }).populate("category");
    res.status(200).send({
        success: true,
        category,
        preproducts,
    });
    } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        error,
        message: "Error While Getting Pre-order products",
    });
    }
};

// get pre-order product by category
export const preproductCategoryController = async (req, res) => {
    try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const preproducts = await preproductModel.find({ category }).populate("category");
    res.status(200).send({
        success: true,
        category,
        preproducts,
    });
    } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        error,
        message: "Error While Getting pre-order products",
    });
    }
};

// get pre-order product by artist
export const preproductArtistController = async (req, res) => {
    try {
    const artist = await artistModel.findOne({ slug: req.params.slug });
    const preproducts = await preproductModel.find({ artist }).populate("artist");
    res.status(200).send({
        success: true,
        artist,
        preproducts,
    });
    } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        error,
        message: "Error While Getting pre-order products",
    });
    }
};

// get Pre-Order product by collection
export const preProductCollectionController = async (req, res) => {
    try {
    const collectiongroup = await collectionModel.findOne({ slug: req.params.slug });
    const preproducts = await preproductModel.find({ collectiongroup }).populate("collectiongroup");
    res.status(200).send({
        success: true,
        collectiongroup,
        preproducts,
    });
    } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        error,
        message: "Error While Getting products",
    });
    }
};

//payment gateway api
//token
export const braintreeTokenForPreOrederController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  //payment
  export const brainTreePaymentForPreOrederController = async (req, res) => {
    try {
        console.log("test",req.body);
      const { nonce, preorderItem } = req.body;
      let total = preorderItem.price * preorderItem.quantity;
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        async function (error, result) {
          if (result) {
            console.log("result = ",result);
            console.log("result2 = ",preorderItem);
            const preorder = new preorderModel({
              preproduct: preorderItem,
              payment: result,
              quantity: preorderItem.quantity,
              buyer: req.user._id,
            });
            await preorder.save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
    //   console.log(error);
    }
  };