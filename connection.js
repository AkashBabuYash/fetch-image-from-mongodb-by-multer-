const mongoose=require('mongoose');
const db="mongodb://localhost:27017/ayush";
mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("database connected")
}).catch((err)=>console.log("error"+err.message));

