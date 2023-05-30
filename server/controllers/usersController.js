const User = require('../model/userModel')
const bcrypt = require("bcrypt");

module.exports.register = async (req,res,next)=>{

const {username,email,password} =req.body;
try{
const usernameCheck = await User.findOne({username});
if(usernameCheck)
return res.json({msg: "Username already used",status :false});

const emailCheck = await User.findOne({email});
if(usernameCheck)
return res.json({msg: "Email already used",status :false});


const hashedPassword  = await bcrypt.hash(password,10);

const user = await User.create({
    email,
    username,
    password:hashedPassword,
})
delete user.password;
return res.json({status:true, user});
}
catch(err){
    next(err);
}


}





module.exports.login = async (req,res,next)=>{

const {username,password} =req.body;
try{
const user = await User.findOne({username});
if(!user)
return res.json({msg: "Your username is incorrect",status :false});

const isPasswordValid = await bcrypt.compare(password,user.password);
if(!isPasswordValid)
{
    return res.json({msg: "Your password is incorrect",status :false});

}
delete user.password;

return res.json({status:true, user})

}
catch(err){
    next(err);
}


}

module.exports.setAvatar = async (req,res,next)=>{
try{
const userId = req.params.id;
const avatarImage = req.body.image;
const userData =await User.findByIdAndUpdate(userId,{
    isAvatarImageSet : true,
    avatarImage,

})
return res.json({
    isSet:userData.isAvatarImageSet,
    image:userData.avatarImage})
}catch(er)
{
    next(er)
}
}


module.exports.getAllUser = async (req,res,next)=>{
try{
const users =await User.find({_id:{$ne : req.params.id}}).select([
    "email",
    "username",
    "avatarImage",
    "_id",
])
return res.json(users)
}catch(ex){
next(ex)
}
}
