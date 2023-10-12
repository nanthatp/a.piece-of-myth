import categoryModel from "../models/categoryModel.js";
import preproductModel from "../models/preproductModel.js";
import artistModel from "../models/artistModel.js";

import fs from "fs";
import csv from "fast-csv";
import slugify from "slugify";
import dotenv from "dotenv";

import braintree from "braintree";
import preorderModel from "../models/preorder.Model.js";
import collectiongroupModel from "../models/collectiongroupModel.js";

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

//get all Pre-order product
export const getPreProductVisibleController = async(req, res) => {
    try {
        const preproducts = await preproductModel.find({status: "Visible"}).select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            count_total : preproducts.length,
            message:'AllVisiblePreProduct',
            preproducts,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting Visible Pre-order product',
            error: error.message
        });
    }
};

//get all Pre-order product
export const getPreProductInvisibleController = async(req, res) => {
    try {
        const preproducts = await preproductModel.find({status: "Invisible"}).select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            count_total : preproducts.length,
            message:'AllInvisiblePreProduct',
            preproducts,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting Invisible Pre-order product',
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

//delete Invisible Pre-order product 
export const deleteInvisiblePreProductController = async (req, res) => {
    try {
        await preproductModel.deleteMany({status: "Invisible"}).select("-photo");
        res.status(200).send({
            success: true,
            message: "Invisible Pre-Order Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting Invisible PRE-Order product",
            error,
        });
    }
};

//update Pre-order product
export const updatePreProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category, artist, member, status, until,collectiongroup} = req.fields;
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
        .find({status: "Visible"})
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
    const preproducts = await preproductModel.find({ category }).find({status: "Visible"}).populate("category");
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
    const preproducts = await preproductModel.find({ category }).find({status: "Visible"}).populate("category");
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
    const preproducts = await preproductModel.find({ artist }).find({status: "Visible"}).populate("artist");
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

// get pre-order product by status
export const preproductBystatusController = async (req, res) => {
    // try {
    // const preorders = await preorderModel.find({ status: req.params.status });
    // // const preproducts = await preproductModel.find({ category }).populate("category");
    // res.status(200).send({
    //     success: true,
    //     preorders,
    // });
    // } catch (error) {
    // console.log(error);
    // res.status(400).send({
    //     success: false,
    //     error,
    //     message: "Error While Getting pre-order products by status",
    // });
    // }
    try{
    const preorders = await preorderModel
      .find({ status: req.params.status })
      .populate("preproduct", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(preorders);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting Pre-order Products by preProduct id",
    })
  }
};

// get Pre-Order product by collection
export const preProductCollectionController = async (req, res) => {
    try {
    // const collectiongroup = await collectiongroupModel.findOne( { slug: req.params.slug } );
    const preproducts = await preproductModel.find({ collectiongroup: req.params.collectiongroup }).find({status: "Visible"}).populate("collectiongroup");
    res.status(200).send({
        success: true,
        // collectiongroup,
        preproducts,
    });
    } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        error,
        message: "Error While Getting collectiongroup Pre-Order products",
    });
    }
};

