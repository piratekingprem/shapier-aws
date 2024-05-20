const express = require("express");
const app = express();
const cors = require('cors');
const apiRouter = require('./src/api/routes/api')
const methodeOverride = require('method-override');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(methodeOverride('_method'));
app.use(express.static('public'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE,PUT,OPTION');

    next();
});

const port = process.env.PORT || 3000;
const appUrl = process.env.APP_URL;

app.get('/',(req,res)=>{
    res.json({message: "please add /api/v1 in url"});
})
// app.use(`${appUrl}`,apiRouter)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode // 500;
    return res.status(statusCode).json({ message: err.message });
});

app.use(`${appUrl}`,apiRouter)

app.listen(port, ()=>{
    console.log(`Backend app listening at http://localhost:${port}`)
})