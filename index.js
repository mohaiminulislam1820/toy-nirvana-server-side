const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log('listening to ',port);
})

app.get('/',(req,res)=>{
    res.send('Toy Nirvana Api server running....');
})


module.exports=app;