//get preproduct by collection slug
export const preproductCollectionBySlugController = async (req, res) => {
    try {
    const collectiongroup = await collectiongroupModel.findOne({ slug: req.params.slug });
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

//download csv
export const preorderExport = async (req, res) => {
    try {
        const preorderdata = await preorderModel.find({ preproduct: req.params.preproduct })
        .populate("buyer", ["name", "address", "postalcode", "province", "province", "phone", "email"])
        .populate("preproduct", ["name", "price"]);
        

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("csv_PreOrder_Data/")) {
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("csv_PreOrder_Data/");
            }
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("./csv_PreOrder_Data/");
            }
        }
        console.log("req.params=" ,req.params )
        const writablestream = fs.createWriteStream(
            `csv_PreOrder_Data/preorders_${req.params.preproduct}.csv`
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            res.json({
                downloadUrl: "http://localhost:3000/preorders.csv",
            });
        });
        if (preorderdata.length > 0) {
            preorderdata.map((preorders) => {
                csvStream.write({
                    id: preorders.id ? preorders.id : "-",
                    preproduct: preorders.preproduct ? preorders.preproduct : "-",
                    buyer: preorders.buyer ? preorders.buyer  : "-",
                    quantity: preorders.quantity ? preorders.quantity : "-",
                    status: preorders.status ? preorders.status : "-",
                    DateCreated: preorders.createdAt ? preorders.createdAt : "-",
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
    }
};

//download csv By not process status
export const preorderNot_ProcessStatusExport = async (req, res) => {
    try {
        const preorderdata = await preorderModel.find({ preproduct: req.params.preproduct })
        .find({ status: "Not_Process"})
        .populate("buyer", ["name", "address", "postalcode", "province", "province", "phone", "email"])
        .populate("preproduct", ["name", "price"]);
        

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("csv_PreOrder_Data/")) {
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("csv_PreOrder_Data/");
            }
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("./csv_PreOrder_Data/");
            }
        }
        console.log("req.params=" ,req.params )
        const writablestream = fs.createWriteStream(
            `csv_PreOrder_Data/preorders_${req.params.preproduct}_Not_Process.csv`
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            res.json({
                downloadUrl: "http://localhost:3000/preorders.csv",
            });
        });
        if (preorderdata.length > 0) {
            preorderdata.map((preorders) => {
                csvStream.write({
                    id: preorders.id ? preorders.id : "-",
                    preproduct: preorders.preproduct ? preorders.preproduct : "-",
                    buyer: preorders.buyer ? preorders.buyer  : "-",
                    quantity: preorders.quantity ? preorders.quantity : "-",
                    status: preorders.status ? preorders.status : "-",
                    DateCreated: preorders.createdAt ? preorders.createdAt : "-",
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
    }
};

//download csv By processing status
export const preorderProcessingStatusExport = async (req, res) => {
    try {
        const preorderdata = await preorderModel.find({ preproduct: req.params.preproduct })
        .find({ status: "Processing"})
        .populate("buyer", ["name", "address", "postalcode", "province", "province", "phone", "email"])
        .populate("preproduct", ["name", "price"]);
        

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("csv_PreOrder_Data/")) {
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("csv_PreOrder_Data/");
            }
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("./csv_PreOrder_Data/");
            }
        }
        console.log("req.params=" ,req.params )
        const writablestream = fs.createWriteStream(
            `csv_PreOrder_Data/preorders_${req.params.preproduct}_Processing.csv`
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            res.json({
                downloadUrl: "http://localhost:3000/preorders.csv",
            });
        });
        if (preorderdata.length > 0) {
            preorderdata.map((preorders) => {
                csvStream.write({
                    id: preorders.id ? preorders.id : "-",
                    preproduct: preorders.preproduct ? preorders.preproduct : "-",
                    buyer: preorders.buyer ? preorders.buyer  : "-",
                    quantity: preorders.quantity ? preorders.quantity : "-",
                    status: preorders.status ? preorders.status : "-",
                    DateCreated: preorders.createdAt ? preorders.createdAt : "-",
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
    }
};


//download csv By shipped status
export const preorderShippedStatusExport = async (req, res) => {
    try {
        const preorderdata = await preorderModel.find({ preproduct: req.params.preproduct })
        .find({ status: "Shipped"})
        .populate("buyer", ["name", "address", "postalcode", "province", "province", "phone", "email"])
        .populate("preproduct", ["name", "price"]);
        

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("csv_PreOrder_Data/")) {
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("csv_PreOrder_Data/");
            }
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("./csv_PreOrder_Data/");
            }
        }
        console.log("req.params=" ,req.params )
        const writablestream = fs.createWriteStream(
            `csv_PreOrder_Data/preorders_${req.params.preproduct}_Shipped.csv`
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            res.json({
                downloadUrl: "http://localhost:3000/preorders.csv",
            });
        });
        if (preorderdata.length > 0) {
            preorderdata.map((preorders) => {
                csvStream.write({
                    id: preorders.id ? preorders.id : "-",
                    preproduct: preorders.preproduct ? preorders.preproduct : "-",
                    buyer: preorders.buyer ? preorders.buyer  : "-",
                    quantity: preorders.quantity ? preorders.quantity : "-",
                    status: preorders.status ? preorders.status : "-",
                    DateCreated: preorders.createdAt ? preorders.createdAt : "-",
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
    }
};

//download csv By deliverd status
export const preorderDeliverdStatusExport = async (req, res) => {
    try {
        const preorderdata = await preorderModel.find({ preproduct: req.params.preproduct })
        .find({ status: "deliverd"})
        .populate("buyer", ["name", "address", "postalcode", "province", "province", "phone", "email"])
        .populate("preproduct", ["name", "price"]);
        

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("csv_PreOrder_Data/")) {
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("csv_PreOrder_Data/");
            }
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("./csv_PreOrder_Data/");
            }
        }
        console.log("req.params=" ,req.params )
        const writablestream = fs.createWriteStream(
            `csv_PreOrder_Data/preorders_${req.params.preproduct}_Deliverd.csv`
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            res.json({
                downloadUrl: "http://localhost:3000/preorders.csv",
            });
        });
        if (preorderdata.length > 0) {
            preorderdata.map((preorders) => {
                csvStream.write({
                    id: preorders.id ? preorders.id : "-",
                    preproduct: preorders.preproduct ? preorders.preproduct : "-",
                    buyer: preorders.buyer ? preorders.buyer  : "-",
                    quantity: preorders.quantity ? preorders.quantity : "-",
                    status: preorders.status ? preorders.status : "-",
                    DateCreated: preorders.createdAt ? preorders.createdAt : "-",
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
    }
};

//download csv By cancel status
export const preorderCancelStatusExport = async (req, res) => {
    try {
        const preorderdata = await preorderModel.find({ preproduct: req.params.preproduct })
        .find({ status: "cancel"})
        .populate("buyer", ["name", "address", "postalcode", "province", "province", "phone", "email"])
        .populate("preproduct", ["name", "price"]);
        

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("csv_PreOrder_Data/")) {
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("csv_PreOrder_Data/");
            }
            if (!fs.existsSync("csv_PreOrder_Data")) {
                fs.mkdirSync("./csv_PreOrder_Data/");
            }
        }
        console.log("req.params=" ,req.params )
        const writablestream = fs.createWriteStream(
            `csv_PreOrder_Data/preorders_${req.params.preproduct}_Cancel.csv`
        );

        csvStream.pipe(writablestream);

        writablestream.on("finish", function () {
            res.json({
                downloadUrl: "http://localhost:3000/preorders.csv",
            });
        });
        if (preorderdata.length > 0) {
            preorderdata.map((preorders) => {
                csvStream.write({
                    id: preorders.id ? preorders.id : "-",
                    preproduct: preorders.preproduct ? preorders.preproduct : "-",
                    buyer: preorders.buyer ? preorders.buyer  : "-",
                    quantity: preorders.quantity ? preorders.quantity : "-",
                    status: preorders.status ? preorders.status : "-",
                    DateCreated: preorders.createdAt ? preorders.createdAt : "-",
                })
            })
        }
        csvStream.end();
        writablestream.end();

    } catch (error) {
        res.status(401).json(error)
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
              email: req.body.email
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