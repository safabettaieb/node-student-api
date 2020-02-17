const express = require('express');
const morgan = require('morgan');
const config = require('config');
const studentsRouter = require('./routes/students');
const logger = require('./middlewares/logger');
const autho = require('./middlewares/auth');
const startUpDebugger = require('debug')('app:startup');
const logDebugger = require('debug')('app:log');
const app = express();
const port = process.env.PORT || 3000 ;

startUpDebugger('application started');
/* middleware */
app.use(express.json());
app.use(logger);
app.use(autho);
if(app.get('env') ==='development'){
  app.use(morgan('tiny'))
  logDebugger('morgan is enable');
}
console.log(`APP NAME: ${config.get('name')}`);
/* routes */
app.use('/api/students',studentsRouter);
app.listen(port , ()=>{
  console.log(`server Listening on http://localhost:${port}`)
});
