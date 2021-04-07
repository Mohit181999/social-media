const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Posts');
 
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
   // console.log(profile);
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

 
router.post(
  '/',
  [
    auth,
    [
      check('bio', 'bio is required').not().isEmpty(),
       
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
       
      bio
    } = req.body;

    const profileFields = {
      user: req.user.id,
      bio
    };

     

    try {
      
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
 
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar','followers','following']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

 
router.get(
  '/user/:user_id',
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      }).populate('user', ['name', 'avatar','followers','following']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);
 
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/following/:id',auth,async(req,res)=>{
  try {
    const follow=await User.findById(req.params.id);
    const follower=await User.findById(req.user.id);
    const profile=await Profile.findOne({user:req.params.id})
    if(profile.followers.filter(follower=>follower.user.toString()===req.user.id).length>0){
      return res.status(400).json({msg:'You are already following the user'});
  }
    
    const user=await Profile.findOne({user:req.user.id})
    const newFollower=({
      user:req.user.id,
      name:follower.name,
      avatar:follower.avatar
    })
    profile.followers.unshift(newFollower);
    await profile.save();
    const newFollowing=({
      user:req.params.id,
      name:follow.name,
      avatar:follow.avatar
    })
    user.following.unshift(newFollowing);
    await user.save();
    console.log(profile.followers);
    res.json(profile.followers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

router.put('/unfollow/:id',auth,async(req,res)=>{
  try {
    const profile=await Profile.findOne({user:req.params.id});
    if(profile.followers.filter(follower=>follower.user.toString()===req.user.id).length===0){
      return res.status(400).json({msg:'You are not following this user'});
  }
    const user=await Profile.findOne({user:req.user.id});
    const remind=profile.followers.map(follower=>follower.id).indexOf(req.user.id);
    profile.followers.splice(remind,1);
    await profile.save();
    
    const rem=user.following.map(following=>following.id).indexOf(req.params.id);
    user.following.splice(rem,1);
    await user.save();
    res.json(profile.followers);
  } catch (error) {
    res.status(500).send('server err');
  }
})

 

module.exports = router;