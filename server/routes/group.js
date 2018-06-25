const express = require('express');
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Group lists");
})

router.get('/:id',(req,res)=>{
    res.send('this is group'+req.param.id);
})
module.exports = router;
