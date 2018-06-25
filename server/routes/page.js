const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("page lists");
})

router.get('/:id',(req,res)=>{
    res.send('this is page '+req.param.id);
})
module.exports = router;
