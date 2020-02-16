const express = require('express');
const morgan = require('morgan');
const studentsRouter = require('./routes/students');
const logger = require('./middlewares/logger');
const autho = require('./middlewares/auth');
const app = express();
const port = process.env.PORT || 3000 ;
/* middleware */
app.use(express.json());
app.use(logger);
app.use(autho);
if(app.get('env') ==='development'){
  app.use(morgan('tiny'))
}
/* routes */
app.use('/api/students',studentsRouter);
app.listen(port , ()=>{
  console.log(`server Listening on http://localhost:${port}`)
});
