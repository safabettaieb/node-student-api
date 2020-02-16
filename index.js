const express = require('express');
const app = express()
const port = process.env.PORT || 3000

/* Data local */
students = [{
    id: 1,
    name: "name 1",
    age: 25
  },
  {
    id: 2,
    name: "name 2",
    age: 26
  },
  {
    id: 3,
    name: "name 3",
    age: 27
  }
]

/* middleware */

/* routes */
app.get('/api/students', (req, res) => {
  res.status(200)
  res.json(students)
});

app.get('/api/students/:id' ,(req,res) =>{
  let student = students.find(s=>{
    return s.id === parseInt(req.params.id);
  });
  if(!student)
  {
   return res.status(404).json({message: `Student with ${req.params.id} not found`});
  }
  res.status(200).json(student);
});

app.listen(port, () => {
  console.log(`port Listening on localhost:${port}`);
});