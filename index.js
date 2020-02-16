const studentsRouter = require('./routes/students')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
/* middleware */
app.use(express.json());

/* routes */
app.use('/api/students',studentsRouter);
app.listen(port , ()=>{
  console.log(`server Listening on http://localhost:${port}`)
});
