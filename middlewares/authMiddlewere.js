const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.userID=decoded.userID,
                console.log(decoded)
                next()
            }
            else{
                res.status(200).send({"msg":"You are not Authorised...."})
            }
        })
    }
    else{
        res.status(200).send({"msg":"Please Login First ..."})
    }
}

module.exports={
    auth
}