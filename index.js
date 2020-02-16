const express = require('express');
const app = express()
const port = process.env.PORT || 3000


/* middleware */

 /* routes */
 app.get('/', (req, res) => {
   res.send("Hello World")
 })


 app.listen(port,()=>{
  console.log(`port Listening on localhost:${port}`);
 });


