// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');

// // // Initialize the app
// // const app = express();
// // const port = 5000;

// // // Middleware to parse JSON and enable CORS
// // app.use(express.json());
// // app.use(cors());

// // // Connect to MongoDB
// // mongoose.connect('mongodb://127.0.0.1:27017/student-registration', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // })
// //   .then(() => console.log('Connected to MongoDB'))
// //   .catch(err => console.error('Could not connect to MongoDB...', err));


// // // Create a schema for student registration
// // const studentSchema = new mongoose.Schema({
// //   username: String,
// //   password: String,
// //   name: String,
// //   collegeID: String,
// //   branch: String,
// //   year: String,
// //   contactNumber: String,
// //   address: String
// // });

// // // Create a model based on the schema
// // const Student = mongoose.model('Student', studentSchema);

// // // API route to handle registration form submission
// // app.post('/register', async (req, res) => {
// //   try {
// //     const studentData = req.body;

// //     // Create a new student document in the database
// //     const newStudent = new Student(studentData);
// //     await newStudent.save();

// //     res.status(200).json({ message: 'Registration successful!' });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error registering student' });
// //   }
// // });

// // // Start the server
// // app.listen(port, () => {
// //   console.log(`Server running on http://localhost:${port}`);
// // });








// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Initialize the app
// const app = express();
// const port = 5000;

// // Middleware to parse JSON and enable CORS
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/database', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB...', err));

// // Create a schema for student registration
// const studentSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   name: String,
//   collegeID: String,
//   branch: String,
//   year: String,
//   contactNumber: String,
//   address: String
// });

// // Create a model for student registration
// const Student = mongoose.model('Student', studentSchema);

// // API route to handle student registration form submission
// app.post('/register/student', async (req, res) => {
//   try {
//     const studentData = req.body;

//     // Create a new student document in the database
//     const newStudent = new Student(studentData);
//     await newStudent.save();

//     res.status(200).json({ message: 'Student registration successful!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error registering student' });
//   }
// });

// // Create a schema for teacher registration
// const teacherSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   name: String,
//   employeeID: String,
//   department: String,
//   contactNumber: String,
//   address: String
// });

// // Create a model for teacher registration (this will automatically connect to the "teachers" collection)
// const Teacher = mongoose.model('Teacher', teacherSchema, 'teachers');

// // API route to handle teacher registration form submission
// app.post('/register/teacher', async (req, res) => {
//   try {
//     const teacherData = req.body;

//     // Create a new teacher document in the "teachers" collection
//     const newTeacher = new Teacher(teacherData);
//     await newTeacher.save();

//     res.status(200).json({ message: 'Teacher registration successful!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error registering teacher' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();
const port = 5000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Create a schema for student registration
const studentSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  collegeID: String,
  branch: String,
  year: String,
  contactNumber: String,
  address: String
});

// Create a model for student registration
const Student = mongoose.model('Student', studentSchema);

// API route to handle student registration form submission
app.post('/register/student', async (req, res) => {
  try {
    const studentData = req.body;
    console.log('Received Student Data:', studentData); // Debugging line

    // Create a new student document in the database
    const newStudent = new Student(studentData);
    await newStudent.save();

    res.status(200).json({ message: 'Student registration successful!' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Error registering student' });
  }
});

// Create a schema for teacher registration
const teacherSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  employeeID: String,
  department: String,
  contactNumber: String,
  address: String
});

// Create a model for teacher registration
const Teacher = mongoose.model('Teacher', teacherSchema, 'teachers');

// API route to handle teacher registration form submission
app.post('/register/teacher', async (req, res) => {
  try {
    const teacherData = req.body;
    console.log('Received Teacher Data:', teacherData); // Debugging line

    // Create a new teacher document in the database
    const newTeacher = new Teacher(teacherData);
    await newTeacher.save();

    res.status(200).json({ message: 'Teacher registration successful!' });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ error: 'Error registering teacher' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//problem 