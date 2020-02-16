const express = require('express');
const app = express()
/* middleware */
 /* routes */
 app.get('/',(req,res)=>{
     res.send('Hello word !')
 })





 app.listen(3000,()=>{
   console.log('port Listening on localhost:3000');
 });