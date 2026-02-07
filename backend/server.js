const express = require('express');
const app = express();
PORT = 3000;

app.get("/", (req, res)=>{
    res.send("Hello World");
})

app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('SERVER STARTTED ON PORT ' + PORT)
    }
})