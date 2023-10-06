const express= require("express")
const cookieparser=require('cookie-parser')
const{connection}=require("./config/db");
const Userrouter  = require("./routes/user.routes");
const Authrouter=require("./routes/auth.routes")
const Listingrouter=require("./routes/listing.routes")
const path=require('path')
// var cors = require('cors')
// app.use(cors())


// const __dirname = path.resolve();
const app=express();


app.use(express.json());
app.use(cookieparser());
app.use("/api/user",Userrouter);
app.use("/api/auth",Authrouter);
app.use('/api/listing',Listingrouter);

app.get('/', (req,res)=>{
    res.send("base api point")
})

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})



app.listen(8080, async()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(e){
        console.log("Error connecting to DB:",e)
    }
    console.log(`listening on PORT 8080`
    )})


    app.use((err,req,res,next)=>{
        const statusCode=err.statusCode ||500 ;
        const message=err.message || 'Internal Server Error';
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message
        });
       
    
    });