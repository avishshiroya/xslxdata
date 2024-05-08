const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const  connectDB  = require('./config/db');
const dotenv = require('dotenv')
const useRoutes = require('./routes/user.routes')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

dotenv.config()
connectDB()
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(session({
    secret:'abc',
    cookie:{
        maxAge:10*24*60*60*1000
    }
}))
app.use(flash())
app.use(bodyParser.json({limit:'35mb'}));
app.use(bodyParser.urlencoded({extended:true,limit:'99mb'}));
app.use(express.static('public'))
app.use(morgan("dev"))
// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/images',express.static(path.join(__dirname,'public')))
app.use("/",useRoutes)

app.use("/",async(req,res)=>{
    res.render('Home',{key:process.env.STRIPE_PUBLISHABLE_KEY}) 
    // res.render('Data.ejs',{msg:''}) 
})
app.use((req,res,next)=>{
    res.locals.msg = res.flash('msg')
    next();
})

const PORT = process.env.PORT || 2034

app.listen(PORT,function(err){
    if(err){
        console.log("Error in Listning Port");
    }else{
        console.log("Server Listining Port");
    }
})