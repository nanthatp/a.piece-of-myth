const express = require('express');

//rest object
const app = express();

//rest api
app.get('/',(req,res) => {
    res.send({
        message:'Welcome to a piece of MYTH app'
    });
});

//POST
const PORT = 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});
