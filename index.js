const express = require('express');
const joi = require('joi')
const app = express()
const port = process.env.PORT || 3000


const validationShema = {
  name: joi.string().min(3).max(10).required(),
  age: joi.number().positive().required()
}

/* Data local */
var students = [{
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
app.use(express.json());

/* routes */
app.get('/api/students', (req, res) => {
  res.status(200)
  res.json(students)
});

app.get('/api/students/:id', (req, res) => {
  let student = students.find(s => {
    return s.id === parseInt(req.params.id);
  });
  if (!student) {
    return res.status(404).json({
      message: `Student with ${req.params.id} not found`
    });
  }
  res.status(200).json(student);
});

app.post('/api/students', (req, res) => {
  const validation_result = joi.validate(req.body, validationShema);
  if (validation_result.error)

    return res.status(400).json({message: validation_result.error.details[0].message});
  const student = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age
  }
  students.push(student);
  res.statusMessage = "new student created successfully";
  res.status(200).json(student);
});

app.put('/api/students/:id', (req, res) => {
  let studentIndex = students.findIndex(s => {
    return s.id === parseInt(req.params.id);
  });
  if (studentIndex === -1) {
    return res.status(404).json({
      message: `Student with ${req.params.id} not found`
    });
  }
  const validation_result = joi.validate(req.body, validationShema);
  if (validation_result.error)
    return res.status(400).json({message: validation_result.error.details[0].message}); 
  const st = {
    id: req.body.id,
    name: req.body.name,
    age: req.body.age
  }
  res.statusMessage = "student updated successfully";
  res.status(200)
  students[studentIndex] = st;
  res.json(st);
});

app.delete('/api/students/:id', (req, res) => {
  let student = students.find(s => {
    return s.id === parseInt(req.params.id);
  });
  if (!student) {
    res.status(404).json({
      message: `Student with ${req.params.id} not found`
    });
  }
  students = students.filter(s => {
    return s != student
  });
  res.statusMessage = "student deleted successfully"
  res.status(200);
  res.json(student);
});

app.listen(port , ()=>{
  console.log(`server Listening on http://localhost:${port}`)
});
