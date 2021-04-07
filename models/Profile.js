const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const profile=new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      bio: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      followers:[
        {
          user: {
            type: Schema.Types.ObjectId,
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },
        }
      ],
      following:[
        {
          user: {
            type: Schema.Types.ObjectId,
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },
        }
        
      ]       
      
});

module.exports=Profile=mongoose.model('profile',profile);