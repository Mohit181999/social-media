const express=require('express');
const app=express();
const connectDB=require('./config/db');

connectDB();



app.get('/',(req,res)=>{
    res.send('server is working');
});

app.use(express.json({extended:false}));

app.use('/API/user',require('./routes/API/user'));
app.use('/API/profile', require('./routes/API/profile'));
app.use('/API/post', require('./routes/API/post'));
app.use('/API/auth', require('./routes/API/auth'));




const port=process.env.PORT || 7000;
app.listen(port,()=>console.log(`Connected to port ${port}`));