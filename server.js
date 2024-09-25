
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Initialize the app
// const app = express();
// const port = 5000;

// // Middleware to parse JSON and enable CORS
// app.use(express.json());
// app.use(cors());

// // Connect to 'student-registration' MongoDB
// const studentDB = mongoose.createConnection('mongodb://127.0.0.1:27017/database', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// studentDB.on('error', err => console.error('Error connecting to database:', err));
// studentDB.once('open', () => {
//   console.log('Connected to MongoDB (database)');
// });

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
// const Student = studentDB.model('Student', studentSchema);

// // Connect to 'attendance' MongoDB
// const attendanceDB = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// attendanceDB.on('error', err => console.error('Error connecting to attendance database:', err));
// attendanceDB.once('open', () => {
//   console.log('Connected to MongoDB (attendance)');
// });

// // Create a schema for attendance
// const attendanceSchema = new mongoose.Schema({
//   collegeID: String,
//   attendanceStatus: String,
//   date: { type: Date, required: true }
// });

// // API route to handle student registration form submission
// app.post('/register/student', async (req, res) => {
//   try {
//     const studentData = req.body;
//     console.log('Received Student Data:', studentData); // Debugging line

//     // Create a new student document in the database
//     const newStudent = new Student(studentData);
//     await newStudent.save();

//     res.status(200).json({ message: 'Student registration successful!' });
//   } catch (error) {
//     console.error('Error registering student:', error);
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
// const Teacher = attendanceDB.model('Teacher', teacherSchema, 'teachers');

// // API route to handle teacher registration form submission
// app.post('/register/teacher', async (req, res) => {
//   try {
//     const teacherData = req.body;
//     console.log('Received Teacher Data:', teacherData); // Debugging line

//     // Create a new teacher document in the database
//     const newTeacher = new Teacher(teacherData);
//     await newTeacher.save();

//     res.status(200).json({ message: 'Teacher registration successful!' });
//   } catch (error) {
//     console.error('Error registering teacher:', error);
//     res.status(500).json({ error: 'Error registering teacher' });
//   }
// });

// // Fetch students by branch and year
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

// // Submit attendance
// app.post('/attendance/submit', async (req, res) => {
//   const { branch, year, division, date, attendanceData } = req.body; // Now use the date from the request

//   try {
//     // Connect to the attendance database
//     const attendanceDb = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });

//     attendanceDb.on('error', err => console.error('Error connecting to attendance database:', err));
//     attendanceDb.once('open', async () => {
//       // Create a collection name based on branch, year, and division
//       const collectionName = `${branch}-${year}-${division}`;
//       const Attendance = attendanceDb.model('Attendance', new mongoose.Schema({
//         collegeID: String,
//         attendanceStatus: String,
//         date: { type: Date, default: Date.now }
//       }), collectionName);

//       // Create or update attendance for the provided date
//       for (let record of attendanceData) {
//         await Attendance.updateOne(
//           { collegeID: record.collegeID, date: new Date(date) }, // Use the provided date here
//           { $set: { attendanceStatus: record.attendanceStatus }, $setOnInsert: { date: new Date(date) } },
//           { upsert: true }
//         );
//       }

//       res.status(200).json({ message: 'Attendance submitted successfully!' });
//     });
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

// Connect to 'student-registration' MongoDB for both student and teacher registration
const studentDB = mongoose.createConnection('mongodb://127.0.0.1:27017/student-registration', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

studentDB.on('error', err => console.error('Error connecting to student database:', err));
studentDB.once('open', () => {
  console.log('Connected to MongoDB (student-registration database)');
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
  address: String,
  rollNo: String,
  division: String
});

// Create a model for student registration
const Student = studentDB.model('Student', studentSchema, 'students');

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

// Create a model for teacher registration in 'student-registration' database
const Teacher = studentDB.model('Teacher', teacherSchema, 'teachers');

// Connect to 'attendance' MongoDB for attendance management
const attendanceDB = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

attendanceDB.on('error', err => console.error('Error connecting to attendance database:', err));
attendanceDB.once('open', () => {
  console.log('Connected to MongoDB (attendance)');
});

// Validation functions
const validatePhoneNumber = (phoneNumber) => /^\d{10}$/.test(phoneNumber);
const validateEmployeeID = (employeeID) => employeeID.endsWith('@kccemsr.edu.in');

// API route to handle student registration form submission
app.post('/register/student', async (req, res) => {
  try {
    const studentData = req.body;
    console.log('Received Student Data:', studentData);

    // Validate phone number
    if (!validatePhoneNumber(studentData.contactNumber)) {
      console.log('Invalid phone number:', studentData.contactNumber);
      return res.status(400).json({ error: 'Contact number must be exactly 10 digits.' });
    }

    // Validate college ID
    if (!validateEmployeeID(studentData.collegeID)) {
      console.log('Invalid college ID:', studentData.collegeID);
      return res.status(400).json({ error: 'College ID must end with @kccemsr.edu.in' });
    }

    // Create a new student document in the database
    const newStudent = new Student(studentData);
    await newStudent.save();

    res.status(200).json({ message: 'Student registration successful!' });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Error registering student' });
  }
});

// API route to handle teacher registration form submission
app.post('/register/teacher', async (req, res) => {
  try {
    const teacherData = req.body;
    console.log('Received Teacher Data:', teacherData);

    // Validate employee ID
    if (!validateEmployeeID(teacherData.employeeID)) {
      console.log('Invalid employee ID:', teacherData.employeeID);
      return res.status(400).json({ error: 'Employee ID must end with @kccemsr.edu.in' });
    }

    // Validate phone number
    if (!validatePhoneNumber(teacherData.contactNumber)) {
      console.log('Invalid contact number:', teacherData.contactNumber);
      return res.status(400).json({ error: 'Contact number must be exactly 10 digits.' });
    }

    // Create a new teacher document in the 'teachers' collection of 'student-registration' database
    const newTeacher = new Teacher(teacherData);
    await newTeacher.save();

    res.status(200).json({ message: 'Teacher registration successful!' });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ error: 'Error registering teacher' });
  }
});

// API route to handle student login
app.post('/login/student', async (req, res) => {
  const { username, password, branch, year, division } = req.body;

  try {
    // Find the student based on username and password
    const student = await Student.findOne({
      username,
      password,
      branch,
      year,
      division: division !== 'None' ? division : { $exists: true } // Handle 'None' for IT branch
    });

    if (student) {
      res.status(200).json({ message: 'Login successful!', student });
    } else {
      res.status(401).json({ error: 'Invalid credentials or details' });
    }
  } catch (error) {
    console.error('Error logging in student:', error);
    res.status(500).json({ error: 'Error logging in student' });
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
  const { branch, year, division, date, attendanceData } = req.body;

  try {
    const attendanceDb = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    attendanceDb.on('error', err => console.error('Error connecting to attendance database:', err));
    attendanceDb.once('open', async () => {
      const collectionName = `${branch}-${year}-${division}`;
      const Attendance = attendanceDb.model('Attendance', new mongoose.Schema({
        collegeID: String,
        attendanceStatus: String,
        date: { type: Date, default: Date.now }
      }), collectionName);

      for (let record of attendanceData) {
        await Attendance.updateOne(
          { collegeID: record.collegeID, date: new Date(date) },
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
