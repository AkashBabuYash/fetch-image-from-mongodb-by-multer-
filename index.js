const express=require('express');
const app=express();
const port=8005;
require("./db/connection");
const cors=require("cors");
app.use(cors());
app.use(express.json());

const router=require("./routes/router");

app.use(router);
app.use("/uploads",express.static("./uploads"));



app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});