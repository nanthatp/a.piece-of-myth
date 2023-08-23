import userModel from "../models/userModel.js";
import {comparePassword, hashPassword } from "./../helpers/authHelper.js";
import orderModel from "../models/orderModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import JWT from "jsonwebtoken";
import preorderModel from "../models/preorder.Model.js";
import preproductModel from "../models/preproductModel.js";


export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone,address,postalcode,province} = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    
    //register user
    const hashedPassword = await hashPassword(password);
    
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      address,
      postalcode,
      province,
      phone,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  
} catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }

      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          province: user.province,
          postalcode: user.postalcode,
          role: user.role,
        },
        token,
      });

    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


//test controller
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone,address,postalcode,province } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
        postalcode: postalcode || user.postalcode,
        province: province || user.province,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

//pre-orders
export const getPreorderController = async (req,res) => {
  try {
    const preorders = await preorderModel
      .find({ buyer: req.user._id})
      .populate("preproduct", "-photo")
      .populate("buyer", "name");
    res.json(preorders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting pre-order",
      error,
    });
  }
};

//get all Pre-order by preproduct preproductid
export const getAllPreOrdersByIdController = async (req, res) => {
  try {
    const preproduct = await preproductModel.findOne({ preproduct: req.params.slug });
    const preorder = await preorderModel.find({ preproduct }).populate("preproduct");
    res.status(200).send({
      success: true,
      preproduct,
      preorder,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting Pre-order Products by preProduct id",
    })
  }
};


//Pre-orders
export const getAllPreOrdersController = async (req, res) => {
  try {
    const preorders = await preorderModel
      .find({})
      .populate("preproduct", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(preorders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Pre-Orders",
      error,
    });
  }
};

//Pre-order status
export const preorderStatusController = async (req, res) => {
  try {
    const { preorderId } = req.params;
    const { status } = req.body;
    const preorders = await preorderModel.findByIdAndUpdate(
      preorderId,
      { status },
      { new: true }
    );
    res.json(preorders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Pre-Order",
      error,
    });
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (email) {
      const isUser = await userModel.findOne({ email: email });
      if (isUser) {
        // generate token
        const secretKey = isUser._id + "pleaseSubscribe";

        const token = jwt.sign({ userID: isUser._id }, secretKey, {
          expiresIn: "5m",
        });

        const link = `http://localhost:3000/user/reset/${isUser._id}/${token}`;

        // email sending
        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "91408bdf068844",
            pass: "4edd605e4d2e2a"
          }
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: `Password Reset Request`,
          text: `
            <!doctype html>
            <html lang="en-US">
            <head>
              <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
              <title>Reset Password Email Template</title>
              <meta name="description" content="Reset Password Email Template.">
              <style type="text/css">
                  a:hover {text-decoration: underline !important;}
              </style>
            </head>
            <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
              <!--100% body table-->
              <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                  style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                  <tr>
                      <td>
                          <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                              align="center" cellpadding="0" cellspacing="0">
                              
                              <tr>
                                  <td>
                                      <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                          style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                          <tr>
                                              <td style="height:40px;">&nbsp;</td>
                                          </tr>
                                          <tr>
                                              <td style="padding:0 35px;">
                                                  <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                      requested to reset your password</h1>
                                                  <span
                                                      style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                  <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                      We cannot simply send you your old password. A unique link to reset your
                                                      password has been generated for you. To reset your password, click the
                                                      following link and follow the instructions.
                                                  </p>
                                                  <a href=${link}
                                                      style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                      Password</a>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td style="height:40px;">&nbsp;</td>
                                          </tr>
                                      </table>
                                  </td>
                            
                          </table>
                      </td>
                  </tr>
              </table>
              <!--/100% body table-->
            </body>
            </html>`,
                      html: `
            <!doctype html>
            <html lang="en-US">
            <head>
              <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
              <title>Reset Password Email Template</title>
              <meta name="description" content="Reset Password Email Template.">
              <style type="text/css">
                  a:hover {text-decoration: underline !important;}
              </style>
            </head>
            <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
              <!--100% body table-->
              <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                  style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                  <tr>
                      <td>
                          <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                              align="center" cellpadding="0" cellspacing="0">
                            
                              <tr>
                                  <td>
                                      <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                          style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                          <tr>
                                              <td style="height:40px;">&nbsp;</td>
                                          </tr>
                                          <tr>
                                              <td style="padding:0 35px;">
                                                  <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                      requested to reset your password</h1>
                                                  <span
                                                      style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                  <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                      We cannot simply send you your old password. A unique link to reset your
                                                      password has been generated for you. To reset your password, click the
                                                      following link and follow the instructions.
                                                  </p>
                                                  <a href="${link}"
                                                      style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                      Password</a>
                                              </td>
                                          </tr>
                                          <tr>
                                              <td style="height:40px;">&nbsp;</td>
                                          </tr>
                                      </table>
                                  </td>
                            
                          </table>
                      </td>
                  </tr>
              </table>
              <!--/100% body table-->
            </body>
            </html>`,
        };

        transport.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(400).json({ message: "Error" });
          }
          return res.status(200).json({ message: "Email Sent" });
        });
      } else {
        return res.status(400).json({ message: "Invalid Email" });
      }
    } else {
      return res.status(400).json({ message: "email is required" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { id, token } = req.params;

  try {
    if (newPassword && confirmPassword && id && token) {
      if (newPassword === confirmPassword) {
        // token verifiying
        const isUser = await userModel.findById(id);
        const secretKey = isUser._id + "pleaseSubscribe";
        const isValid = await jwt.verify(token, secretKey);
        if (isValid) {
          // password hashing

          const genSalt = await bcryptjs.genSalt(10);
          const hashedPass = await bcryptjs.hash(newPassword, genSalt);

          const isSuccess = await userModel.findByIdAndUpdate(isUser._id, {
            $set: {
              password: hashedPass,
            },
          });

          if (isSuccess) {
            return res.status(200).json({
              message: "Password Changed Successfully",
            });
          }
        } else {
          return res.status(400).json({
            message: "Link has been Expired",
          });
        }
      } else {
        return res
          .status(400)
          .json({ message: "password and confirm password does not match" });
      }
    } else {
      return res.status(400).json({ message: "All fields are required" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
