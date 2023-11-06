const User = require("../model/userModel")
const bcrypt = require("bcrypt")

class userController {
    static async register(req,res,next) {
        try{
         const {username, email, password} = req.body
         const usernameCheck = await User.findOne({username})
         if (usernameCheck){
             return res.json({msg:"Username already used", status: false})
         }
         const emailCheck = await User.findOne({email})
         if (emailCheck){
             return res.json({msg: "Email already used", status: false})
         }
     
         const hashPassword = await bcrypt.hash(password, 10)
         const user = await User.create({
             email,username, password: hashPassword
         })
         delete user.password
         return res.json({status:true, user})
        } catch(error){
         next(error)
        }
     }
     
     static async login (req,res,next) {
         try{
          const {username, password} = req.body
          const user = await User.findOne({ username })
         //  console.log(user)
          if (!user){
              return res.json({msg:"Incorrect Username or Password", status: false})
          }
          const isPassValid = await bcrypt.compare(password, user.password)
          if (!isPassValid){
              return res.json({msg: "Incorrect Username or Password", status: false})
          }
          delete user.password
       
          delete user.password
          return res.json({status:true, user})
         } catch(error){
          next(error)
         }
      }
     
      static async setAvatar (req,res,next) {
        try{
         const userId = req.params.id
         const avatarImage = req.body.image
         // console.log(avatarImage)
         const userData = await User.findByIdAndUpdate(userId, 
             {isAvatarImageSet: true,
             avatarImage},{new:true})
     
         // if (userData.isAvatarImageSet === true){
         //     return res.json()
         // }
     
         res.status(201).json({isSet: userData.isAvatarImageSet, image:userData.avatarImage})
         
        } catch(err){
         next(err)
        }
      }
     
      static async getAllUsers (req,res,next) {
         try{
             // console.log("disini")
             const users = await User.find({_id:{$ne:req.params.id}}).select([
                 "email",
                 "username",
                 "avatarImage",
                 "_id"
             ])
          return res.json(users)
         } catch(err){
          next(err)
         }
       }
}

module.exports = userController


  