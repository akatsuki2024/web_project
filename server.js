
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();
const port = 5000;

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Connect to 'database' MongoDB for student registration
const studentDB = mongoose.createConnection('mongodb://127.0.0.1:27017/database');

// Connect to 'attendance' MongoDB
const attendanceDB = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance');

// Connect to 'marks' MongoDB for marks submission
const marksDb = mongoose.createConnection('mongodb://127.0.0.1:27017/marks');

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

// API route to handle student registration form submission
app.post('/register/student', async (req, res) => {
  try {
    const studentData = req.body;
    console.log('Received Student Data:', studentData);

    // Determine the collection name based on branch, year, and division
    let collectionName = "students";  // Default collection
    if (studentData.branch === "Extc") {
      if (studentData.year === "Second") {
        collectionName = `EXTC-SE-${studentData.division}`;
      } else if (studentData.year === "Third") {
        collectionName = `EXTC-TE-${studentData.division}`;
      } else if (studentData.year === "Fourth") {
        collectionName = `EXTC-BE-${studentData.division}`;
      }
    } else if (studentData.branch === "Comps") {
      if (studentData.year === "Second") {
        collectionName = `CS-SE-${studentData.division}`;
      } else if (studentData.year === "Third") {
        collectionName = `CS-TE-${studentData.division}`;
      } else if (studentData.year === "Fourth") {
        collectionName = `CS-BE-${studentData.division}`;
      }
    } else if (studentData.branch === "IT") {
      if (studentData.year === "Second") {
        collectionName = `IT-SE`;
      } else if (studentData.year === "Third") {
        collectionName = `IT-TE`;
      } else if (studentData.year === "Fourth") {
        collectionName = `IT-BE`;
      }
    }

    // Dynamically create a model for the correct collection
    const DynamicStudent = studentDB.model('Student', studentSchema, collectionName);

    // Create a new student document in the correct collection
    const newStudent = new DynamicStudent(studentData);
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
    console.log('Received Teacher Data:', teacherData);

    // Create a new teacher document in the 'teachers' collection of 'student-registration' database
    const newTeacher = new Teacher(teacherData);
    await newTeacher.save();

    res.status(200).json({ message: 'Teacher registration successful!' });
  } catch (error) {
    console.error('Error registering teacher:', error);
    res.status(500).json({ error: 'Error registering teacher' });
  }
});

// Fetch students by branch, year, and division (for IT, ignore division)
app.get('/students/:branch/:year/:division?', async (req, res) => {
  const { branch, year, division } = req.params;

  // Determine the collection name dynamically based on branch, year, and division
  let collectionName;

  if (branch === "Extc") {
    if (year === "Second") {
      collectionName = `EXTC-SE-${division}`;
    } else if (year === "Third") {
      collectionName = `EXTC-TE-${division}`;
    } else if (year === "Fourth") {
      collectionName = `EXTC-BE-${division}`;
    }
  } else if (branch === "Comps") {
    if (year === "Second") {
      collectionName = `CS-SE-${division}`;
    } else if (year === "Third") {
      collectionName = `CS-TE-${division}`;
    } else if (year === "Fourth") {
      collectionName = `CS-BE-${division}`;
    }
  } else if (branch === "IT") {
    if (year === "Second") {
      collectionName = `IT-SE`;
    } else if (year === "Third") {
      collectionName = `IT-TE`;  // No division for IT
    } else if (year === "Fourth") {
      collectionName = `IT-BE`;
    }
  }

  try {
    const DynamicStudent = studentDB.model('Student', studentSchema, collectionName);
    const students = await DynamicStudent.find({});
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
    const attendanceDb = mongoose.createConnection('mongodb://127.0.0.1:27017/attendance');

    attendanceDb.on('error', err => console.error('Error connecting to attendance database:', err));
    attendanceDb.once('open', async () => {
      const collectionName = `${branch}-${year}-${division || ''}`; // Division will be '' for IT
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

// Submit marks (new route for marks submission)
app.post('/marks/submit', async (req, res) => {
  const { branch, year, division, marksData } = req.body;

  try {
    const marksDb = mongoose.createConnection('mongodb://127.0.0.1:27017/marks');

    marksDb.on('error', err => console.error('Error connecting to marks database:', err));
    marksDb.once('open', async () => {
      const collectionName = `${branch}-${year}-${division || ''}`; // Division will be '' for IT
      const Marks = marksDb.model('Marks', new mongoose.Schema({
        rollNo: String,
        studentName: String,
        ia1: Number,
        ia2: Number
      }), collectionName);

      // Insert or update marks for each student
      for (let record of marksData) {
        const updateData = {};
        if (record.ia1 !== null) updateData.ia1 = record.ia1;  // Update IA1 if provided
        if (record.ia2 !== null) updateData.ia2 = record.ia2;  // Update IA2 if provided

        await Marks.updateOne(
          { rollNo: record.rollNo },
          { $set: updateData },  // Only update the provided fields
          { upsert: true }
        );
      }

      res.status(200).json({ message: 'Marks submitted successfully!' });
    });
  } catch (error) {
    console.error('Error submitting marks:', error);
    res.status(500).json({ error: 'Error submitting marks' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


