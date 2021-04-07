const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const gravatar=require('gravatar');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth= require("../../middleware/auth")
const User=require('../../models/User');
const Profile=require('../../models/Profile');
 

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('email','Please include an email').isEmail(),
    check('password','please enter password of length min 6').isLength({min: 6})
    
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name, email, password}=req.body;
    try{
        let user= await User.findOne({email});
        if(user){
           return  res.status(400).json({errors:[{ msg: 'user exists'}]});
        }
        const avatar=gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        user=new User({
            name,
            email,
            password,
            avatar
        });
        const salt= await bcrypt.genSalt(10);
        user.password= await bcrypt.hash(password,salt);
        await user.save();
        const profile=new Profile({
            user:user.id
        });
        await profile.save();
        const payload={
        user:{
            id:user.id
        }
    }
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:3600000},(err,token)=>{
            if(err)throw err;
            res.json({token});
        });
         
    }catch(err){
        console.log(err);
        res.status(400).send('server error');
    }   
});


// Get a user by their id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      if (user) {
        res.json({ user });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ err });
    }
  });

module.exports=router;