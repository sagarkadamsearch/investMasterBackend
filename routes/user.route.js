const express = require("express");
const multer = require('multer');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");
const {processAndResizeImage} = require('../functions/imageProcess');
const { default: Search } = require("../../front_end/src/components/Dashboard/Search/search");
const userRoute = express.Router()


userRoute.get('/',async(req,res)=>{
    const {active,deactive,ageGreaterThan18,search} = req.query;
   console.log(active==true);
        try {
            let query = {};
        
            if (active=='true') {
              query.status = 'active';
            }
        
            if (deactive=='true') {
              // If 'deactive' is already in the query, use $in to allow multiple values
              if (query.status) {
                query.status = { $in: ['active', 'deactive'] };
              } else {
                query.status = 'deactive';
              }
            }
        
            if (ageGreaterThan18=='true') {
              query.age = { $gt: 18 };
            }

            if(search){
             // Use a regular expression to perform a case-insensitive search on name or surname
              const searchRegex = new RegExp(search, 'i');
              query.$or = [
                { name: searchRegex },
                { surname: searchRegex },
              ]; 
            }
        
            let users = await userModel.find(query);
            res.status(200).json(users);
        
    } catch (error) {
        res.status(400).send({"Error":error});
    }
})

userRoute.post("/register", async(req, res)=>{
    const {password} = req.body
    try{

        bcrypt.hash(password, 10, async(err, hash)=>{
            if(err){
                res.status(200).send(err)
            }else{
                const user = new userModel({
                    ...req.body,
                    password:hash
                })
                await user.save()
                res.status(200).send({"Msg":"New User Added", "User":user})
            }
        });
    }catch(err){
        res.status(400).send({"Error":err})
    }
})

userRoute.post("/login", async(req, res)=>{
    const {email, password} = req.body
    try{
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                if(result){
                    var token = jwt.sign(user, 'masai');
                    res.cookie('accessToken', token, {
                        httpOnly: true,
                        secure: true,
                    });
                    res.status(200).send({"Msg":"Login Successfully","token":token})
                }else{
                    res.status(200).send(err)
                }
            });
        }else{
            res.status(200).send({"MSg":"User Not Present"})
        }
    }catch(err){
        
    }
})

module.exports={userRoute}
