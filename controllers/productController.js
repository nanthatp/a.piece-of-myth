import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import artistModel from "../models/artistModel.js";
import collectiongroupModel from "../models/collectiongroupModel.js";
import orderModel from "../models/orderModel.js";

import fs from "fs";
import slugify from "slugify";
import dotenv from "dotenv";

import braintree from "braintree";

dotenv.config();


//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req,res)  => {
    try {
        const {name, slug, description, price, category,  collectiongroup, quantity, artist, member, status} = req.fields;
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
            case !collectiongroup:
                return res.status(500).send({error:'Collection Group is required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is required'})
            case !artist:
                return res.status(500).send({error:'Artist is required'})
            // case !member:
            //     return res.status(500).send({error:'Member is required'})
            case photo && photo.size > 150000000000:
                return res.status(500).send({error:'Photo is required and less than 1.5mb'})
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(204).send({
            success:true,
            message:'Product created successfully',
            products,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in  creating product'
        });
    }
};

//get all product
export const getProductController = async(req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            count_total : products.length,
            message:'AllProduct',
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting product',
            error: error.message
        });
    }
};

//get all product by Visible status
export const getProductVisibleController = async(req, res) => {
    try {
        const products = await productModel.find({status: "Visible"}).select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            count_total : products.length,
            message:'AllVisibleProduct',
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting Visible product',
            error: error.message
        });
    }
};

//get all product by Invisible status
export const getProductInvisibleController = async(req, res) => {
    try {
        const products = await productModel.find({status: "Invisible"}).select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            count_total : products.length,
            message:'AllInvisibleProduct',
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting Invisible product',
            error: error.message
        });
    }
};

//get single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
            .findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");
        res.status(200).send({
            success: true,
            message: "Single Product Fetched",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror while getitng single product",
            error,
        });
    }
};

// get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);

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

//delete product 
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
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

//delete all Invisible product 
export const deleteInvisibleProductController = async (req, res) => {
    try {
        await productModel.deleteMany({status: "Invisible"}).select("-photo");
        res.status(200).send({
            success: true,
            message: "Invisible Product Deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting Invisible product",
            error,
        });
    }
};

//update product
export const updateProductController = async (req, res) => {
    try {
        const {name, slug, description, price, category,  collectiongroup, quantity, artist, member, status} = req.fields;
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
            case !collectiongroup:
                return res.status(500).send({error:'Collection Group is required'})
            case !quantity:
                return res.status(500).send({error:'Quantity is required'})
            case !artist:
                return res.status(500).send({error:'Artist is required'})
            // case !member:
            //     return res.status(500).send({error:'Member is required'})
            case photo && photo.size > 150000000000:
                return res.status(500).send({error:'Photo is required and less than 1.5 mb'})
        }
        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(211).send({
            success:true,
            message:'Product Updated Successfully',
            products,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Update product'
        });
    }
};

// filters
export const productFiltersController = async (req, res) => {
    try {
        const { checkcate,checkart,checked, radio } = req.body;
        let args = {};
        if (checkcate.length > 0) args.category = checkcate;
        if (checkart.length > 0) args.artist = checkart;
        if (checked.length > 0) args.collectiongroup = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args).find({status: "Visible"});
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While Filtering Products",
            error,
        });
    }
};

export const productFilterStatusController = async (req, res) => {
    try {
        const { check } = req.body;
        let args = {};
        if (check.length > 0) args.product = check;
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While Filtering Products",
            error,
        });
    }
}


// product count
export const productCountController = async (req, res) => {
    try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
        success: true,
        total,
    });
    } catch (error) {
    console.log(error);
    res.status(400).send({
        message: "Error in product count",
        error,
        success: false,
    });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
        .find({status: "Visible"})
        .select("-photo")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
    res.status(200).send({
        success: true,
        products,
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

// search product
export const searchProductController = async (req, res) => {
    try {
    const { keyword } = req.params;
    const resutls = await productModel
        .find({
        $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
        ],
        })
        .find({status: "Visible"})
        .select("-photo");
    res.json(resutls);
    } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        message: "Error In Search Product API",
        error,
    });
    }
};

// similar products
export const realtedProductController = async (req, res) => {
    try {
    const { pid, cid } = req.params;
    const products = await productModel
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
        products,
    });
    } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        message: "error while geting related product",
        error,
    });
    }
};

// get product by category
export const productCategoryController = async (req, res) => {
    try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).find({status: "Visible"}).populate("category");
    res.status(200).send({
        success: true,
        category,
        products,
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

// get product by collection
export const productCollectionController = async (req, res) => {
    try {
    const collectiongroup = await collectiongroupModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ collectiongroup }).populate("collectiongroup");
    res.status(200).send({
        success: true,
        collectiongroup,
        products,
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

// get product by artist
export const productArtistController = async (req, res) => {
    try {
    const artist = await artistModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ artist }).find({status: "Visible"}).populate("artist");
    res.status(200).send({
        success: true,
        artist,
        products,
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

// get order product by status
export const productBystatusController = async (req, res) => {
    try {
    const orders = await orderModel.find({ status: req.params.status });
    // const preproducts = await preproductModel.find({ category }).populate("category");
    res.status(200).send({
        success: true,
        orders,
    });
    } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        error,
        message: "Error While Getting order by status",
    });
    }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
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
  export const brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let category = [];
      for (let index = 0; index < cart.length; index++) {
        const item = cart[index];
        if( !category[item._id] ){
            category[item._id] = {
                amount : 1,
                remain : cart[index].quantity,
                name : cart[index].name,
            }
        }else{
            category[item._id].amount++
        }
      }
      console.log("category =",category)
      for(let key in category ){
        let item = category[key]
        let index = 0
        if(item.remain-item.amount<0){
            return res.status(500).send("You can buy  "+ item.name+ " only  " + item.remain  + " items");
        }
      } 
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
            console.log("result = ",cart);
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            });
            await order.save();

            //decrease product amount
            for(let item in cart){
                console.log("item = ",cart[item]);
                let products = await productModel.findOne({ _id : cart[item]._id});
                if ( products ){
                    products.quantity = products.quantity-1;
                    await products.save();
                }
            }

            return res.json({ ok: true });
          } else {
            return res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };


