const express =require("express");
 const monoConnect=require("./modules/db.js");
 const AuthRouter =require("./routes/AuthRouter.js");
 const ProductRouter =require("./routes/ProductRouter.js");
 const dotenv = require("dotenv");
 dotenv.config();
 const bodyParser = require("body-parser");
 const cors = require("cors");

 const PORT=process.env.PORT || 8080;
const app = express();

 app.get("/",(req,res)=>{  
    res.send("Request received at /..........");
 });
app.use(bodyParser.json());
app.use(cors());

app.use("/auth",AuthRouter);
app.use("/products",ProductRouter);



app.listen(PORT,()=>{
    monoConnect();
    console.log(`Server is running on port ${PORT}`);
});