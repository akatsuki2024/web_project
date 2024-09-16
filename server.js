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






















// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Initialize the app
// const app = express();
// const port = 5000;

// // Middleware to parse JSON and enable CORS
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB (Main student-registration DB)
// mongoose.connect('mongodb://127.0.0.1:27017/student-registration', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('Connected to MongoDB (student-registration)'))
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

// // Create a model for teacher registration
// const Teacher = mongoose.model('Teacher', teacherSchema, 'teachers');

// // API route to handle teacher registration form submission
// app.post('/register/teacher', async (req, res) => {
//   try {
//     const teacherData = req.body;

//     const newTeacher = new Teacher(teacherData);
//     await newTeacher.save();

//     res.status(200).json({ message: 'Teacher registration successful!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error registering teacher' });
//   }
// });

// // API route to fetch students by branch and year for attendance marking
// app.get('/students/:branch/:year', async (req, res) => {
//   const { branch, year } = req.params;
//   try {
//     const students = await Student.find({ branch, year });
//     res.json(students);
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({ error: 'Error fetching students' });
//   }
// });


// // Connect to 'attendance' database
// const attendanceDB = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// attendanceDB.once('open', () => {
//   console.log('Connected to MongoDB (attendance)');
// });

// // API route to store attendance
// app.post('/attendance/submit', async (req, res) => {
//   const { branch, year, division, attendanceData } = req.body;
//   try {
//     const collectionName = `${branch}-${year}-${division}`;
//     const Attendance = mongoose.model('Attendance', new mongoose.Schema({
//       collegeID: String,
//       attendanceStatus: String
//     }), collectionName);

//     await Attendance.insertMany(attendanceData);

//     res.status(200).json({ message: 'Attendance submitted successfully!' });
//   } catch (error) {
//     console.error('Error submitting attendance:', error);
//     res.status(500).json({ error: 'Error submitting attendance' });
//   }
// });


// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
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

// Connect to 'student-registration' MongoDB
const studentDB = mongoose.createConnection('mongodb://127.0.0.1:27017/database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

studentDB.on('error', err => console.error('Error connecting to database:', err));
studentDB.once('open', () => {
  console.log('Connected to MongoDB (database)');
});

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
const Student = studentDB.model('Student', studentSchema);

// Connect to 'attendance' MongoDB
const attendanceDB = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

attendanceDB.on('error', err => console.error('Error connecting to attendance database:', err));
attendanceDB.once('open', () => {
  console.log('Connected to MongoDB (attendance)');
});

// Create a schema for attendance
const attendanceSchema = new mongoose.Schema({
  collegeID: String,
  attendanceStatus: String,
  date: { type: Date, required: true }
});

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
const Teacher = attendanceDB.model('Teacher', teacherSchema, 'teachers');

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

// Fetch students by branch and year
app.get('/students/:branch/:year', async (req, res) => {
  const { branch, year } = req.params;
  try {
    const students = await Student.find({ branch, year });
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Error fetching students' });
  }
});

// Submit attendance
app.post('/attendance/submit', async (req, res) => {
  const { branch, year, division, date, attendanceData } = req.body; // Now use the date from the request

  try {
    // Connect to the attendance database
    const attendanceDb = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    attendanceDb.on('error', err => console.error('Error connecting to attendance database:', err));
    attendanceDb.once('open', async () => {
      // Create a collection name based on branch, year, and division
      const collectionName = `${branch}-${year}-${division}`;
      const Attendance = attendanceDb.model('Attendance', new mongoose.Schema({
        collegeID: String,
        attendanceStatus: String,
        date: { type: Date, default: Date.now }
      }), collectionName);

      // Create or update attendance for the provided date
      for (let record of attendanceData) {
        await Attendance.updateOne(
          { collegeID: record.collegeID, date: new Date(date) }, // Use the provided date here
          { $set: { attendanceStatus: record.attendanceStatus }, $setOnInsert: { date: new Date(date) } },
          { upsert: true }
        );
      }

      res.status(200).json({ message: 'Attendance submitted successfully!' });
    });
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({ error: 'Error submitting attendance' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


