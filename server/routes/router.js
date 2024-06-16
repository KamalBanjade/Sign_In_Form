const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const keysecret = "akldfjkdfkdfkdggkfjkdkadkfjirwekjrkdjfsd";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'kamalbanjade2004@gmail.com',
        pass: 'sfio nrlp bnvy cszo',
    }
});

router.post("/register", async (req, res) => {
    const { fname, email, password, cpassword } = req.body;

    if (!fname || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Fill all the details" });
    }

    try {
        const preuser = await userdb.findOne({ email });
        if (preuser) {
            return res.status(422).json({ error: "This Email is Already Exist" });
        } else if (password !== cpassword) {
            return res.status(422).json({ error: "Password and Confirm Password Not Match" });
        } else {
            const finalUser = new userdb({ fname, email, password, cpassword });
            const storeData = await finalUser.save();
            res.status(201).json({ status: 201, storeData });
        }
    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }
});

// Other routes...

module.exports = router;

// user Login
 router.post("/login", async (req, res) => {
    //console.log(req.body);

    const { email, password } = req.body;

     if (!email || !password) {
         res.status(422).json({ error: "fill all the details" })
     }
     try{
        const userValid = await userdb.findOne({email:email});

        if(userValid){
            const isMatch = await bcrypt.compare(password,userValid.password);
            
            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{
                // token generate
                 const token = await userValid.generateAuthtoken();
                 //console.log(token)
                 
                 //cookie generate
                 res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });
                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }
     }catch(error){
        res.status(401).json(error);
        console.log("catch block");
     }
})
// user valid
router.get("/validuser",authenticate, async(req,res)=>{
    console.log("validated...")
    try {
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});


// user logout

 router.get("/logout",authenticate,async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
 })

 // send email Link For reset Password
 router.post("/sendpasswordlink",async(req,res)=>{
    console.log(req.body)

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }
    try {
        const userfind = await userdb.findOne({email:email});
        //console.log(userfind)

        // token generate for reset password
        const token = jwt.sign({_id:userfind._id},keysecret,{
            expiresIn:"120s"
        });
        //console.log(token)
        
        const setusertoken = await userdb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
        //console.log(setusertoken)

        if(setusertoken){
            const mailOptions = {
                from:"kamalbanjade2004@gmail.com",
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For 2 MINUTES https://sign-in-form-rho.vercel.app/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent Successfully"})
                }
            })

        }

    } catch (error) {
        res.status(401).json({status:401,message:"invalid user"})
    }

});

// verify user for forgot password time
router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;
    //console.log(id, token)
    try{
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        //console.log(validuser)

        const verifyToken = jwt.verify(token,keysecret);
        console.log(verifyToken)

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
        
        
    }catch(error){

    }
})
// change password

router.post("/:id/:token",async(req,res)=>{

    const {id,token} = req.params;

    const {password} = req.body;

    try{
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);

            const setnewuserpass = await userdb.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    }catch(error){
        res.status(401).json({status:401,error})
    }

})
router.get("/protected-route", authenticate, (req, res) => {
    res.status(200).json({ message: "You have access", user: req.rootUser });
});

module.exports = router;






